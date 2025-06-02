package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import projeto.model.Tipo;

public interface TipoRepository extends JpaRepository<Tipo, Long> {
}