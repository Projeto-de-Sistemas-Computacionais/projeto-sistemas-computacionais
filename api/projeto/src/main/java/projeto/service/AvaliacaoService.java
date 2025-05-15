package projeto.service;

import org.springframework.stereotype.Service;
import projeto.model.Avaliacao;
import java.util.List;
import java.util.ArrayList;

@Service
public class AvaliacaoService {

    public List<Avaliacao> buscaTodos() {
        // Implementar
        return new ArrayList<>();
    }

    public Avaliacao buscaPorId(Long id) {
        // Implementar
        return null;
    }

    public Avaliacao salvar(Avaliacao avaliacao) {
        // Implementar
        return avaliacao;
    }

    public Avaliacao atualizar(Long id, Avaliacao avaliacao) {
        // Implementar
        return avaliacao;
    }

    public void deletar(Long id) {
        // Implementar
    }
}
