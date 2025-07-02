package projeto.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;
import projeto.model.Endereco;
import projeto.model.Restaurante;
import projeto.model.Restricao;
import projeto.repository.RestauranteRepository;
import projeto.repository.RestricaoRepository;

@Slf4j
@Service
public class RestauranteService {

    @Autowired
    private RestauranteRepository restauranteRepository;

    @Autowired
    private RestricaoRepository restricaoRepository;
    
    @Autowired
    private EnderecoService enderecoService;

    public Restaurante cadastrar(Restaurante restaurante){
        Endereco endereco = restaurante.getEndereco();
        enderecoService.salvar(endereco); // salvo o endereco antes de salvar restaurante, alterar para usar EnderecoService

        List<Restricao> restricoes = restaurante.getRestricoes();
        for(Restricao restricao : restricoes)
            restricaoRepository.save(restricao); // salva restricoes no banco, alterar para usar RestricaoService

        return restauranteRepository.save(restaurante); // salva o restaurante no banco
    }

    public Restaurante buscarPorId(Long id){
        return restauranteRepository.findById(id) // busca restaurante pelo ID no banco
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Restaurante com id %s não encontrado", id))); // caso não tenha um restaurante com este ID, lança uma exception
    }

    public List<Restaurante> buscarTodos(){
        return restauranteRepository.findAll(); // busca todos restaurantes do banco
    }

    public Restaurante atualizar(Long id, Restaurante restaurante){
        buscarPorId(id); // busca por id, quando não encontrar ele vai lançar exception e não vai continuar o próximo passo

        //falta atualizar endereco e restricoes

        restaurante.setId(id); // adiciona o id no restaurante
        return restauranteRepository.save(restaurante); // salva no banco
    }

    public void deletar(Long id){
        buscarPorId(id); // busca por id, quando não encontrar ele vai lançar exception e não vai continuar o próximo passo
        restauranteRepository.deleteById(id); // deleta o restaurante pelo id informado
    }
}
