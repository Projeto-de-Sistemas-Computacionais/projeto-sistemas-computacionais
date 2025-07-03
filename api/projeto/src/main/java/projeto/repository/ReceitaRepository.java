package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projeto.model.Receita;

public interface ReceitaRepository  extends JpaRepository<Receita, Long> {

    // titulo
    List<Receita> findByTituloContainingIgnoreCase(String titulo);

    // ingrediente
    List<Receita> findByIngredientesIn(List<Tipo> ingredientes);

    // criador
    List<Receita> findByUsuarioCriador(Usuario usuario);
}
