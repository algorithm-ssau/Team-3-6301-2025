package com.example.demo.repository;

import com.example.demo.domain.CardTextEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardTextRepository extends JpaRepository<CardTextEntity, Long> {
    Optional<CardTextEntity> findByText(String text);
}
