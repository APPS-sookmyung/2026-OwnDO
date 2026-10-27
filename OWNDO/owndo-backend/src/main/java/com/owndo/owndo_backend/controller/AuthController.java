package com.owndo.owndo_backend.controller;

import com.owndo.owndo_backend.entity.AppUser;
import com.owndo.owndo_backend.repository.AppUserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AppUserRepository appUserRepository;

    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(
            @AuthenticationPrincipal OAuth2User oAuth2User) {

        if (oAuth2User == null) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.UNAUTHORIZED,
                    "로그인이 필요합니다."
            );
        }

        String googleId = oAuth2User.getAttribute("sub");

        AppUser user = appUserRepository.findByGoogleId(googleId)
                .orElseGet(() -> {
                    String email = oAuth2User.getAttribute("email");
                    String name = oAuth2User.getAttribute("name");
                    String picture = oAuth2User.getAttribute("picture");
                    return appUserRepository.save(
                            new AppUser(googleId, email, name, picture)
                    );
                });

        return Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "name", user.getName(),
                "picture", user.getPicture() == null ? "" : user.getPicture()
        );
    }
}
