package ru.khalitov.marketplace.configurations;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.Bindable;
import org.modelmapper.ModelMapper;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import ru.khalitov.marketplace.entities.Product;

import java.util.Arrays;

@Configuration
@EnableJpaAuditing
public class CommonConfiguration implements RepositoryRestConfigurer {
    @Autowired
    private EntityManager entityManager;

    @Bean
    public ModelMapper createModelMapper() {
        return new ModelMapper();
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        Class<?>[] entities = (Class<?>[]) entityManager.getMetamodel().getEntities().stream().map(Bindable::getBindableJavaType).toArray(Class[]::new);

        config.exposeIdsFor(entities);
    }
}
