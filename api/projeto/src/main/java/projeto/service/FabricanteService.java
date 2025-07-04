package projeto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import projeto.model.Endereco;
import projeto.model.Fabricante;
import projeto.model.Produto;
import projeto.repository.FabricanteRepository;
import projeto.repository.ProdutoRepository;

public class FabricanteService {
	@Autowired
    private FabricanteRepository fabricanteRepository;

    @Autowired
    private EnderecoService enderecoService;

    @Autowired
    private ProdutoService produtoService;

    public Fabricante cadastrar(Fabricante fabricante){
        boolean fabricanteExistente = fabricanteRepository.existsById(fabricante.getId());
        if(fabricanteExistente)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Fabricante já cadastrado com o email informado.");

        Endereco endereco = fabricante.getEndereco();
        enderecoService.salvar(endereco); // salvo o endereco antes de salvar o fabricante, alterar para usar EnderecoService

        List<Produto> produtos = fabricante.getProdutos();
        for(Produto produto : produtos)
        	produtoService.cadastrar(produto); // salva produtos no banco

        return fabricanteRepository.save(fabricante); // salva o fabricante no banco
    }

    public Fabricante buscarPorId(Long id){
        return fabricanteRepository.findById(id) // busca fabricante pelo ID no banco
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Fabricante com id %s não encontrado", id))); // caso não tenha um fabricantecom este ID, lança uma exception
    }

    public List<Fabricante> buscarTodos(){
        return fabricanteRepository.findAll(); // busca todos fabricantes do banco
    }

    public Fabricante atualizar(Long id, Fabricante fabricante){
        buscarPorId(id); // busca por id, quando não encontrar ele vai lançar exception e não vai continuar o próximo passo

        fabricante.setId(id); // adiciona o id no fabricante
        return fabricanteRepository.save(fabricante); // salva no banco
    }

    public void deletar(Long id){
        buscarPorId(id); // busca por id, quando não encontrar ele vai lançar exception e não vai continuar o próximo passo
        fabricanteRepository.deleteById(id); // deleta o fabricante pelo id informado
    }
}
