package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projeto.model.Endereco;
import projeto.model.Restricao;

import java.util.Optional;

@Repository
public interface RestricaoRepository extends JpaRepository<Restricao, Long> {
    Optional<Restricao> findByNome(String nome);
}
