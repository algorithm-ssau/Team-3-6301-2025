package com.example.demo.repository;

import com.example.demo.domain.SubjectPriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectPriceRepository extends JpaRepository<SubjectPriceEntity, Long> {
    List<SubjectPriceEntity> findBySubjectIdOrderByPriceTypeIdAscTierAsc(Long subjectId);
}