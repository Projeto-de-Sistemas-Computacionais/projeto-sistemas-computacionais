package projeto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;
import projeto.repository.EnderecoRepository;
import projeto.model.Endereco;

@Slf4j
@Service
public class EnderecoService {
	
	@Autowired
    private EnderecoRepository enderecoRepository;
	
	public List<Endereco> buscarTodos(){
		return enderecoRepository.findAll();
	}
	
	public Endereco buscarPorId(Long id) {
		return enderecoRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Endereço com id %s não encontrado", id))); 
	}
	
	public Endereco salvar (Endereco endereco) {
		return enderecoRepository.save(endereco);
	}
	
	public Endereco atualizar(Long id, Endereco endereco) {
		buscarPorId(id);
		
		endereco.setId(id);
		return salvar(endereco);
	}
	
	public void deletar(Long id) {
		buscarPorId(id);
		enderecoRepository.deleteById(id);
	}

}