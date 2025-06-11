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

    @OneToOne(optional=true)
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "usuario_restricao",
            joinColumns = @JoinColumn(name = "id_usuario"),
            inverseJoinColumns = @JoinColumn(name = "id_restricao")
    )
    private List<Restricao> restricoes;

    @OneToMany(mappedBy="usuario")
    private List<Avaliacao> avaliacoes;

    @OneToMany(mappedBy="usuarioCriador")
    private List<Receita> receitasCriadas;

    @ManyToMany(mappedBy="usuariosFavoritados")
    private List<Receita> receitasFavoritadas;

    public List<Restricao> getRestricoes() {
        return restricoes;
    }

    public void setRestricoes(List<Restricao> restricoes) {
        this.restricoes = restricoes;
    }

    public void addRestricao(Restricao restricao) {
        restricoes.add(restricao);
        restricao.getUsuarios().add(this);
    }
 
    public void removeRestricao(Restricao restricao) {
        restricoes.remove(restricao);
        restricao.getUsuarios().remove(this);
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void addEndereco(Endereco endereco) {
        if(getEndereco() != null) {
        this.getEndereco().setUsuario(null);
        }
        this.setEndereco(endereco);
        endereco.setUsuario(this);
    }

    public void removeEndereco() {
        if(getEndereco() != null) {
        this.getEndereco().setUsuario(null);
        }
        this.setEndereco(null);
    }

    public List<Avaliacao> getAvaliacoes() {
        return avaliacoes;
    }

    public void setAvaliacoes(List<Avaliacao> avaliacoes) {
        this.avaliacoes = avaliacoes;
    }

    public List<Receita> getReceitasCriadas() {
        return receitasCriadas;
    }

    public void setReceitasCriadas(List<Receita> receitasCriadas) {
        this.receitasCriadas = receitasCriadas;
    }

    public List<Receita> getReceitasFavoritadas() {
        return receitasFavoritadas;
    }

    public void setReceitasFavoritadas(List<Receita> receitasFavoritadas) {
        this.receitasFavoritadas = receitasFavoritadas;
    }

    public void addReceitaFavoritada(Receita receita) {
        receitasFavoritadas.add(receita);
        receita.getUsuariosFavoritados().add(this);
    }
 
    public void removeReceitaFavoritada(Receita receita) {
        receitasFavoritadas.remove(receita);
        receita.getUsuariosFavoritados().remove(this);
    }
}
