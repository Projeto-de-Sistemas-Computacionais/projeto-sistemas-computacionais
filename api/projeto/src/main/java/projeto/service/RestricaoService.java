package projeto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import projeto.model.Restricao;
import projeto.repository.RestricaoRepository;

import java.util.List;

@Service
public class RestricaoService {


    @Autowired
    private RestricaoRepository restricaoRepository;

    public Restricao cadastrar(Restricao resticao){
        return restricaoRepository.save(resticao);
    }

    public List<Restricao> saveAll(List<Restricao> restricoes){
        return restricaoRepository.saveAll(restricoes);
    }

    public Restricao buscarPorId(Long id){
        return restricaoRepository.findById(id) // busca usuario pelo ID no banco
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Restrição com id %s não encontrada", id))); // caso não tenha um usuário com este ID, lança uma exception
    }

    public List<Restricao> buscarTodos(){
        return restricaoRepository.findAll();
    }


    public Restricao atualizar(Long id, Restricao restricao){
      //  Restricao antigaRestricao = buscarPorId(id);
        restricao.setId(id);
        return restricaoRepository.save(restricao);
    }

    public void deletar(Long id){
        buscarPorId(id);
        restricaoRepository.deleteById(id);
    }

}
