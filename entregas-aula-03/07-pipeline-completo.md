# Entrega: Questão 7 — Pipeline Completo

## 1. Pipeline documentado

| # | Etapa | Comando/Evento | Resultado |
|---|---|---|---|
| 1 | Alteração de código | Editar `index.js`: nova rota `/info` + versão `1.0.2` | Código atualizado |
| 2 | Build | `docker build -t app:1.0.2 .` | Imagem construída (cache nas layers base) |
| 3 | Tag e push Docker Hub | `docker tag app:1.0.2 luisgzanetti/app:1.0.2 && docker push` | `luisgzanetti/app:1.0.2` publicado |
| 4 | Tag latest | `docker tag app:1.0.2 luisgzanetti/app:latest && docker push` | `luisgzanetti/app:latest` atualizado |
| 5 | Update Swarm | `docker service update --image luisgzanetti/app:latest app-api` | 3 réplicas atualizadas via rolling update |
| 6 | Teste | `curl localhost:3000` | `{"message":"Hello from Docker!","version":"1.0.2"}` |
| 7 | Teste nova rota | `curl localhost:3000/info` | `{"name":"app-api","version":"1.0.2","node":"v22.22.3","platform":"linux","memory":7136824}` |

## 2. Resposta da API

**GET /**

```json
{"message":"Hello from Docker!","version":"1.0.2"}
```

**GET /info** (nova rota adicionada)

```json
{"name":"app-api","version":"1.0.2","node":"v22.22.3","platform":"linux","memory":7136824}
```

**GET /health**

```json
{"status":"healthy","uptime":38.254721469}
```

## 3. Reflexão

A principal vantagem do pipeline automatizado é **eliminar erro humano e reduzir o tempo de entrega**. Comparando:

| Etapa | Manual | Automatizado (CI/CD) |
|---|---|---|
| Build | `docker build` manual, risco de esquecer flag | Actions executa em ambiente limpo e padronizado |
| Tag | Risco de errar versão, esquecer tag `latest` | SHA do commit como tag imutável + `latest` automático |
| Push | `docker push` manual, pode esquecer | Actions faz push automaticamente após build |
| Deploy | SSH na VM, `docker pull && docker run`, risco de downtime | Swarm rolling update: sem downtime, rollback automático se falhar |
| Rastreabilidade | "Qual versão está rodando?" — difícil saber | Cada deploy é vinculado ao commit SHA, visível no Docker Hub |

**Benefícios concretos:**
- **Reprodutibilidade:** Todo build acontece nas mesmas condições (ubuntu-latest)
- **Velocidade:** Do `git push` ao deploy em segundos, sem intervenção humana
- **Segurança:** Secrets (DOCKER_USERNAME, DOCKER_PASSWORD) nunca expostos no código
- **Rollback:** Se algo quebrar, `docker service update --image luisgzanetti/app:1.0.1 app-api` reverte em segundos
- **Auditoria:** Cada deploy é registrado no GitHub Actions com logs completos
