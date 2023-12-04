package ru.khalitov.marketplace.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Product extends DateAudit {
    @Id @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    @JoinColumn(name="product_id")
    @OneToMany(cascade = CascadeType.ALL)
    private Set<ProductSize> productSizes = new HashSet<>();

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
