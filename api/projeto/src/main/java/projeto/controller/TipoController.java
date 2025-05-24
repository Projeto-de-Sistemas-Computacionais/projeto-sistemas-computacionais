package projeto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projeto.model.Tipo;
import projeto.service.TipoService;

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
	
	
	
	
	
	
	
	

