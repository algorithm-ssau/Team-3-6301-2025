package com.example.demo.repository;

import com.example.demo.domain.PriceTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PriceTypeRepository extends JpaRepository<PriceTypeEntity, Long> {
    Optional<PriceTypeEntity> findByName(String name);
}
