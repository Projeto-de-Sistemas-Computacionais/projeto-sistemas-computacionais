package projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projeto.model.Produto;
import projeto.service.ProdutoService;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<Produto> cadastrar(@RequestBody Produto produto, @RequestHeader("login-token") String token) {
        Produto response = produtoService.cadastrar(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id, @RequestHeader("login-token") String token) {
        Produto response = produtoService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> buscarTodos(@RequestHeader("login-token") String token) {
        List<Produto> response = produtoService.buscarTodos();
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produto, @RequestHeader("login-token") String token) {
        Produto response = produtoService.atualizar(id, produto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id, @RequestHeader("login-token") String token) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
