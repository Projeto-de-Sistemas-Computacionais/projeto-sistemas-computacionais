package projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projeto.model.Receita;
import projeto.service.ReceitaService;
import projeto.service.SessionService;

@RestController
@RequestMapping("/receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public ResponseEntity<Receita> cadastrar(@RequestBody Receita receita, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        Receita response = receitaService.cadastrar(receita);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<Receita> buscarPorId(@PathVariable Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        Receita response = receitaService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Receita>> buscarTodos(@RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        List<Receita> response = receitaService.buscarTodos();
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<Receita> atualizar(@PathVariable Long id, @RequestBody Receita receita, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        Receita response = receitaService.atualizar(id, receita);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        receitaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
