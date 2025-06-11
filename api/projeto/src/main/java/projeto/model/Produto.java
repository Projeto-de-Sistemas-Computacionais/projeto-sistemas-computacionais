package projeto.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    @ManyToMany(mappedBy = "produtos")
    private List<Restricao> restricoes;

    @OneToMany(mappedBy="produto")
    private List<Avaliacao> avaliacoes;

    @ManyToOne
    @JoinColumn(name="id_tipo")
    private Tipo tipo;

    @ElementCollection
    @CollectionTable(
            name = "produto_imagens",
            joinColumns = @JoinColumn(name = "produto_id")
    )
    @Column(name = "imagem")
    private List<String> imagens = new ArrayList<>();


    private String tabelaNutricional;



    public List<Restricao> getRestricoes() {
        return restricoes;
    }   
    
    public void setRestricoes(List<Restricao> restricoes) {
        this.restricoes = restricoes;
    }

    public void addRestricao(Restricao restricao) {
        restricoes.add(restricao);
        restricao.getProdutos().add(this);
    }
 
    public void removeRestricao(Restricao restricao) {
        restricoes.remove(restricao);
        restricao.getProdutos().remove(this);
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }
}
