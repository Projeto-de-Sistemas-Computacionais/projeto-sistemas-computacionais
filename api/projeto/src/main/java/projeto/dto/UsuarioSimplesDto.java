package projeto.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import projeto.model.Endereco;
import projeto.model.Restricao;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioSimplesDto {
    private Long id;
    private String nomeCompleto;
    private String email;
    private Endereco endereco;
    private List<Restricao> restricoes;
}
