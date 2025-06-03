package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projeto.model.Restricao;

@Repository
public interface RestricaoRepository extends JpaRepository<Restricao, Long> {
}
