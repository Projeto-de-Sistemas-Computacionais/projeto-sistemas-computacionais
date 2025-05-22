package projeto.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    @ManyToMany
    @JoinTable(
            name = "produto_restricao",
            joinColumns = @JoinColumn(name = "id_produto"),
            inverseJoinColumns = @JoinColumn(name = "id_restricao")
    )
    private List<Restricao> restricoes;

    private List<String> imagens;

    private String tabelaNutricional;
}
