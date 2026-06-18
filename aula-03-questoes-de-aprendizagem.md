---
tipo: "checkpoint-pratico"
modulo: "Docker, Docker Compose e Registry"
aula_referencia: "Aula 03: Gerenciamento e CI/CD — Registry, Swarm e GitHub Actions"
tags: [docker, registry, docker-hub, swarm, cicd, github-actions, pipeline, deploy, checkpoint]
data: 2026-06-17
---

# Curso: Docker, Docker Compose e Registry — Aula 03 (Questões)

## Questões de Aprendizagem — Checkpoint Prático

Estas questões são seu checkpoint de aprendizagem. Complete cada uma por conta própria, sem reler a aula a cada passo. Se você consegue executar todas as questões sem consultar o material, você domina os conceitos da Aula 03.

---

## Como Usar Este Arquivo

Este é o **checkpoint de aprendizagem** da Aula 03 — a última do módulo. A pergunta central: *"eu realmente entendi a matéria?"*

- Faça as questões na ordem (1 a 7). Cada uma tem **Conceito-chave → Objetivo → Passos → Entrega**.
- Crie uma pasta `entregas-aula-03/` para salvar suas respostas.
- Tente resolver sem consultar a aula. Se travar, cada questão indica a seção exata onde o conceito foi ensinado (no campo **Conceito-chave**).
- Esta é a última aula do módulo — ao completar este checkpoint, você domina o pipeline Docker completo, do container ao CI/CD.

---

## Questão 1: Push/Pull no Registry Local

**Conceito-chave:** Registry Local (Aula 03, Seção 4).

**Objetivo:** Subir um registry local e executar o fluxo básico de push/pull com versionamento SemVer.

**Passos de Execução:**

1. Adicione o serviço `registry:2` ao `docker-compose.yml`, exposto na porta `5000:5000`
2. Suba o registry: `docker compose up -d registry`
3. Construa a imagem da API com tag SemVer: `docker build -t app:1.0.0 .`
4. Tagueie para o registry local: `docker tag app:1.0.0 localhost:5000/app:1.0.0`
5. Publique: `docker push localhost:5000/app:1.0.0`
6. Remova a imagem local e puxe do registry: `docker rmi localhost:5000/app:1.0.0 app:1.0.0` e `docker pull localhost:5000/app:1.0.0`

**Entrega:** crie `entregas-aula-03/01-registry-local.md`:

```markdown
# Entrega: Questão 1 — Registry Local

## 1. Output do `docker push`
(cole o output completo)

## 2. Observação
Quais camadas mostraram "Layer already exists" e quais "Pushed"? Por que?

## 3. Verificação
Output de `docker compose ps` mostrando o registry como "Up"
```

---

## Questão 2: Publicando no Docker Hub

**Conceito-chave:** Docker Hub (Aula 03, Seção 5).

**Objetivo:** Publicar a imagem da API no Docker Hub e verificar que está acessível de qualquer máquina.

**Passos de Execução:**

1. Faça `docker login` com seu Docker ID
2. Tagueie a imagem para seu namespace: `docker tag app:1.0.0 SEU_USUARIO/app:1.0.0`
3. Publique: `docker push SEU_USUARIO/app:1.0.0`
4. Acesse `https://hub.docker.com/repositories` e confirme que a imagem está lá
5. Remova a imagem local: `docker rmi SEU_USUARIO/app:1.0.0`
6. Baixe de uma "máquina limpa": `docker pull SEU_USUARIO/app:1.0.0`

**Entrega:** crie `entregas-aula-03/02-docker-hub.md`:

```markdown
# Entrega: Questão 2 — Docker Hub

## 1. Publicação
Output do `docker push SEU_USUARIO/app:1.0.0`

## 2. Pull simulando outra máquina
Output do `docker pull SEU_USUARIO/app:1.0.0`

## 3. Decomposição
Decomponha `SEU_USUARIO/app:1.0.0` nos 4 componentes da nomenclatura canônica (registry, namespace, repo, tag)
```

---

## Questão 3: Inicializando o Swarm e Criando um Serviço

