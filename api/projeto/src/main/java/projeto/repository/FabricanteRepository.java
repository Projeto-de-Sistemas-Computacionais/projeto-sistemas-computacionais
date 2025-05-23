package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import projeto.model.Usuario;

public interface FabricanteRepository  extends JpaRepository<Usuario, Long> {
}
