package projeto.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Fabricante {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String nome;
	
    @OneToOne
    @JoinColumn(name = "id_endereco")
	private Endereco endereco;

    @OneToMany(mappedBy="fabricante")
    private List<Produto> produtos;
}