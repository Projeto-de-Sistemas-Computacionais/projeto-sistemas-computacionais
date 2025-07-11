package projeto.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCompleto;
    private String email;
    private String senha;

    @OneToOne()
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "usuario_restricao",
            joinColumns = @JoinColumn(name = "id_usuario"),
            inverseJoinColumns = @JoinColumn(name = "id_restricao")
    )
    private List<Restricao> restricoes;

    @OneToMany(mappedBy="usuario", fetch = FetchType.EAGER)
    private List<Avaliacao> avaliacoes;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "receita_usuario_favoritar",
            joinColumns = @JoinColumn(name = "id_usuario"),
            inverseJoinColumns = @JoinColumn(name = "id_receita")
    )
    private List<Receita> receitasFavoritadas;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "restaurante_usuario_favoritar",
            joinColumns = @JoinColumn(name = "id_usuario"),
            inverseJoinColumns = @JoinColumn(name = "id_restaurante")
    )
    private List<Restaurante> restaurantesFavoritados;
}
