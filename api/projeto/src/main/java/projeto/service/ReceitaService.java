package projeto.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import projeto.dto.ReceitaDto;
import projeto.mapper.ReceitaMapper;
import projeto.model.Receita;
import projeto.repository.ReceitaRepository;

import java.util.List;

@Slf4j
@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    public ReceitaDto cadastrar(Receita receita){
        receitaRepository.save(receita);
        return ReceitaMapper.toReceitaDto(receita);
    }

    public Receita buscarPorId(Long id){
        return receitaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Receita com id %s não encontrado", id)));
    }

    public ReceitaDto buscar(Long id){
        Receita receita = buscarPorId(id);
        return ReceitaMapper.toReceitaDto(receita);
    }

    public List<ReceitaDto> buscarTodos(String filtro){
        List<Receita> receitas = receitaRepository.findAllReceita(filtro);
        return receitas.stream().map(ReceitaMapper::toReceitaDto).toList();
    }

    public ReceitaDto atualizar(Long id, Receita receita){
        buscarPorId(id);

        receita.setId(id);
        receitaRepository.save(receita);
        return ReceitaMapper.toReceitaDto(receita);
    }

    public void deletar(Long id){
        buscarPorId(id);
        receitaRepository.deleteById(id);
    }
}