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
    private String nome;
    private String descricao;

    @ManyToMany(cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    })
    @JoinTable(
            name = "produto_restricao",
            joinColumns = @JoinColumn(name = "id_restricao"),
            inverseJoinColumns = @JoinColumn(name = "id_produto")
    )
    private List<Produto> produtos = new ArrayList<>();

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }
    
    public void addProduto(Produto produto) {
        produtos.add(produto);
        produto.getRestricoes().add(this);
    }
 
    public void removeProduto(Produto produto) {
        produtos.remove(produto);
        produto.getRestricoes().remove(this);
    }

    @ManyToMany(mappedBy = "restricoes")
    private List<Usuario> usuarios = new ArrayList<>();

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public void addUsuario(Usuario usuario) {
        usuarios.add(usuario);
        usuario.getRestricoes().add(this);
    }
 
    public void removeUsuario(Usuario usuario) {
        usuarios.remove(usuario);
        usuario.getRestricoes().remove(this);
    }

        @ManyToMany(mappedBy = "restricoes")
    private List<Restaurante> restaurantes = new ArrayList<>();

    public List<Restaurante> getRestaurantes() {
        return restaurantes;
    }

    public void setRestaurantes(List<Restaurante> restaurantes) {
        this.restaurantes = restaurantes;
    }

    public void addRestaurante(Restaurante restaurante) {
        restaurantes.add(restaurante);
        restaurante.getRestricoes().add(this);
    }
 
    public void removeRestaurante(Restaurante restaurante) {
        restaurantes.remove(restaurante);
        restaurante.getRestricoes().remove(this);
    }
}
