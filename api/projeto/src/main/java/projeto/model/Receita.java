package projeto.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private int tempoPreparo;
    private int porcoes;
    private String nivelDificuldade;
    private String descricao;
    private String modoPreparo;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "receita_tipo",
            joinColumns = @JoinColumn(name = "id_receita"),
            inverseJoinColumns = @JoinColumn(name = "id_tipo")
    )
    private List<Tipo> ingredientes;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "receita_restricao",
            joinColumns = @JoinColumn(name = "id_receita"),
            inverseJoinColumns = @JoinColumn(name = "id_restricao")
    )
    private List<Restricao> restricoes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario")
    private Usuario usuarioCriador;

    @OneToMany(mappedBy = "receita", fetch = FetchType.EAGER)
    private List<Avaliacao> avaliacoes;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "produto_imagens",
            joinColumns = @JoinColumn(name = "produto_id")
    )
    @Column(name = "imagem")
    private List<String> imagens = new ArrayList<>();
}