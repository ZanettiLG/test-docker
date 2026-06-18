# Entrega: Questão 1 — Registry Local

## 1. Output do `docker push`

```
The push refers to repository [localhost:5000/app]
9f202118d960: Pushed
3d95dfc8f636: Pushed
a2a508442c34: Pushed
34aa571c2bf2: Pushed
1448179f7e9e: Pushed
2b03375268c3: Pushed
80c2a27e29ff: Pushed
55afa1ecc21d: Pushed
6f79f5d7e8a5: Pushed
1.0.0: digest: sha256:d97dd6b911430796e23a2f548a803116a762ef8e4988472c9662144916f1da32 size: 856
```

## 2. Observação

Todas as camadas mostraram **"Pushed"** — nenhuma "Layer already exists". Isso ocorre porque o registry local estava vazio (primeira publicação). O registry não tinha nenhuma camada em cache, então todas precisaram ser enviadas. Se eu fizesse um segundo push da mesma imagem (ou de uma imagem que compartilha camadas, como `app:1.0.1`), as camadas herdadas da imagem base (`node:22-alpine`) mostrariam "Layer already exists".

No `docker pull`, as camadas mostraram "Already exists" porque elas já estavam no cache local do Docker da máquina (sobraram do push anterior).

## 3. Verificação

```
NAME                     IMAGE        COMMAND                  SERVICE    CREATED          STATUS          PORTS
test-docker-registry-1   registry:2   "/entrypoint.sh /etc…"   registry   35 seconds ago   Up 34 seconds   0.0.0.0:5000->5000/tcp, [::]:5000->5000/tcp
```
