package projeto.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Restaurante {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    private String senha;

    
    private String imagem;

    
    @OneToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    
    @ManyToMany
    @JoinTable(
        name = "restaurante_restricao",
        joinColumns = @JoinColumn(name = "id_restaurante"),
        inverseJoinColumns = @JoinColumn(name = "id_restricao")
    )
    private List<Restricao> restricoes;

}
