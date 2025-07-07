package projeto.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import projeto.model.Avaliacao;
import projeto.model.Restricao;
import projeto.model.Tipo;
import projeto.model.Usuario;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReceitaDto {
    private Long id;

    private String titulo;
    private int tempoPreparo;
    private int porcoes;
    private String nivelDificuldade;
    private String descricao;
    private String modoPreparo;

    private List<Tipo> ingredientes;

    private List<Restricao> restricoes;

    private UsuarioSimplesDto usuarioCriador;

    private List<Avaliacao> avaliacoes;

    private List<String> imagens = new ArrayList<>();
}
