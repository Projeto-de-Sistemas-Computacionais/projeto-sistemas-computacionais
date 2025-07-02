package projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto.model.Restricao;
import projeto.service.RestricaoService;
import projeto.service.SessionService;

import java.util.List;

@RestController
@RequestMapping("/restricao")
public class RestricaoController {

    @Autowired
    RestricaoService restricaoService;

    @Autowired
    SessionService sessionService;

    @PostMapping
    public ResponseEntity<Restricao> cadastrar(@RequestBody Restricao restricao, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        return ResponseEntity.ok(restricaoService.cadastrar(restricao));
    }

//    @PostMapping
//    public ResponseEntity<List<Restricao>> saveAll(@RequestBody("restricao") List<Restricao> restricoes){
//        return ResponseEntity.ok(restricaoService.saveAll(restricoes));
//    }

    @GetMapping
    public ResponseEntity<List<Restricao>> buscarTodos(@RequestHeader("login-token") String token){

        sessionService.getSessionByToken(token);
        return ResponseEntity.ok(restricaoService.buscarTodos());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Restricao> BuscarPorId(@PathVariable("id") Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        return ResponseEntity.ok(restricaoService.buscarPorId(id));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Restricao> atualizar(@RequestBody Restricao restricao, @PathVariable("id") Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        return ResponseEntity.ok(restricaoService.atualizar(id, restricao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable("id") Long id, @RequestHeader("login-token") String token){
        sessionService.getSessionByToken(token);
        restricaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
