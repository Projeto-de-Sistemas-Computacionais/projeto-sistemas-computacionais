package projeto.service;

import org.springframework.stereotype.Service;
import projeto.model.Avaliacao;
import java.util.List;
import java.util.ArrayList;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public List<Avaliacao> buscaTodos() {
        return avaliacaoRepository.findAll();
    }

    public Avaliacao buscaPorId(Long id) {
        return avaliacaoRepository.findById(id)
    }

    public Avaliacao salvar(Avaliacao avaliacao) {
        return avaliacaoRepository.save(avaliacao);
    }

    public Avaliacao atualizar(Long id, Avaliacao avaliacao) {
        Avaliacao avaliacaoExistente = avaliacaoRepository.findById(id);
        if (avaliacaoExistente != null) {
            avaliacao.setId(id);
            return avaliacaoRepository.save(avaliacao); 
        }
        return null;
    }

    public void deletar(Long id) {
        Avaliacao avaliacao = avaliacaoRepository.findById(id);
        if (avaliacao != null) {
            avaliacaoRepository.delete(avaliacao);
        }
    }
}
