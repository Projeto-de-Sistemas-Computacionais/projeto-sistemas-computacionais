package projeto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projeto.model.Restricao;
import projeto.service.RestricaoService;

import java.util.List;

@RestController
@RequestMapping("/restricao")
public class RestricaoController {

    @Autowired
    RestricaoService restricaoService;

    @PostMapping
    public ResponseEntity<Restricao> cadastrar(@RequestParam("restricao") Restricao restricao){
        return ResponseEntity.ok(restricaoService.cadastrar(restricao));
    }

//    @PostMapping
//    public ResponseEntity<List<Restricao>> saveAll(@RequestParam("restricao") List<Restricao> restricoes){
//        return ResponseEntity.ok(restricaoService.saveAll(restricoes));
//    }

    @GetMapping
    public ResponseEntity<List<Restricao>> buscarTodos(){
        return ResponseEntity.ok(restricaoService.buscarTodos());
    }

    @GetMapping("{id}")
    @ResponseBody
    public ResponseEntity<Restricao> BuscarPorId(@PathVariable("id") Long id){
        return ResponseEntity.ok(restricaoService.buscarPorId(id));
    }


    @PutMapping("{id}")
    @ResponseBody
    public ResponseEntity<Restricao> atualizar(@RequestParam("restricao") Restricao restricao, @PathVariable("id") Long id){
        return ResponseEntity.ok(restricaoService.atualizar(id, restricao));
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deletar(@PathVariable("id") Long id){
        restricaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
