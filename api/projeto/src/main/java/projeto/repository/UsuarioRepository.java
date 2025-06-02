package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projeto.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    Usuario findByEmailAndSenha(String email, String senha);

    boolean existsByEmail(String email);
}
