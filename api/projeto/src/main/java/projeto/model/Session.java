package projeto.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "sessions")
@Data
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String token;

    @Column(name = "created_at", nullable = false)
    private Timestamp createdAt;

    @Column(name = "expires_at", nullable = false)
    private Timestamp expiresAt;

    public Session() {}

    public Session(Long userId) {
        this.userId = userId;
        this.token = generateToken();
        this.createdAt = new Timestamp(System.currentTimeMillis());
        this.expiresAt = calculateExpiryDate(24); // Expira em 24 horas
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    private Timestamp calculateExpiryDate(int hours) {
        long now = System.currentTimeMillis();
        return new Timestamp(now + (hours * 60 * 60 * 1000));
    }

    public boolean isExpired() {
        return new Timestamp(System.currentTimeMillis()).after(expiresAt);
    }

    public Usuario getUser() {
        Usuario user = new Usuario();
        user.setId(userId);
        return user;
    }
}
