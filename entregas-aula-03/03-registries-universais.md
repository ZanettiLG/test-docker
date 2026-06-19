# Questão 3 — Registries como Catálogo Universal

## Tabela comparativa

| Registry | Ecossistema | Artefato | Comando push | Comando pull |
|---|---|---|---|---|
| npmjs.com | Node.js / JavaScript | Pacotes npm (`.tgz`) | `npm publish` | `npm install` |
| PyPI | Python | Pacotes Python (`.whl`, `.tar.gz`) | `twine upload` ou `poetry publish` | `pip install` |
| Docker Hub | Containers (multi-linguagem) | Imagens Docker (camadas OCI) | `docker push` | `docker pull` |

## Característica comum

Todo registry compartilha estas características arquiteturais:

1. **Armazenamento imutável**: uma vez publicado, um artefato (com uma tag/versão específica) nunca é alterado — isso garante reprodutibilidade
2. **Operações padronizadas**: todos têm comandos de **push** (publicar) e **pull** (baixar), formando o ciclo básico de distribuição
3. **Catálogo centralizado**: servem como fonte única da verdade — em vez de cada desenvolvedor manter cópias locais, todos consultam o registry
4. **Versionamento**: todos suportam versionamento dos artefatos (SemVer ou equivalente), permitindo pinning de versões específicas
5. **API HTTP**: internamente, todos expõem uma API REST sobre HTTP/HTTPS para as operações de push/pull/search
