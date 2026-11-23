package com.owndo.owndo_backend.repository;

import com.owndo.owndo_backend.entity.MindCard;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface MindCardRepository extends JpaRepository<MindCard, Long> {
    List<MindCard> findByCreatedAtGreaterThanEqualAndCreatedAtLessThanOrderByCreatedAtDesc(
            LocalDateTime start,
            LocalDateTime end
    );
}
