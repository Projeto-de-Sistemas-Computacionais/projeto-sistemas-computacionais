package projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rua;

    private String numero;

    private String bairro;

    private String cidade;

    private String estado;

    private String cep;

    private String complemento;

    private Double latitude;

    private Double longitude;

    @OneToOne(mappedBy = "endereco", optional=true)
    private Restaurante restaurante;

    @OneToOne(mappedBy = "endereco", optional=true)
    private Usuario usuario;

    public Restaurante getRestaurante() {
        return restaurante;
    }

    public void setRestaurante(Restaurante restaurante) {
        this.restaurante = restaurante;
    }

    public void addRestaurante(Restaurante restaurante) {
        if(getRestaurante() != null) {
        this.getRestaurante().setEndereco(null);
        }
        this.setRestaurante(restaurante);
        restaurante.setEndereco(this);
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void addUsuario(Usuario usuario) {
        if(getUsuario() != null) {
        this.getUsuario().setEndereco(null);
        }
        this.setUsuario(usuario);
        usuario.setEndereco(this);
    }

    public void removeUsuario() {
        if(getUsuario() != null) {
        this.getUsuario().setEndereco(null);
        }
        this.setUsuario(null);
    }
}
