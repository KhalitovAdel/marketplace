package ru.khalitov.marketplace.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductSize extends DateAudit {
    @Id
    @GeneratedValue
    private Long id;

    private String sizeName;

    @NotNull
    private String size;

    @NotNull
    private BigDecimal basePrice;

    @Column(name = "product_id")
    private Long productId;
}
