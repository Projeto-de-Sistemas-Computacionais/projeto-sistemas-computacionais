package projeto.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import projeto.model.Fabricante;

public interface FabricanteRepository  extends JpaRepository<Fabricante, Long> {
	Optional<Fabricante> findById(long id);

    boolean existsById(long id);
}
