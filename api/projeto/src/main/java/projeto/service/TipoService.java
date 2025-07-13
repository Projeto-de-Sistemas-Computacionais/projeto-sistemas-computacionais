package projeto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;
import projeto.model.Tipo;
import projeto.repository.TipoRepository;

@Slf4j
@Service
public class TipoService {

	@Autowired
	private TipoRepository tipoRepository;

	public Tipo cadastrar(Tipo tipo) {
		Optional<Tipo> tipoExistente = tipoRepository.findByDescricao(tipo.getDescricao());
        return tipoExistente.orElseGet(() -> tipoRepository.save(tipo));
    }

	public Tipo buscarPorId(Long id) {
		return tipoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
				String.format("Tipo com id %s não encontrado", id)));
	}

	public List<Tipo> buscarTodos() {
		return tipoRepository.findAll();
	}

	public Tipo atualizar(Long id, Tipo tipo) {
		buscarPorId(id);
		tipo.setId(id);
		return tipoRepository.save(tipo);
	}

	public void deletar(Long id) {
		buscarPorId(id);

		tipoRepository.deleteById(id);
	}
}