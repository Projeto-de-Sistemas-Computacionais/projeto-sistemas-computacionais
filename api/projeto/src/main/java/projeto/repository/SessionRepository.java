package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projeto.model.Session;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    Session findByToken(String token);

    void deleteByToken(String token);

    Session findByUserId(Long userId);
}
