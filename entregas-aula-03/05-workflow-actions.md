# Entrega: Questão 5 — GitHub Actions

## 1. Conteúdo do workflow

```yaml
name: Deploy to Docker Hub

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ secrets.DOCKER_USERNAME }}/app:${{ github.sha }}
            ${{ secrets.DOCKER_USERNAME }}/app:latest
```

## 2. Print da execução

Para completar esta etapa, siga os passos:

1. Crie um repositório no GitHub (ex: `test-docker`)
2. Configure os secrets no repositório:
   - **Settings → Secrets and variables → Actions → New repository secret**
   - `DOCKER_USERNAME` = `luisgzanetti`
   - `DOCKER_PASSWORD` = (seu token/senha do Docker Hub)
3. Execute:
   ```bash
   git add .
   git commit -m "feat: API Express + Docker + GitHub Actions workflow"
   git branch -M main
   git remote add origin https://github.com/luisgzanetti/test-docker.git
   git push -u origin main
   ```
4. Acesse a aba **Actions** do repositório para acompanhar a execução

**Resultado esperado:** O workflow deve executar com sucesso (✅ verde), realizando checkout, login no Docker Hub, build da imagem e push com duas tags (`sha` e `latest`).

## 3. Tags publicadas

Após a execução bem-sucedida do workflow, as seguintes tags aparecerão no Docker Hub:

| Tag | Descrição |
|---|---|
| `luisgzanetti/app:latest` | Aponta para o último commit na main |
| `luisgzanetti/app:<sha>` | Tag imutável com o SHA do commit (ex: `a1b2c3d`) |
