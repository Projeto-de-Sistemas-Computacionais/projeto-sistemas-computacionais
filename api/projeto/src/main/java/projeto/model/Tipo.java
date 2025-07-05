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
}
