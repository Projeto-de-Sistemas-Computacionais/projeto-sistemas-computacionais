package projeto.dto.request;

import lombok.Data;

@Data
public class LoginUsuarioRequest {
    String email;
    String senha;
}
