package projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
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

    @OneToOne(optional=false)
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;
  
    @ManyToMany
    @JoinTable(
        name = "restaurante_restricao",
        joinColumns = @JoinColumn(name = "id_restaurante"),
        inverseJoinColumns = @JoinColumn(name = "id_restricao")
    )
    private List<Restricao> restricoes;

    @OneToMany(mappedBy="restaurante")
    private List<Avaliacao> avaliacoes;

    public List<Restricao> getRestricoes() {
        return restricoes;
    }

    public void setRestricoes(List<Restricao> restricoes) {
        this.restricoes = restricoes;
    }

    public void addRestricao(Restricao restricao) {
        restricoes.add(restricao);
        restricao.getRestaurantes().add(this);
    }
 
    public void removeRestricao(Restricao restricao) {
        restricoes.remove(restricao);
        restricao.getRestaurantes().remove(this);
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void addEndereco(Endereco endereco) {
        if(getEndereco() != null) {
        this.getEndereco().setRestaurante(null);
        }
        this.setEndereco(endereco);
        endereco.setRestaurante(this);
    }
}