package com.example.demo.service;

import com.example.demo.api.dto.SubjectDto;
import com.example.demo.domain.SubjectEntity;
import com.example.demo.domain.SubjectPriceEntity;
import com.example.demo.repository.SubjectPriceRepository;
import com.example.demo.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepo;
    private final SubjectPriceRepository priceRepo;

    @Transactional(readOnly = true)
    public List<SubjectDto> findAll() {
        List<SubjectEntity> subjects = subjectRepo.findAll();
        return subjects.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public SubjectDto create(SubjectDto dto) {
        // Здесь можно добавить логику сохранения через Entity, но для краткости —
        // допустим, что при создании нам передают уже все сущности (cardText/priceType)
        throw new UnsupportedOperationException("Реализация create() зависит от ваших бизнес-требований");
    }

    private SubjectDto toDto(SubjectEntity subj) {
        List<SubjectPriceEntity> prices = priceRepo.findBySubjectIdOrderByPriceTypeIdAscTierAsc(subj.getId());
        // сгруппируем по типу
        Map<String, List<Integer>> grouped = prices.stream()
                .collect(Collectors.groupingBy(
                        p -> p.getPriceType().getName(),
                        LinkedHashMap::new,
                        Collectors.mapping(SubjectPriceEntity::getAmount, Collectors.toList())
                ));

        return new SubjectDto(
                subj.getName(),
                grouped.getOrDefault("full", List.of()),
                grouped.getOrDefault("monthly", List.of()),
                grouped.getOrDefault("installment", List.of()),
                subj.getStartText(),
                subj.getDurationText(),
                subj.getDurationNumber(),
                subj.getCardText() != null ? subj.getCardText().getText() : null
        );
    }
}
