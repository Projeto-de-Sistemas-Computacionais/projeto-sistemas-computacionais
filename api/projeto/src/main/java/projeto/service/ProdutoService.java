package projeto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projeto.model.Produto;
import projeto.repository.ProdutoRepository;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public Produto cadastrar(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado."));
    }

    public List<Produto> buscarTodos() {
        return produtoRepository.findAll();
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto produtoExistente = buscarPorId(id);

        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setDescricao(produtoAtualizado.getDescricao());
        produtoExistente.setRestricoes(produtoAtualizado.getRestricoes());
        //produtoExistente.setImagens(produtoAtualizado.getImagens());
        produtoExistente.setTabelaNutricional(produtoAtualizado.getTabelaNutricional());

        return produtoRepository.save(produtoExistente);
    }

    public void deletar(Long id) {
        produtoRepository.deleteById(id);
    }
}
