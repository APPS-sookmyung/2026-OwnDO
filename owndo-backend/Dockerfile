# 1단계: 빌드 환경 (Gradle & Java 17)
FROM gradle:8.5-jdk17 AS build
WORKDIR /app

# 빌드에 필요한 Gradle 설정 및 소스 복사
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
COPY src ./src

# 실행 권한 부여 및 JAR 파일 빌드
RUN chmod +x ./gradlew && ./gradlew bootJar -x test

# 2단계: 실행 환경 (가볍고 빠른 JRE 17)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# 1단계에서 완성된 JAR 파일만 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 스프링 부트 서버 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
