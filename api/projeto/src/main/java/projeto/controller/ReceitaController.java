package projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projeto.dto.ReceitaDto;
import projeto.model.Receita;
import projeto.service.ReceitaService;
import projeto.service.SessionService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<ReceitaDto> cadastrar(@RequestBody Receita receita, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        ReceitaDto response = receitaService.cadastrar(receita, token);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<ReceitaDto> buscarPorId(@PathVariable Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        ReceitaDto response = receitaService.buscar(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ReceitaDto>> buscarTodos(@RequestParam(name = "filtro", required = false, defaultValue = "") String filtro, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        List<ReceitaDto> response = receitaService.buscarTodos(filtro);
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<ReceitaDto> atualizar(@PathVariable Long id, @RequestBody Receita receita, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        ReceitaDto response = receitaService.atualizar(id, receita, token);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        receitaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{id}/favoritar")
    public ResponseEntity<Void> favoritar(@PathVariable Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        receitaService.favoritar(id, token);
        return ResponseEntity.noContent().build();
    }
}
