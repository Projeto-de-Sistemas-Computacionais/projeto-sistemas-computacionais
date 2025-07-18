package projeto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import projeto.model.Receita;

import java.util.List;

public interface ReceitaRepository  extends JpaRepository<Receita, Long> {

    @Query("""
    SELECT r FROM Receita r
    JOIN r.ingredientes t
    JOIN r.usuarioCriador u
    WHERE UPPER(u.nomeCompleto) LIKE UPPER(CONCAT('%', :filtro, '%'))
       OR UPPER(r.titulo) LIKE UPPER(CONCAT('%', :filtro, '%'))
       OR UPPER(t.descricao) LIKE UPPER(CONCAT('%', :filtro, '%'))
    """)
    List<Receita> findAllReceita(@Param("filtro") String filtro);

}
