package projeto.mapper;

import projeto.dto.UsuarioSimplesDto;
import projeto.model.Usuario;

public class UsuarioMapper {

    public static UsuarioSimplesDto toUsuarioSimplesDto(Usuario usuario){
        return UsuarioSimplesDto.builder()
                .id(usuario.getId())
                .nomeCompleto(usuario.getNomeCompleto())
                .email(usuario.getEmail())
                .build();
    }
}
