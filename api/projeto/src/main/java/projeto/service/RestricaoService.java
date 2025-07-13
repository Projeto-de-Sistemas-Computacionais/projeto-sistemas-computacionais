package projeto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import projeto.model.Restricao;
import projeto.repository.RestricaoRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class RestricaoService {


    @Autowired
    private RestricaoRepository restricaoRepository;

    public Restricao cadastrar(Restricao restricao){
        Optional<Restricao> restricaoExistente = restricaoRepository.findByNome(restricao.getNome());
        return restricaoExistente.orElseGet(() -> restricaoRepository.save(restricao));
    }

    public List<Restricao> saveAll(List<Restricao> restricoes){
        return restricaoRepository.saveAll(restricoes);
    }

    public Restricao buscarPorId(Long id){
        return restricaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Restrição com id %s não encontrada", id)));
    }

    public List<Restricao> buscarTodos(){
        return restricaoRepository.findAll();
    }


    public Restricao atualizar(Long id, Restricao restricao){
        Restricao restricaoAntiga = buscarPorId(id);
        restricao.setId(id);
        return restricaoRepository.save(restricao);
    }

    public void deletar(Long id){
        buscarPorId(id);
        restricaoRepository.deleteById(id);
    }

}
