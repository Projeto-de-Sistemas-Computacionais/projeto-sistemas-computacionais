package projeto.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data

public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private Integer tempoPreparo;
    private Integer porcoes;
    private String nivelDificuldade;
    private String descricao;
    private String modoPreparo;

    @ManyToMany
    private List<Object> ingredientes;

    @ManyToOne
    private Usuario usuario;

    @OneToMany
    private List<Object> imagens;
}



