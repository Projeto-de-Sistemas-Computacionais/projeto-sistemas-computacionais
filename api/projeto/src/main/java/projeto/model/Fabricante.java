package projeto.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Fabricante {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

    @OneToOne
    @JoinColumn(name = "id_endereco")
	private Endereco endereco;
	
	//list de produtos
}
