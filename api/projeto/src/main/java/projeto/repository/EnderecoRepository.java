package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projeto.model.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
}
