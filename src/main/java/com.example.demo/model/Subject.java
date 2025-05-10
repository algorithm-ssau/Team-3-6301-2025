package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String startText;
    private String durationText;
    private Double durationNumber;

    // Mapping prices per tier
    @ElementCollection
    @CollectionTable(name = "subject_prices",
            joinColumns = @JoinColumn(name = "subject_id"))
    @MapKeyEnumerated(EnumType.STRING)
    @MapKeyColumn(name = "tier")
    private Map<Tier, Price> prices = new HashMap<>();

    // Mapping card entries: list of text lines with associated tier
    @ElementCollection
    @CollectionTable(name = "subject_cards",
            joinColumns = @JoinColumn(name = "subject_id"))
    private List<CardEntry> cardEntries = new ArrayList<>();
}
