package ru.khalitov.marketplace.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import ru.khalitov.marketplace.entities.I18n;
import ru.khalitov.marketplace.entities.Product;

@RepositoryRestResource(collectionResourceRel = "i18n", path = "i18n")
public interface I18nRepository extends JpaRepository<I18n, Long>, PagingAndSortingRepository<I18n, Long> {

    @Query("select e from I18n e "
            + "where (:q='' or e.path LIKE %:q%) "
    )
    Page<I18n> query(@Param("q") String q, Pageable page);
}
