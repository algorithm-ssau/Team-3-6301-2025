package com.example.demo.repository;

import com.example.demo.domain.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubjectRepository extends JpaRepository<SubjectEntity, Long> {
    Optional<SubjectEntity> findByName(String name);
}
