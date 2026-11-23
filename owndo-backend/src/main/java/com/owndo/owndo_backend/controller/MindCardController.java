package com.owndo.owndo_backend.controller;

import com.owndo.owndo_backend.dto.MindCardRequest;
import com.owndo.owndo_backend.dto.MindCardResponse;
import com.owndo.owndo_backend.service.MindCardService;
import com.owndo.owndo_backend.dto.MindCardDetailResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

@RestController
@RequestMapping("/api/mind-cards")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MindCardController {

    private final MindCardService mindCardService;

    @PostMapping("/reinterpret")
    public MindCardResponse reinterpret(
            @Valid @RequestBody MindCardRequest request
    ) {
        return mindCardService.reinterpret(request);
    }

    @GetMapping
    public List<MindCardDetailResponse> getAllMindCards() {
        return mindCardService.getAllMindCards();
    }

    @GetMapping("/{id}")
    public MindCardDetailResponse getMindCardById(
            @PathVariable Long id
    ) {
        return mindCardService.getMindCardById(id);
    }

    @GetMapping("/date/{date}")
    public List<MindCardDetailResponse> getMindCardsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        return mindCardService.getMindCardsByDate(date);
    }

}
