package projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projeto.model.Fabricante;
import projeto.service.FabricanteService;

@RestController
@RequestMapping("/fabricantes")
public class FabricanteController {

    @Autowired
    private FabricanteService fabricanteService;

    @PostMapping
    public ResponseEntity<Fabricante> cadastrar(@RequestBody Fabricante fabricante, @RequestHeader("login-token") String token) {
        Fabricante response = fabricanteService.cadastrar(fabricante);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("{id}")
    public ResponseEntity<Fabricante> buscarPorId(@PathVariable Long id, @RequestHeader("login-token") String token) {
        Fabricante response = fabricanteService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<Fabricante>> buscarTodos(@RequestHeader("login-token") String token) {
        List<Fabricante> response = fabricanteService.buscarTodos();
        return ResponseEntity.ok(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<Fabricante> atualizar(@PathVariable Long id, @RequestBody Fabricante fabricante, @RequestHeader("login-token") String token) {
        Fabricante response = fabricanteService.atualizar(id, fabricante);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id, @RequestHeader("login-token") String token) {
        fabricanteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
