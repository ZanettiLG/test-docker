# Questão 1 — Distribuição de Artefatos

## Métodos improvisados e fragilidades

| Método | Fragilidade principal | Como o registry resolve |
|---|---|---|
| **Zip/tar da imagem** (`docker save` + envio do arquivo) | Arquivo binário gigante (centenas de MB); cada atualização exige reenvio completo; fácil de perder a versão correta | O registry armazena apenas as camadas (layers) e transfere só o delta entre versões; sempre disponível via rede |
| **Git clone + rebuild** (`git clone` + `docker build`) | Exige que o colega tenha todo o toolchain instalado (Node.js, npm, etc.); sem garantia de reprodutibilidade (versões de dependências podem mudar) | A imagem já está buildada e pronta para rodar — basta `docker run`; não requer toolchain de build |
| **README com instruções manuais** | Depende de intervenção humana seguir passos corretamente; frágil, propenso a erros e sem automação | O registry é a fonte única da verdade; comandos `push`/`pull` são padronizados e automatizáveis |

## Exemplo concreto

**Sem registry:** O colega precisaria:
1. Clonar meu repositório Git (`git clone ...`)
2. Instalar Node.js e npm na máquina dele
3. Rodar `npm install` (que pode baixar versões diferentes de dependências)
4. Rodar `docker build -t app:1.0.0 .`
5. Rodar `docker compose up`

**Com registry:** Um único comando:
```bash
docker compose pull && docker compose up
```
Ou, se preferir executar direto:
```bash
docker run -p 3000:3000 localhost:5000/app:1.0.0
```