**Conceito-chave:** Docker Swarm (Aula 03, Seção 6).

**Objetivo:** Inicializar um cluster Swarm e criar um serviço com a imagem do Docker Hub.

**Passos de Execução:**

1. Inicialize o Swarm: `docker swarm init`
2. Verifique os nós: `docker node ls`
3. Crie um serviço com a imagem do Docker Hub:
   ```bash
   docker service create --name app-api --publish 3000:3000 SEU_USUARIO/app:1.0.0
   ```
4. Liste os serviços: `docker service ls`
5. Veja os detalhes: `docker service ps app-api`
6. Teste: `curl http://localhost:3000`

**Entrega:** crie `entregas-aula-03/03-swarm-servico.md`:

```markdown
# Entrega: Questão 3 — Swarm e Serviço

## 1. Output de `docker node ls`
(cole o output mostrando o nó manager)

## 2. Output de `docker service ps app-api`
(cole o output mostrando o container rodando)

## 3. Teste
Resposta do `curl http://localhost:3000`
```

---

## Questão 4: Escalando e Rolling Update

**Conceito-chave:** Swarm — Escala e Rolling Update (Aula 03, Seção 6).

**Objetivo:** Escalar o serviço horizontalmente e executar um rolling update sem downtime.

**Passos de Execução:**

1. Escale o serviço para 3 réplicas: `docker service scale app-api=3`
2. Verifique as réplicas: `docker service ps app-api`
3. Publique a versão `1.0.1` no Docker Hub:
   - Altere o código (adicione uma rota)
   - `docker build -t app:1.0.1 .`
   - `docker tag app:1.0.1 SEU_USUARIO/app:1.0.1`
   - `docker push SEU_USUARIO/app:1.0.1`
4. Execute rolling update: `docker service update --image SEU_USUARIO/app:1.0.1 app-api`
5. Verifique o progresso do update: `docker service ps app-api`
6. Enquanto o update roda, teste se o serviço responde: `curl http://localhost:3000`

**Entrega:** crie `entregas-aula-03/04-escala-rolling.md`:

```markdown
# Entrega: Questão 4 — Escala e Rolling Update

## 1. Escala para 3 réplicas
Output de `docker service ps app-api` mostrando 3 réplicas

## 2. Rolling update
Output de `docker service ps app-api` durante o update (mostrando réplicas sendo substituídas)

## 3. Disponibilidade
O serviço ficou indisponível em algum momento durante o update?

## 4. Explicação
Explique como o Swarm mantém o serviço disponível durante o rolling update
```

---

## Questão 5: Workflow GitHub Actions

**Conceito-chave:** CI/CD com GitHub Actions (Aula 03, Seção 7).

**Objetivo:** Criar um workflow do GitHub Actions que constrói e publica a imagem automaticamente.

**Passos de Execução:**

1. Crie o repositório GitHub com seu projeto (ou use um existente)
2. Crie `.github/workflows/deploy.yml` com:
   - Trigger: `push` na branch `main`
   - Job: checkout, login Docker Hub, build e push com tag `${{ github.sha }}` e `latest`
3. Configure secrets no repositório: `DOCKER_USERNAME` e `DOCKER_PASSWORD`
4. Faça commit e push do workflow
5. Acompanhe a execução na aba Actions do GitHub

**Entrega:** crie `entregas-aula-03/05-workflow-actions.md`:

```markdown
# Entrega: Questão 5 — GitHub Actions

## 1. Conteúdo do workflow
(cole o YAML completo do `.github/workflows/deploy.yml`)

## 2. Print da execução
(descreva o resultado da execução na aba Actions — sucesso ou falha?)

## 3. Tags publicadas
Liste as tags que foram criadas no Docker Hub após o workflow executar
```

---

## Questão 6: Compreendendo Nomenclatura e Tags

**Conceito-chave:** Nomenclatura Canônica e Tags (Aula 03, Seções 5 e 8).

**Objetivo:** Demonstrar compreensão da nomenclatura canônica e da diferença entre tag e digest.

