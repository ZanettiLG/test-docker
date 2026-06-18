# Entrega: Questão 6 — Nomenclatura e Tags

## 1. Verificação de IMAGE ID

Output do `docker images node --format "{{.Repository}}:{{.Tag}} -> {{.ID}}"`:

```
node:22-alpine -> e58326d0d441
```

Apenas uma entrada aparece porque Docker deduplica imagens com mesmo ID. Tanto `node:22-alpine` quanto `docker.io/library/node:22-alpine` referenciam o mesmo IMAGE ID `e58326d0d441`, confirmando que são a mesma imagem.

## 2. Digest extraído

Digest SHA-256 da imagem `luisgzanetti/app:1.0.0`:

```
sha256:d97dd6b911430796e23a2f548a803116a762ef8e4988472c9662144916f1da32
```

Output completo do inspect:

```json
[
  "app@sha256:d97dd6b911430796e23a2f548a803116a762ef8e4988472c9662144916f1da32",
  "luisgzanetti/app@sha256:d97dd6b911430796e23a2f548a803116a762ef8e4988472c9662144916f1da32",
  "localhost:5000/app@sha256:d97dd6b911430796e23a2f548a803116a762ef8e4988472c9662144916f1da32"
]
```

O mesmo digest aparece nos 3 registries (local + Docker Hub), provando que é a mesma imagem publicada em locais diferentes.

## 3. Tabela de decomposição

| Referência | Registry | Namespace | Repositório | Tag |
|---|---|---|---|---|
| `localhost:5000/app:1.0.0` | `localhost:5000` | _(vazio)_ | `app` | `1.0.0` |
| `luisgzanetti/app:latest` | `docker.io` (implícito) | `luisgzanetti` | `app` | `latest` |
| `bitnami/postgresql:16` | `docker.io` (implícito) | `bitnami` | `postgresql` | `16` |
| `ghcr.io/meuuser/api:1.0.0` | `ghcr.io` | `meuuser` | `api` | `1.0.0` |
