package com.owndo.owndo_backend.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MindCardRequest {
    @NotBlank
    private String content;

    @NotBlank
    private String emotion;
}
