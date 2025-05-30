package projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.util.Date;

@Data
@Entity
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int nota;

    private Date data;

    private Usuario usuario;

    private Restaurante restaurante;

    private Receita receita;

    private Produto produto;
    
    private String comentario;

    public getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
}
