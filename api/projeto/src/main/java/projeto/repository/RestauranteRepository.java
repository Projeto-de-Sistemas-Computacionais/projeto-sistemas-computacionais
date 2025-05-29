package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projeto.model.Restaurante;

public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {
}
