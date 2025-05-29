package projeto.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Restricao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
            name = "usuario_restricao",
            joinColumns = @JoinColumn(name = "id_restricao"),
            inverseJoinColumns = @JoinColumn(name = "id_usuario")
    )
    private List<Usuario> usuarios;

    @ManyToMany
    @JoinTable(
            name = "produto_restricao",
            joinColumns = @JoinColumn(name = "id_restricao"),
            inverseJoinColumns = @JoinColumn(name = "id_produto")
    )
    private List<Produto> produtos;

    @ManyToMany
    @JoinTable(
            name = "restaurante_restricao",
            joinColumns = @JoinColumn(name = "id_restricao"),
            inverseJoinColumns = @JoinColumn(name = "id_restaurante")
    )
    private List<Restaurante> restaurantes;
}
