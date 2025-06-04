package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projeto.model.Receita;

public interface ReceitaRepository  extends JpaRepository<Receita, Long> {
}
