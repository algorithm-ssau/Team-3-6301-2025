package com.example.demo.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDto {
    private String name;
    private List<Integer> priceFull;
    private List<Integer> priceMonthly;
    private List<Integer> priceInstallment;
    private String startText;
    private String durationText;
    private double durationNumber;
    private String cardText;
}
