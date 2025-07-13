package projeto.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import java.util.List;
import projeto.model.Restaurante;
import projeto.service.RestauranteService;
import projeto.service.SessionService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/restaurantes")
public class RestauranteController {

    @Autowired
    private RestauranteService restauranteService;

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<Restaurante> cadastrar(@RequestBody Restaurante restaurante, @RequestHeader("login-token") String token) {
        sessionService.getSessionByToken(token);
        
        Restaurante novoRestaurante = restauranteService.cadastrar(restaurante);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoRestaurante);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurante> buscarPorId(@PathVariable Long id, @RequestHeader("login-token") String token) {
        sessionService.getSessionByToken(token);
        Restaurante restaurante = restauranteService.buscarPorId(id);
        return ResponseEntity.ok(restaurante);
    }

    @GetMapping
    public ResponseEntity<List<Restaurante>> buscarTodos(@RequestHeader("login-token") String token) {
        sessionService.getSessionByToken(token);
        List<Restaurante> restaurantes = restauranteService.buscarTodos();
        return ResponseEntity.ok(restaurantes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurante> atualizar(@PathVariable Long id, @RequestBody Restaurante restaurante, @RequestHeader("login-token") String token) {
        sessionService.getSessionByToken(token);
        Restaurante restauranteAtualizado = restauranteService.atualizar(id, restaurante);
        return ResponseEntity.ok(restauranteAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id, @RequestHeader("login-token") String token) {
        sessionService.getSessionByToken(token);
        restauranteService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{id}/favoritar")
    public ResponseEntity<Void> favoritar(@PathVariable Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        restauranteService.favoritar(id, token);
        return ResponseEntity.noContent().build();
    }
}
