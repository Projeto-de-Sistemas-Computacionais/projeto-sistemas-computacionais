package projeto.service;

import java.util.ArrayList;
import java.util.List;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;
import projeto.model.Endereco;
import projeto.model.Restricao;
import projeto.model.Usuario;
import projeto.repository.UsuarioRepository;

@Slf4j
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EnderecoService enderecoService;

    @Autowired
    private RestricaoService restricaoService;

    public Usuario cadastrar(Usuario usuario){
        boolean usuarioExistente = usuarioRepository.existsByEmail(usuario.getEmail());
        if(usuarioExistente)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário já cadastrado com o email informado.");

        Endereco endereco = usuario.getEndereco();
        enderecoService.salvar(endereco); // salvo o endereco antes de salvar usuario, alterar para usar EnderecoService

        List<Restricao> restricoes = usuario.getRestricoes();
        for(Restricao restricao : restricoes)
            restricaoService.cadastrar(restricao); // salva restricoes no banco, alterar para usar RestricaoService

        return usuarioRepository.save(usuario); // salva o usuario no banco
    }

    @Transactional()
    public Usuario buscarPorId(Long id){
        return usuarioRepository.findById(id) // busca usuario pelo ID no banco
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Usuário com id %s não encontrado", id))); // caso não tenha um usuário com este ID, lança uma exception
    }

    public List<Usuario> buscarTodos(){
        return usuarioRepository.findAll(); // busca todos usuarios do banco
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {
        Usuario usuarioExistente = buscarPorId(id);

        if (!usuarioExistente.getSenha().equals(usuarioAtualizado.getSenha())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Senha incorreta.");
        }

        usuarioExistente.setNomeCompleto(usuarioAtualizado.getNomeCompleto());
        usuarioExistente.setEmail(usuarioAtualizado.getEmail());

        // Desassocia restrições antigas
        usuarioExistente.getRestricoes().clear();

        // Cria novas restrições
        List<Restricao> novasRestricoes = new ArrayList<>();
        for (Restricao restricao : usuarioAtualizado.getRestricoes()) {
            Restricao nova = new Restricao();
            nova.setNome(restricao.getNome());
            nova.setDescricao(restricao.getDescricao());
            Restricao salva = restricaoService.cadastrar(nova);
            novasRestricoes.add(salva);
        }

        usuarioExistente.setRestricoes(novasRestricoes);
        Usuario salvo = usuarioRepository.save(usuarioExistente);

        return salvo;
    }

    public Usuario atualizarSenha(Long id, String senhaAtual, String novaSenha) {
        Usuario usuarioExistente = buscarPorId(id);

        if (!usuarioExistente.getSenha().equals(senhaAtual)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Senha atual incorreta.");
        }

        usuarioExistente.setSenha(novaSenha);
        Usuario salvo = usuarioRepository.save(usuarioExistente);
        return salvo;
    }


    public void deletar(Long id){
        buscarPorId(id); // busca por id, quando não encontrar ele vai lançar exception e não vai continuar o próximo passo
        usuarioRepository.deleteById(id); // deleta o usuario pelo id informado
    }

    public Usuario login(String email, String senha) {
        if (!usuarioRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Usuário com email %s não encontrado", email));
        }
        Usuario usuarioEncontrado = usuarioRepository.findByEmailAndSenha(email, senha);
        if (usuarioEncontrado == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha estão incorretos");
        }
        return usuarioEncontrado;
    }
}