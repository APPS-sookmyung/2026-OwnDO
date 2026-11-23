package com.owndo.owndo_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class MindCardDetailResponse {

    private Long id;
    private String content;
    private String emotion;
    private String reinterpretedText;
    private String summary;
    private List<String> keywords;
    private LocalDateTime createdAt;
}
