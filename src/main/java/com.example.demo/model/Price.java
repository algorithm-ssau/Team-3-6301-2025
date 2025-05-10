package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Price {
    @Column(name = "full_price")
    private Integer full;
    @Column(name = "monthly_price")
    private Integer monthly;
    @Column(name = "installment_price")
    private Integer installment;
}