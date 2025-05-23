package projeto.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity

public class Tipo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String descricao;

}
