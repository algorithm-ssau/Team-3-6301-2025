package com.example.demo.service;

import com.example.demo.api.dto.SubjectDto;
import com.example.demo.domain.CardTextEntity;
import com.example.demo.domain.PriceTypeEntity;
import com.example.demo.domain.SubjectEntity;
import com.example.demo.domain.SubjectPriceEntity;
import com.example.demo.repository.CardTextRepository;
import com.example.demo.repository.PriceTypeRepository;
import com.example.demo.repository.SubjectPriceRepository;
import com.example.demo.repository.SubjectRepository;
import jakarta.persistence.EntityNotFoundException;
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
    private final PriceTypeRepository priceTypeRepo;
    private final CardTextRepository cardTextRepo;


    @Transactional(readOnly = true)
    public List<SubjectDto> findAll() {
        List<SubjectEntity> subjects = subjectRepo.findAll();
        return subjects.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public SubjectDto create(SubjectDto dto) {
        // 1) Сохраняем Subject
        SubjectEntity subject = SubjectEntity.builder()
                .name(dto.getName())
                .title(dto.getTitle())
                .startText(dto.getStartText())
                .durationText(dto.getDurationText())
                .build();
        subject = subjectRepo.save(subject);

        // 2) Вставляем цены (типы будут автосозданы, если их нет)
        insertPrices(subject, "full", dto.getPriceFull());
        insertPrices(subject, "monthly", dto.getPriceMonthly());
        insertPrices(subject, "installment", dto.getPriceInstallment());

        // 3) Возвращаем DTO
        return toDto(subject);
    }
    @Transactional
    public void deleteByName(String name) {
        // Найдём сущность
        SubjectEntity subject = subjectRepo.findByName(name)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found: " + name));
        // Удалим — благодаря каскаду очистятся и цены
        subjectRepo.delete(subject);
    }

    private void insertPrices(SubjectEntity subject, String typeName, List<Integer> amounts) {
        PriceTypeEntity type = priceTypeRepo.findByName(typeName)
                .orElseGet(() -> {
                    // создаём новый PriceType, если не нашли
                    PriceTypeEntity p = new PriceTypeEntity();
                    p.setName(typeName);
                    return priceTypeRepo.save(p);
                });

        for (int i = 0; i < amounts.size(); i++) {
            SubjectPriceEntity price = SubjectPriceEntity.builder()
                    .subject(subject)
                    .priceType(type)
                    .tier(i + 1)
                    .amount(amounts.get(i))
                    .build();
            priceRepo.save(price);
        }
    }


    private SubjectDto toDto(SubjectEntity subj) {
        List<SubjectPriceEntity> prices = priceRepo.findBySubjectIdOrderByPriceTypeIdAscTierAsc(subj.getId());
        Map<String, List<Integer>> grouped = prices.stream()
                .collect(Collectors.groupingBy(
                        p -> p.getPriceType().getName(),
                        LinkedHashMap::new,
                        Collectors.mapping(SubjectPriceEntity::getAmount, Collectors.toList())
                ));

        return new SubjectDto(
                subj.getName(),
                subj.getTitle(),
                grouped.getOrDefault("full", List.of()),
                grouped.getOrDefault("monthly", List.of()),
                grouped.getOrDefault("installment", List.of()),
                subj.getStartText(),
                subj.getDurationText()
        );
    }
}
