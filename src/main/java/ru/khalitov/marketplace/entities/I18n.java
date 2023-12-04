package ru.khalitov.marketplace.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class I18n extends DateAudit {
    @Id
    @GeneratedValue
    private Long id;

    String path;

    String value;
}
