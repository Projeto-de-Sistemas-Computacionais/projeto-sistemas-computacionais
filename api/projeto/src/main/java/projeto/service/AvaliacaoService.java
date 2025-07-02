package projeto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import projeto.model.Avaliacao;
import projeto.repository.AvaliacaoRepository;

import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public List<Avaliacao> buscaTodos() {
        return avaliacaoRepository.findAll();
    }

    public Avaliacao buscaPorId(Long id) {
        return avaliacaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        String.format("Avaliação com id %s não encontrada", id)
                ));
    }

    public Avaliacao salvar(Avaliacao avaliacao) {
        return avaliacaoRepository.save(avaliacao);
    }

    public Avaliacao atualizar(Long id, Avaliacao avaliacao) {
        // Verifica existência e lança exceção se não existir
        buscaPorId(id);

        avaliacao.setId(id);
        return avaliacaoRepository.save(avaliacao);
    }

    public void deletar(Long id) {
        Avaliacao avaliacao = buscaPorId(id); // lança exceção se não encontrar
        avaliacaoRepository.delete(avaliacao);
    }
}
