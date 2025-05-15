package projeto.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Data
@Entity
public class Restaurante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

     private List<Imagem> imagens;       //erro - esperando classe imagem
     private List<Restricao> restricoes;  //erro - esperando classe resrticoes
}
