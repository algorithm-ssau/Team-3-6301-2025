package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "subject")
@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class SubjectEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    @Column(name = "start_text", nullable = false)
    private String startText;
    @Column(name = "duration_text", nullable = false)
    private String durationText;
    @Column(name = "duration_number", nullable = false)
    private double durationNumber;
    @Column(nullable = false)
    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_text_id")
    private CardTextEntity cardText;
}

