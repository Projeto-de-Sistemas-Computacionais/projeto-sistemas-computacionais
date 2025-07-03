package projeto.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import projeto.model.Receita;
import projeto.repository.ReceitaRepository;

import java.util.List;

@Slf4j
@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    public Receita cadastrar(Receita receita){
        return receitaRepository.save(receita);
    }

    public Receita buscarPorId(Long id){
        return receitaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Receita com id %s não encontrado", id)));
    }

    public List<Receita> buscarTodos(){
        return receitaRepository.findAll();
    }

    public List<Receita> buscarPorTitulo(String titulo){
        return receitaRepository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Receita> buscarPorIngredientes(List<Tipo> ingredientes){
        return receitaRepository.findByIngredientesIn(ingredientes);
    }

    public List<Receita> buscarPorCriador(Usuario usuario){
        return receitaRepository.findByUsuarioCriador(usuario);
    }

    public Receita atualizar(Long id, Receita receita){
        buscarPorId(id);

        receita.setId(id);
        return receitaRepository.save(receita);
    }

    public void deletar(Long id){
        buscarPorId(id);
        receitaRepository.deleteById(id);
    }
}