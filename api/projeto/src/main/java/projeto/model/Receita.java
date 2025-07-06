package projeto.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
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
    private int tempoPreparo;
    private int porcoes;
    private String nivelDificuldade;
    private String descricao;
    private String modoPreparo;

    @ManyToMany
    @JoinTable(name = "receita_tipo", joinColumns = @JoinColumn(name = "id_receita"), inverseJoinColumns=@JoinColumn(name="id_tipo"))
    private List<Tipo> ingredientes;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuarioCriador;

    @ManyToMany
    @JoinTable(name = "receita_usuario_favoritar", joinColumns = @JoinColumn(name = "id_receita"), inverseJoinColumns=@JoinColumn(name="id_usuario"))
    private List<Usuario> usuariosFavoritados;

    @OneToMany(mappedBy="receita")
    private List<Avaliacao> avaliacoes;

    @ElementCollection
    @CollectionTable(
            name = "produto_imagens",
            joinColumns = @JoinColumn(name = "produto_id")
    )
    @Column(name = "imagem")
    private List<String> imagens = new ArrayList<>();
}