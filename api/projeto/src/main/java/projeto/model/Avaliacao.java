package projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Data
@Entity
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int nota;

    private Date data;

    @ManyToOne(optional=false)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne(optional=true)
    @JoinColumn(name = "id_restaurante")
    private Restaurante restaurante;

    @ManyToOne(optional=true)
    @JoinColumn(name = "id_receita")
    private Receita receita;

    @ManyToOne(optional=true)
    @JoinColumn(name = "id_produto")
    private Produto produto;
    
    private String comentario;
}
