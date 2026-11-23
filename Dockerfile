# 1단계: 빌드 환경 (Gradle & Java 17)
FROM gradle:8.5-jdk17 AS build
WORKDIR /app

# 루트 기준으로 owndo-backend 안의 파일들을 복사
COPY owndo-backend/build.gradle owndo-backend/settings.gradle owndo-backend/gradlew ./
COPY owndo-backend/gradle ./gradle
COPY owndo-backend/src ./src

# 실행 권한 부여 및 JAR 파일 빌드
RUN chmod +x ./gradlew && ./gradlew bootJar -x test

# 2단계: 실행 환경 (가볍고 빠른 JRE 17)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# 1단계에서 빌드된 JAR 파일만 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 스프링 부트 서버 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
