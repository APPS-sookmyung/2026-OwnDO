
package com.owndo.owndo_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "app_user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String googleId;

    @Column(nullable = false)
    private String email;

    private String name;

    private String picture;

    @Column(nullable = false)
    private LocalDateTime createdAt;


    protected AppUser() {
    }


    public AppUser(
            String googleId,
            String email,
            String name,
            String picture) {

        this.googleId = googleId;
        this.email = email;
        this.name = name;
        this.picture = picture;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getGoogleId() {
        return googleId;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPicture() {
        return picture;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}

