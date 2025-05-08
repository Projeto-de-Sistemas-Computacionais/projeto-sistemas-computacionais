package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projeto.model.Avaliacao;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
}
