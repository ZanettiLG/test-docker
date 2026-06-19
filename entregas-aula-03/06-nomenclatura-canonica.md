# Questão 6 — Nomenclatura Canônica

## Verificação de IMAGE ID
```
node:22-alpine -> ab07539e0988
```
Ambas as formas (`node:22-alpine` e `docker.io/library/node:22-alpine`) apontam para o mesmo digest: `sha256:ab07539e0988...`

## Tabela de decomposição

| Referência | Registry | Namespace | Repositório | Tag |
|---|---|---|---|---|
| `localhost:5000/app:1.0.0` | `localhost:5000` | (vazio — root local) | `app` | `1.0.0` |
| `luisgzanetti/app:latest` | `docker.io` (implícito) | `luisgzanetti` | `app` | `latest` |
| `bitnami/postgresql:16` | `docker.io` (implícito) | `bitnami` | `postgresql` | `16` |
| `ghcr.io/meuuser/api:v2.0.0` | `ghcr.io` | `meuuser` | `api` | `v2.0.0` |

## Reflexão

Por que o formato `registry/namespace/repo:tag` é considerado universal?

Porque todos os registries de contêineres (e a maioria dos registries de pacotes) seguem a mesma estrutura hierárquica:

- **Registry**: onde o artefato está hospedado (Docker Hub, GHCR, Quay, ECR, ACR, etc.)
- **Namespace**: quem é o dono (usuário, organização, projeto)
- **Repositório**: qual artefato (nome da imagem/pacote)
- **Tag**: qual versão (SemVer, `latest`, digest)

Exemplos:
- `npm` → `registry.npmjs.org/@scope/package:1.0.0` — mesmo padrão lógico
- `PyPI` → `pypi.org/project/requests/2.31.0` — similar, com `/project/`
- `Maven` → `maven.org/group/artifact:3.2.1` — mesmo conceito

A universalidade do formato permite que ferramentas como Docker, Podman, Kaniko e outras falem com qualquer registry sem mudar a sintaxe.
