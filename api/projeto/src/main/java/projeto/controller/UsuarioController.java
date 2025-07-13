package projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import projeto.dto.LoginDto;
import projeto.dto.ReceitaDto;
import projeto.dto.UsuarioSimplesDto;
import projeto.dto.AlteracaoSenhaDto;
import projeto.model.Restaurante;
import projeto.model.Session;
import projeto.model.Usuario;
import projeto.service.SessionService;
import projeto.service.UsuarioService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private SessionService sessionService;
    
    @PostMapping
    public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario){
        Usuario response = usuarioService.cadastrar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);

        Usuario response = usuarioService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> buscarTodos(@RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);

        List<Usuario> response = usuarioService.buscarTodos();
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);

        Usuario response = usuarioService.atualizar(id, usuario);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/senha")
    public ResponseEntity<Void> alterarSenha(@PathVariable Long id, @RequestBody AlteracaoSenhaDto dto, @RequestHeader("login-token") String token) {
        sessionService.getSessionByToken(token);

        usuarioService.atualizarSenha(id, dto.getSenhaAtual(), dto.getNovaSenha());

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);

        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto request) {
        Usuario userLogged = usuarioService.login(request.getEmail(), request.getSenha());

        Session session = sessionService.findByUserId(userLogged.getId());

        if (session == null) {
            session = new Session(userLogged.getId());
            sessionService.createSession(session);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário já está logado.");
        }

        // Adding the token to the response header
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("login-token", session.getToken());

        return ResponseEntity.ok()
                .headers(responseHeaders)
                .header("Access-Control-Expose-Headers", "login-token")
                .body("Usuário logado.");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("login-token") String token) {
        sessionService.invalidateSession(token);
        return new ResponseEntity<String>("Usuário deslogado.", HttpStatus.OK);
    }

    @GetMapping("/logado")
    public ResponseEntity<UsuarioSimplesDto> buscarUsuarioLogado(@RequestHeader("login-token") String token) {
        UsuarioSimplesDto response = sessionService.getUsuarioLogado(token);
        return ResponseEntity.ok(response);
    }

    @GetMapping("receitasFavoritas")
    public ResponseEntity<List<ReceitaDto>> buscarReceitasFavoritadas(@RequestHeader("login-token") String token){
        Long idUsuario = sessionService.getUsuarioLogado(token).getId();
        List<ReceitaDto> response = usuarioService.buscarReceitasFavoritas(idUsuario);
        return ResponseEntity.ok(response);
    }

    @GetMapping("restaurantesFavoritos")
    public ResponseEntity<List<Restaurante>> buscarRestaurantesFavoritos(@RequestHeader("login-token") String token){
        Long idUsuario = sessionService.getUsuarioLogado(token).getId();
        List<Restaurante> response = usuarioService.buscarRestaurantesFavoritos(idUsuario);
        return ResponseEntity.ok(response);
    }
}