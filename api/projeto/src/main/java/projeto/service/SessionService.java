package projeto.service;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import projeto.model.Session;
import projeto.model.Usuario;
import projeto.repository.SessionRepository;

@Service
@AllArgsConstructor
public class SessionService {

    private SessionRepository sessionRepository;

    private UsuarioService usuarioService;

    public void createSession(Session session) {
        sessionRepository.save(session);
    }

    public Session getSessionByToken(String token) {
        Session session = sessionRepository.findByToken(token);
        if (session == null)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não está logado.");

        return sessionRepository.findByToken(token);
    }

    public Usuario getUsuarioLogado(String token){
        Session session = getSessionByToken(token);

        return usuarioService.buscarPorId(session.getId());
    }

    @Transactional
    public void invalidateSession(String token) {
        if (sessionRepository.findByToken(token) == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário não está logado.");
        }
        sessionRepository.deleteByToken(token);
    }

    public Session findByUserId(Long userId){
        return sessionRepository.findByUserId(userId);
    }
}
