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
    public ResponseEntity<List<Receita>> buscarTodos(@RequestParam(name = "filtro", required = false, defaultValue = "") String filtro){
        List<Receita> response = receitaService.buscarTodos(filtro);
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
