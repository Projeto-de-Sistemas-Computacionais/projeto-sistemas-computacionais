package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import projeto.model.Produto;

public interface ProdutoRepository  extends JpaRepository<Produto, Long> {
}
