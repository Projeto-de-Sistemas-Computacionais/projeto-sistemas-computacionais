package projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto.model.Receita;
import projeto.service.ReceitaService;

import java.util.List;

@RestController
@RequestMapping("/receitas")
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    @PostMapping
    public ResponseEntity<Receita> cadastrar(@RequestBody Receita receita){
        Receita response = receitaService.cadastrar(receita);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<Receita> buscarPorId(@PathVariable Long id){
        Receita response = receitaService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Receita>> buscarTodos(){
        List<Receita> response = receitaService.buscarTodos();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<Receita> buscarPorId(@PathVariable String titulo){
        List<Receita> response = receitaService.buscarPorTitulo(titulo);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/ingredientes/{ingredientes}")
    public ResponseEntity<Receita> buscarPorId(@PathVariable List<Tipo> ingredientes){
        List<Receita> response = receitaService.buscarPorIngredientes(ingredientes);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/criador/{usuario}")
    public ResponseEntity<Receita> buscarPorId(@PathVariable Usuario usuario){
        List<Receita> response = receitaService.buscarPorCriador(usuario);
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<Receita> atualizar(@PathVariable Long id, @RequestBody Receita receita){
        Receita response = receitaService.atualizar(id, receita);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        receitaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
