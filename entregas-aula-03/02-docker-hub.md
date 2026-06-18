# Entrega: Questão 2 — Docker Hub

## 1. Publicação

Output do `docker push luisgzanetti/app:1.0.0`

```
The push refers to repository [docker.io/luisgzanetti/app]
2b03375268c3: Pushed
80c2a27e29ff: Pushed
1448179f7e9e: Pushed
3d95dfc8f636: Pushed
34aa571c2bf2: Pushed
a2a508442c34: Pushed
9f202118d960: Pushed
55afa1ecc21d: Pushed
6f79f5d7e8a5: Pushed
1.0.0: digest: sha256:d97dd6b911430796e23a2f548a803116a762ef8e4988472c9662144916f1da32 size: 856
```

## 2. Pull simulando outra máquina

Output do `docker pull luisgzanetti/app:1.0.0`

```
1.0.0: Pulling from luisgzanetti/app
Digest: sha256:d97dd6b911430796e23a2f548a803116a762ef8e4988472c9662144916f1da32
Status: Downloaded newer image for luisgzanetti/app:1.0.0
docker.io/luisgzanetti/app:1.0.0
```

## 3. Decomposição

Decomposição de `luisgzanetti/app:1.0.0` nos 4 componentes da nomenclatura canônica:

| Componente | Valor |
|---|---|
| Registry | `docker.io` (implícito — registry padrão do Docker Hub) |
| Namespace | `luisgzanetti` |
| Repositório | `app` |
| Tag | `1.0.0` |
