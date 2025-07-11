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

    public List<Receita> buscarTodos(String filtro){
        return receitaRepository.findAllReceita(filtro);
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