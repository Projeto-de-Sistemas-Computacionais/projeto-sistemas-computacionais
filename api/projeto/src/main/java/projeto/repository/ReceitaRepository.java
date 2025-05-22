package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import projeto.model.Receita;

public class ReceitaRepository {

	public interface receitaRepository extends JpaRepository<Receita, Long> {
	}
}
