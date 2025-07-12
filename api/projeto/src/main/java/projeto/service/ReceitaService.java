package projeto.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import projeto.dto.ReceitaDto;
import projeto.dto.UsuarioSimplesDto;
import projeto.mapper.ReceitaMapper;
import projeto.model.Receita;
import projeto.model.Restricao;
import projeto.model.Tipo;
import projeto.model.Usuario;
import projeto.repository.ReceitaRepository;

import java.util.List;

@Slf4j
@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private TipoService tipoService;

    @Autowired
    private RestricaoService restricaoService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private UsuarioService usuarioService;

    public ReceitaDto cadastrar(Receita receita, String token){
        Long idUsuarioLogado = sessionService.getUsuarioLogado(token).getId();
        Usuario usuarioLogado = usuarioService.buscarPorId(idUsuarioLogado);

        receita.setUsuarioCriador(usuarioLogado);

        for(Tipo ingrediente : receita.getIngredientes()){
            tipoService.cadastrar(ingrediente);
        }

        for(Restricao restricao : receita.getRestricoes()){
            restricaoService.cadastrar(restricao);
        }

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

    public ReceitaDto atualizar(Long id, Receita receitaAtualizada, String token) {
        Long idUsuarioLogado = sessionService.getUsuarioLogado(token).getId();
        Usuario usuarioLogado = usuarioService.buscarPorId(idUsuarioLogado);

        Receita receitaExistente = buscarPorId(id);

        receitaExistente.setTitulo(receitaAtualizada.getTitulo());
        receitaExistente.setDescricao(receitaAtualizada.getDescricao());
        receitaExistente.setTempoPreparo(receitaAtualizada.getTempoPreparo());
        receitaExistente.setModoPreparo(receitaAtualizada.getModoPreparo());

        receitaExistente.setUsuarioCriador(usuarioLogado);

        receitaExistente.getIngredientes().clear();
        for (Tipo ingrediente : receitaAtualizada.getIngredientes()) {
            Tipo tipoSalvo = tipoService.cadastrar(ingrediente);
            receitaExistente.getIngredientes().add(tipoSalvo);
        }

        receitaExistente.getRestricoes().clear();
        for (Restricao restricao : receitaAtualizada.getRestricoes()) {
            Restricao restricaoSalva = restricaoService.cadastrar(restricao);
            receitaExistente.getRestricoes().add(restricaoSalva);
        }

        receitaRepository.save(receitaExistente);
        return ReceitaMapper.toReceitaDto(receitaExistente);
    }

    public void deletar(Long id){
        buscarPorId(id);
        receitaRepository.deleteById(id);
    }

    public void favoritar(Long id, String token){
        Long idUsuarioLogado = sessionService.getUsuarioLogado(token).getId();
        Usuario usuarioLogado = usuarioService.buscarPorId(idUsuarioLogado);

        Receita receita = buscarPorId(id);

        List<Receita> receitas = usuarioLogado.getReceitasFavoritadas();

        if (receitas.stream().anyMatch(item -> item.getId().equals(receita.getId()))) {
            return;
        }

        receitas.add(receita);
        usuarioLogado.setReceitasFavoritadas(receitas);
        usuarioService.atualizar(idUsuarioLogado, usuarioLogado);
    }
}