**Passos de Execução:**

1. Execute `docker pull node:22-alpine` e `docker pull docker.io/library/node:22-alpine`
2. Verifique que ambas têm o mesmo IMAGE ID: `docker images node --format "{{.Repository}}:{{.Tag}} -> {{.ID}}"`
3. Extraia o digest da sua imagem: `docker inspect SEU_USUARIO/app:1.0.0 | grep RepoDigests`
4. Para cada referência abaixo, decomponha em registry, namespace, repositório e tag:
   - `localhost:5000/app:1.0.0`
   - `SEU_USUARIO/app:latest`
   - `bitnami/postgresql:16`
   - `ghcr.io/meuuser/api:1.0.0`

**Entrega:** crie `entregas-aula-03/06-nomenclatura-tags.md`:

```markdown
# Entrega: Questão 6 — Nomenclatura e Tags

## 1. Verificação de IMAGE ID
Output do `docker images node --format "{{.Repository}}:{{.Tag}} -> {{.ID}}"`

## 2. Digest extraído
Digest SHA-256 da sua imagem: `sha256:________________`

## 3. Tabela de decomposição
| Referência | Registry | Namespace | Repositório | Tag |
|---|---|---|---|---|
| `localhost:5000/app:1.0.0` | | | | |
| `SEU_USUARIO/app:latest` | | | | |
| `bitnami/postgresql:16` | | | | |
| `ghcr.io/meuuser/api:1.0.0` | | | | |
```

---

## Questão 7: Pipeline Completo — Do Commit ao Deploy

**Conceito-chave:** Pipeline Completo (Aula 03, Seção 8).

**Objetivo:** Executar o pipeline completo do início ao fim: alterar código → commit → CI build → Docker Hub → Swarm.

**Passos de Execução:**

1. Altere o código da API (adicione uma rota ou campo na resposta)
2. Commit e push para a branch `main` do repositório
3. Acompanhe o workflow no GitHub Actions até o fim
4. Verifique a nova imagem no Docker Hub
5. Atualize o serviço Swarm:
   ```bash
   docker service update --image SEU_USUARIO/app:latest app-api
   ```
6. Teste: `curl http://localhost:3000`

**Entrega:** crie `entregas-aula-03/07-pipeline-completo.md`:

```markdown
# Entrega: Questão 7 — Pipeline Completo

## 1. Pipeline documentado
Documente cada etapa com comando e output:

| # | Etapa | Comando/Evento | Resultado |
|---|---|---|---|
| 1 | Alteração de código | `git add . && git commit` | |
| 2 | Push | `git push origin main` | |
| 3 | CI Build | Workflow Actions | |
| 4 | Push Docker Hub | Workflow Actions | |
| 5 | Update Swarm | `docker service update` | |
| 6 | Teste | `curl localhost:3000` | |

## 2. Resposta da API
(cole a resposta do curl mostrando a alteração que você fez)

## 3. Reflexão
Qual a vantagem de ter o pipeline automatizado comparado a fazer manualmente `build → tag → push → SSH → pull → run`?
```

---

## Checklist Final: Pronto para o Próximo Módulo?

Marque cada item só quando conseguir fazê-lo **sem consultar a aula**:

- [ ] Subir um registry local com `registry:2` e executar push/pull
- [ ] Publicar uma imagem no Docker Hub com tag SemVer
- [ ] Inicializar um cluster Swarm e criar um serviço
- [ ] Escalar um serviço para múltiplas réplicas
- [ ] Executar um rolling update sem downtime
- [ ] Criar um workflow do GitHub Actions com build e push
- [ ] Configurar secrets no GitHub
- [ ] Executar o pipeline completo: commit → build → push → deploy
- [ ] Decompor uma referência de imagem nos 4 componentes canônicos
- [ ] Explicar a diferença entre `docker compose up` e `docker stack deploy`

> *Acertou todos? Você concluiu o módulo Docker! Seu pipeline de containerização está completo: do container local ao CI/CD automatizado com Swarm. Travou em algum? Releia a seção indicada na questão correspondente antes de avançar.*
