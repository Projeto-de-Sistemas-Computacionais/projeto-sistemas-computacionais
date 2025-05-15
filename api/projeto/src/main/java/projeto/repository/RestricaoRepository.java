package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projeto.model.Endereco;

@Repository
public interface RestricaoRepository extends JpaRepository<RestricaoRepository, Long> {
}
