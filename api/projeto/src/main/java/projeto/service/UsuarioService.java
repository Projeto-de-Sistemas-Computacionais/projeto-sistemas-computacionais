package projeto.service;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import projeto.model.Endereco;
import projeto.model.Restricao;
import projeto.model.Usuario;
import projeto.repository.EnderecoRepository;
import projeto.repository.RestricaoRepository;
import projeto.repository.UsuarioRepository;

import java.util.List;

@Slf4j
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private RestricaoRepository restricaoRepository;

    public Usuario cadastrar(Usuario usuario){
        Endereco endereco = usuario.getEndereco();
        enderecoRepository.save(endereco); // salvo o endereco antes de salvar usuario, alterar para usar EnderecoService

        List<Restricao> restricoes = usuario.getRestricoes();
        for(Restricao restricao : restricoes)
            restricaoRepository.save(restricao); // salva restricoes no banco, alterar para usar RestricaoService

        return usuarioRepository.save(usuario); // salva o usuario no banco
    }

    public Usuario buscarPorId(Long id){
        return usuarioRepository.findById(id) // busca usuario pelo ID no banco
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Usuário com id %s não encontrado", id))); // caso não tenha um usuário com este ID, lança uma exception
    }

    public List<Usuario> buscarTodos(){
        return usuarioRepository.findAll(); // busca todos usuarios do banco
    }

    public Usuario atualizar(Long id, Usuario usuario){
        buscarPorId(id); // busca por id, quando não encontrar ele vai lançar exception e não vai continuar o próximo passo

        //falta atualizar endereco e restricoes

        usuario.setId(id); // adiciona o id no usuario
        return usuarioRepository.save(usuario); // salva no banco
    }

    public void deletar(Long id){
        buscarPorId(id); // busca por id, quando não encontrar ele vai lançar exception e não vai continuar o próximo passo
        usuarioRepository.deleteById(id); // deleta o usuario pelo id informado
    }
}