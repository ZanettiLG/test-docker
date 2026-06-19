# Questão 5 — Push para o Docker Hub

## Informações da conta

Docker Hub username: **luisgzanetti**
Nome do token criado: **aula03-checkpoint**

## Output do docker login
```
Login Succeeded
```
(Confirmado via `docker system info` → Username: luisgzanetti)

## Output do docker push
```
The push refers to repository [docker.io/luisgzanetti/app]
1ab5d8a304ff: Pushed 
8a8ab62cbcaf: Pushed 
3c142f572651: Pushed 
370bcbe9d42a: Pushed 
b3533523b198: Pushed 
875728841659: Pushed 
e6e6f308e46a: Pushed 
55afa1ecc21d: Layer already exists 
a0bd913d436d: Pushed 
1.0.0: digest: sha256:fbc46bf431bb73d420dded7c6676068a0964e3b37bdc1c50755406f489de603b size: 856
```

## Verificação no navegador
URL da imagem no Docker Hub: https://hub.docker.com/r/luisgzanetti/app

## Reflexão

Qual a diferença entre publicar em `localhost:5000/app:1.0.0` e `luisgzanetti/app:1.0.0`? Quem pode baixar cada uma?

- **`localhost:5000/app:1.0.0`**: Publicada em um registry local, rodando na minha própria máquina. Só eu consigo acessar (ninguém fora do meu computador). Ideal para desenvolvimento local e testes.
- **`luisgzanetti/app:1.0.0`**: Publicada no Docker Hub (cloud pública). Qualquer pessoa no mundo com acesso à internet pode baixar com `docker pull luisgzanetti/app:1.0.0` (se o repositório for público). Ideal para distribuição para times e deploy em servidores remotos.
