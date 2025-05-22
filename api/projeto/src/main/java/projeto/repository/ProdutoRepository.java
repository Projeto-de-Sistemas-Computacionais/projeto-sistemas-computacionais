package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import projeto.model.Usuario;

public interface ProdutoRepository  extends JpaRepository<Usuario, Long> {
}
