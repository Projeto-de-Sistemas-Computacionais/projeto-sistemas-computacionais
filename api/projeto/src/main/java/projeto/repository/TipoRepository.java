package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import projeto.model.Tipo;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface TipoRepository extends JpaRepository<Tipo, Long> {
    Optional<Tipo> findByDescricao(String descricao);
}