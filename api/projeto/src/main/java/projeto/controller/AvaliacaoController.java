package projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto.model.Avaliacao;
import projeto.service.AvaliacaoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/avaliacao")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping
    public List<Avaliacao> buscarTodos() {
        return avaliacaoService.buscarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Avaliacao> buscarPorId(@PathVariable Long id, @RequestHeader("login-token") String token) {
        Optional<Avaliacao> avaliacao = avaliacaoService.buscarPorId(id);
        return avaliacao.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Avaliacao salvar(@RequestBody Avaliacao avaliacao, @RequestHeader("login-token") String token) {
        return avaliacaoService.salvar(avaliacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Avaliacao> atualizar(@PathVariable Long id, @RequestBody Avaliacao avaliacao, @RequestHeader("login-token") String token) {
        Optional<Avaliacao> avaliacaoExistente = avaliacaoService.buscarPorId(id);
        if (avaliacaoExistente.isPresent()) {
            Avaliacao avaliacaoAtualizada = avaliacaoService.atualizar(id, avaliacao);
            return ResponseEntity.ok(avaliacaoAtualizada);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id, @RequestHeader("login-token") String token) {
        if (!avaliacaoService.buscaPorId(id)) {
            return ResponseEntity.notFound().build();
        }
        avaliacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
