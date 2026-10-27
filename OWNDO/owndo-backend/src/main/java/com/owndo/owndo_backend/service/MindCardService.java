package com.owndo.owndo_backend.service;

import com.owndo.owndo_backend.dto.MindCardRequest;
import com.owndo.owndo_backend.dto.MindCardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Sort;
import java.time.LocalDate;
import java.time.LocalTime;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

import com.owndo.owndo_backend.entity.MindCard;
import com.owndo.owndo_backend.repository.MindCardRepository;
import com.owndo.owndo_backend.dto.MindCardDetailResponse;
import java.time.LocalDateTime;

@Service
public class MindCardService {

    private final RestClient geminiRestClient;
    private final ObjectMapper objectMapper;
    private final MindCardRepository mindCardRepository;

    public MindCardService(
            RestClient geminiRestClient,
            ObjectMapper objectMapper,
            MindCardRepository mindCardRepository
    ) {
        this.geminiRestClient = geminiRestClient;
        this.objectMapper = objectMapper;
        this.mindCardRepository = mindCardRepository;
    }

    public MindCardResponse reinterpret(MindCardRequest request) {

        String prompt = """
                사용자의 하루 기록과 감정을 바탕으로,
                하루를 긍정적인 관점에서 다시 바라볼 수 있도록 재해석해줘.

                사용자의 하루 기록:
                %s

                사용자가 느낀 감정:
                %s

                다음 규칙을 반드시 지켜줘.

                1. 사용자의 기록에 실제로 나타난 행동과 사실을 중심으로 작성해줘.
                2. 기록에 없는 사건, 감정, 상황을 추측하거나 만들어내지 마.
                3. 사용자의 자기비난이나 부정적인 표현을 그대로 반복하지 말고,
                   같은 상황을 조금 더 따뜻하고 긍정적인 관점에서 바라봐줘.
                4. 사용자가 실제로 한 작은 행동이나 시도를 발견하고 그 의미를 강조해줘.
                5. 완벽하게 해내지 못한 결과보다는 과정, 시도, 작은 변화에 의미를 부여해줘.
                6. "무조건 잘했다", "괜찮다"와 같은 단순한 위로만 하지 말고,
                   사용자의 기록 속에서 긍정적으로 바라볼 수 있는 구체적인 부분을 찾아줘.
                7. 조언이나 해결책을 길게 제시하지 말고, 사용자가 직접 작성한 하루를 돌아보는 일기처럼 작성해줘.
                8. 상담사처럼 분석하거나 설명하는 말투를 사용하지 마.
                9. "마음의 에너지가 부족했다", "힘겨운 하루였다"처럼
                   기록에 없는 심리 상태를 추측해서 표현하지 마.
                10. 따뜻하고 자연스러운 존댓말을 사용하기 보다는 사용자가 작성한 어투를 비슷하게 따라가줘.
                11. 재해석 문장은 1개의 문단으로 작성해줘.
                12. 문단은 2~3개의 문장으로 작성해줘.
                13. 문장은 너무 길지 않게 작성하고, 실제 사람이 쓴 짧은 일기처럼 자연스럽게 표현해줘.
                14. 마지막 문단에서는 오늘의 행동이나 시도에서 발견할 수 있는 의미를 따뜻하게 마무리해줘.

                keywords는 기록에서 발견되는 긍정적인 의미를 중심으로 3개를 만들어줘.
                예: 작은시도, 꾸준함, 도전, 용기, 노력, 시작, 회복
                단, 기록에 근거하지 않는 키워드를 억지로 만들지 마.
                keywords에는 '#'을 붙이지 마.

                summary는 사용자의 하루를 객관적으로 한 문장으로 요약해줘.

                반드시 아래 JSON 형식으로만 응답해줘.

                {
                  "reinterpretedText": "재해석 내용",
                  "summary": "하루에 대한 한줄 요약",
                  "keywords": ["키워드1", "키워드2", "키워드3"]
                }
                """.formatted(
                request.getContent(),
                request.getEmotion()
        );

        String requestBody = """
                {
                  "contents": [
                    {
                      "parts": [
                        {
                          "text": %s
                        }
                      ]
                    }
                  ],
                  "generationConfig": {
                    "responseMimeType": "application/json"
                  }
                }
                """.formatted(
                objectMapper.writeValueAsString(prompt)
        );

        String response = requestGemini(requestBody);

        try {
            JsonNode root = objectMapper.readTree(response);

            String resultText = root
                    .path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text")
                    .asString();

            JsonNode result = objectMapper.readTree(resultText);

            String reinterpretedText = result
                    .path("reinterpretedText")
                    .asString();

            String summary = result
                    .path("summary")
                    .asString();

            List<String> keywords = new ArrayList<>();
            JsonNode keywordNode = result.path("keywords");
            for (JsonNode keyword : keywordNode) {
                keywords.add(keyword.asString());
            }

            MindCard mindCard = new MindCard(
                    request.getContent(),
                    request.getEmotion(),
                    reinterpretedText,
                    summary,
                    String.join(",", keywords),
                    LocalDateTime.now()
            );

            mindCardRepository.save(mindCard);

            return new MindCardResponse(
                    reinterpretedText,
                    summary,
                    keywords
            );
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "AI JSON 파싱 실패", e);
        }
    }

    private String requestGemini(String requestBody) {
        for (int attempt = 0; attempt < 3; attempt++) {
            try {
                return geminiRestClient.post()
                        .uri("/v1beta/models/gemini-3.5-flash:generateContent")
                        .body(requestBody)
                        .retrieve()
                        .body(String.class);
            } catch (HttpServerErrorException.ServiceUnavailable e) {
                if (attempt == 2) {
                    throw new ResponseStatusException(
                            HttpStatus.SERVICE_UNAVAILABLE,
                            "AI service is temporarily busy. Please try again shortly.",
                            e
                    );
                }
                try {
                    Thread.sleep(1000L * (1L << attempt));
                } catch (InterruptedException interruptedException) {
                    Thread.currentThread().interrupt();
                    throw new ResponseStatusException(
                            HttpStatus.SERVICE_UNAVAILABLE,
                            "AI card generation was interrupted.",
                            interruptedException
                    );
                }
            } catch (org.springframework.web.client.HttpClientErrorException.TooManyRequests e) {
                throw new ResponseStatusException(
                        HttpStatus.TOO_MANY_REQUESTS,
                        "Gemini API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
                        e
                );
            }
        }
        throw new IllegalStateException("Retry loop ended unexpectedly.");
    }

    public List<MindCardDetailResponse> getAllMindCards() {

        return mindCardRepository
                .findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(this::toDetailResponse)
                .toList();
    }

    public MindCardDetailResponse getMindCardById(Long id) {

        MindCard mindCard = mindCardRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "마인드카드를 찾을 수 없습니다."
                ));

        return toDetailResponse(mindCard);
    }

    private MindCardDetailResponse toDetailResponse(MindCard mindCard) {

        List<String> keywords = mindCard.getKeywords() == null
                || mindCard.getKeywords().isBlank()
                ? List.of()
                : Arrays.asList(mindCard.getKeywords().split(","));

        return new MindCardDetailResponse(
                mindCard.getId(),
                mindCard.getContent(),
                mindCard.getEmotion(),
                mindCard.getReinterpretedText(),
                mindCard.getSummary(),
                keywords,
                mindCard.getCreatedAt()
        );
    }

    public List<MindCardDetailResponse> getMindCardsByDate(LocalDate date) {

        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();

        return mindCardRepository
                .findByCreatedAtGreaterThanEqualAndCreatedAtLessThanOrderByCreatedAtDesc(
                        start, end
                )
                .stream()
                .map(this::toDetailResponse)
                .toList();
    }
}
