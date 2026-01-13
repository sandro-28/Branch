# 8. Security and Performance

### 8.1 Security
- **Isolation:** Each project runs in its own set of Docker containers on a dedicated internal network.
- **SSL:** Automatic via Let's Encrypt (Traefik).
- **Admin API:** Protected by a high-entropy `SERVICE_ROLE_KEY`.
- **Database Access:** Direct DB port (5432) is **NOT** exposed to the internet. Access is only via PostgREST (HTTP) or the Admin API (HTTP).

### 8.2 Performance
- **Connection Pooling:** PgBouncer is mandatory to support serverless/AI workloads.
- **Resource Limits:** Docker containers will have CPU/RAM limits configured to prevent "noisy neighbor" issues.
