package com.owndo.owndo_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "mind_card")
@Getter
@NoArgsConstructor
public class MindCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String emotion;

    @Column(name = "reinterpreted_text", nullable = false)
    private String reinterpretedText;

    @Column(nullable = false)
    private String summary;

    private String keywords;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public MindCard(
            String content,
            String emotion,
            String reinterpretedText,
            String summary,
            String keywords,
            LocalDateTime createdAt
    ) {
        this.content = content;
        this.emotion = emotion;
        this.reinterpretedText = reinterpretedText;
        this.summary = summary;
        this.keywords = keywords;
        this.createdAt = createdAt;
    }
}
