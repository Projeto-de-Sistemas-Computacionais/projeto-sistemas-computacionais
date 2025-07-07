package projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projeto.model.Tipo;
import projeto.service.TipoService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/tipo") 	
public class TipoController {

	@Autowired
    private TipoService tipoService;
	
	
	 @PostMapping
	    public ResponseEntity<Tipo> cadastrar(@RequestBody Tipo tipo){
	        Tipo response = tipoService.cadastrar(tipo);
	        return ResponseEntity.status(HttpStatus.CREATED).body(response);
	    }

	    @GetMapping("{id}")
	    public ResponseEntity<Tipo> buscarPorId(@PathVariable Long id){
	        Tipo response = tipoService.buscarPorId(id);
	        return ResponseEntity.ok(response);
	    }

	    @GetMapping
	    public ResponseEntity<List<Tipo>> buscarTodos(){
	        List<Tipo> response = tipoService.buscarTodos();
	        return ResponseEntity.ok(response);
	    }

	    @PutMapping("{id}")
	    public ResponseEntity<Tipo> atualizar(@PathVariable Long id, @RequestBody Tipo tipo){
	        Tipo response = tipoService.atualizar(id, tipo);
	        return ResponseEntity.ok(response);
	    }

	    @DeleteMapping("{id}")
	    public ResponseEntity<Void> deletar(@PathVariable Long id){
	        tipoService.deletar(id);
	        return ResponseEntity.noContent().build();
	    }
	}
	
	
	
	
	
	
	
	

