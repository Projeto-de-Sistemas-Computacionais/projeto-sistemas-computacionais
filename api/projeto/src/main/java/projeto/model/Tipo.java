package projeto.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity

public class Tipo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String descricao;

	@OneToMany(mappedBy="tipo")
	private List<Produto> produtos;

	@ManyToMany(mappedBy="ingredientes")
	private List<Receita> receitas;

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }

    public List<Receita> getReceitas() {
        return receitas;
    }

    public void setReceitas(List<Receita> receitas) {
        this.receitas = receitas;
    }

    public void addReceita(Receita receita) {
        receitas.add(receita);
        receita.getIngredientes().add(this);
    }
 
    public void removeReceita(Receita receita) {
        receitas.remove(receita);
        receita.getIngredientes().remove(this);
    }

}
