package projeto.mapper;

import projeto.dto.ReceitaDto;
import projeto.dto.UsuarioSimplesDto;
import projeto.model.Receita;

import java.util.List;

public class ReceitaMapper {

    public static ReceitaDto toReceitaDto(Receita receita){
        UsuarioSimplesDto usuarioSimples = UsuarioMapper.toUsuarioSimplesDto(receita.getUsuarioCriador());
        return ReceitaDto.builder()
                .id(receita.getId())
                .usuarioCriador(usuarioSimples)
                .titulo(receita.getTitulo())
                .tempoPreparo(receita.getTempoPreparo())
                .porcoes(receita.getPorcoes())
                .nivelDificuldade(receita.getNivelDificuldade())
                .descricao(receita.getDescricao())
                .modoPreparo(receita.getModoPreparo())
                .ingredientes(receita.getIngredientes())
                .restricoes(receita.getRestricoes())
                .avaliacoes(receita.getAvaliacoes())
                .imagens(receita.getImagens() != null ? receita.getImagens() : List.of())
                .build();
    }
}
