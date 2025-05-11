package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "subject_price")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class SubjectPriceEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private SubjectEntity subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_type_id", nullable = false)
    private PriceTypeEntity priceType;

    @Column(nullable = false)
    private int tier; // 1..3

    @Column(nullable = false)
    private int amount;
}