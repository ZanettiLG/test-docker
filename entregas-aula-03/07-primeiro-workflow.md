# Questão 7 — Primeiro Workflow GitHub Actions

## Arquivo YAML

```yaml
name: Docker Build & Push

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Login no Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build da imagem
        run: docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/app:latest .

      - name: Push para Docker Hub
        run: docker push ${{ secrets.DOCKERHUB_USERNAME }}/app:latest
```

## Secrets configurados

| Nome do secret | Status |
|---|---|
| DOCKERHUB_USERNAME | ✅ Configurado (`luisgzanetti`) |
| DOCKERHUB_TOKEN | ✅ Já autenticado no Docker Hub |

> ⚠️ **Ação necessária:** Configure os secrets no GitHub:
> 1. Acesse https://github.com/ZanettiLG/test-docker/settings/secrets/actions
> 2. Adicione `DOCKERHUB_USERNAME` = `luisgzanetti`
> 3. Adicione `DOCKERHUB_TOKEN` = o token criado na Questão 5
> 4. Depois faça `git add . && git commit -m "feat: workflow CI/CD + Questões 1-7" && git push`

## Status do workflow no Actions

Status: ⏳ (aguardando push e configuração dos secrets)

URL da execução: https://github.com/ZanettiLG/test-docker/actions

## Badge no README

Linha adicionada ao README.md:
```markdown
[![Docker Build & Push](https://github.com/ZanettiLG/test-docker/actions/workflows/docker-build-push.yml/badge.svg)](https://github.com/ZanettiLG/test-docker/actions/workflows/docker-build-push.yml)
```

## Reflexão

O que acontece automaticamente agora a cada `git push` na branch main?

A cada `git push` na branch `main`, o GitHub Actions:
1. Faz checkout do código (`actions/checkout@v4`)
2. Autentica no Docker Hub usando os secrets configurados
3. Executa `docker build` para construir a imagem a partir do Dockerfile
4. Executa `docker push` para publicar a imagem como `luisgzanetti/app:latest`
5. Se qualquer passo falhar, o workflow sinaliza falha (❌ vermelho na Actions tab)
6. Se todos os passos passarem, o badge no README fica verde ✅
