# Questão 8 — Estratégia de Versionamento com CI/CD

## Tabela de estratégia

| Ambiente | Tag recomendada | Risco de usar :latest | Como promove |
|---|---|---|---|
| Desenvolvimento local | `:dev` ou `docker compose up --build` | Baixo — ambiente individual, falhas afetam só o dev | Build local direto, sem push |
| Staging (compartilhado) | `:staging` ou tag SemVer como `:1.4.0-rc1` | **Alto** — `:latest` é ambíguo: ninguém sabe qual commit está rodando; dois devs podem ver comportamentos diferentes | Push na branch `develop` dispara workflow que publica `:staging` |
| Produção | SemVer exato: `:2.0.0` + digest SHA256 | **Crítico** — `:latest` em produção é um desastre: qualquer push pode quebrar o sistema sem aviso; impossível fazer rollback deterministico | Apenas quando PR para `main` é aprovada e mergeada; publica tag SemVer |

## O papel do CI/CD na promoção

### 1. Publicar `:staging` a cada push na branch `develop`

```yaml
name: Staging Pipeline
on:
  push:
    branches: [develop]
jobs:
  staging:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - run: docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/app:staging .
      - run: docker push ${{ secrets.DOCKERHUB_USERNAME }}/app:staging
```

### 2. Publicar `:production` apenas quando a PR para `main` é aprovada

```yaml
name: Production Pipeline
on:
  pull_request:
    branches: [main]
    types: [closed]  # só dispara quando a PR é mergeada (fechada com merge)
jobs:
  production:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Build e push com tag SemVer
        run: |
          VERSION=$(node -e "console.log(require('./package.json').version)")
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/app:$VERSION .
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/app:production .
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/app:$VERSION
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/app:production
```

## Reflexão final

Por que ambientes compartilhados (staging, produção) nunca devem usar `:latest`?

`:latest` é uma **tag móvel**: ela aponta para a última imagem buildada, independentemente de versão. Isso cria três problemas fatais em ambientes compartilhados:

1. **Imprevisibilidade**: Dois deploys com `:latest` podem rodar imagens diferentes — um deploy puxa a imagem antes de outro push, outro puxa depois. O comportamento vira uma caixa-preta.

2. **Rollback impossível**: Se `:latest` quebrou, você não sabe para qual versão voltar. Com SemVer, basta `docker pull app:1.4.0` e pronto.

3. **Debug impossível**: Quando algo quebra, a pergunta "qual versão está rodando?" não tem resposta com `:latest`. Com `app:2.0.0@sha256:abc123...` você sabe exatamente o que está em produção.

**Regra de ouro**: `:latest` só serve para desenvolvimento local. Staging usa `:staging` (tag fixa de ambiente). Produção usa SemVer + digest SHA256, imutável e rastreável.
