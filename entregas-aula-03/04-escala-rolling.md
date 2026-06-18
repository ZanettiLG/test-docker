# Entrega: Questão 4 — Escala e Rolling Update

## 1. Escala para 3 réplicas

Output de `docker service ps app-api` após escala:

```
ID             NAME            IMAGE                    NODE             DESIRED STATE   CURRENT STATE             ERROR     PORTS
x3qqz525mbav   app-api.1       luisgzanetti/app:1.0.1   docker-desktop   Running         Running 37 seconds ago              
6psu1bjukifa    \_ app-api.1   luisgzanetti/app:1.0.0   docker-desktop   Shutdown        Shutdown 38 seconds ago             
z6dxhdk6ejv4   app-api.2       luisgzanetti/app:1.0.1   docker-desktop   Running         Running 9 seconds ago               
sm4j1bijb92c    \_ app-api.2   luisgzanetti/app:1.0.0   docker-desktop   Shutdown        Shutdown 9 seconds ago              
tc6o4n3h14vp   app-api.3       luisgzanetti/app:1.0.1   docker-desktop   Running         Running 23 seconds ago              
lt64u8uauup8    \_ app-api.3   luisgzanetti/app:1.0.0   docker-desktop   Shutdown        Shutdown 24 seconds ago             
```

## 2. Rolling update

O output acima já mostra as 3 réplicas da v1.0.1 rodando e as 3 da v1.0.0 como "Shutdown". O Swarm substituiu gradativamente cada réplica: primeiro a app-api.1 (nova iniciada, antiga desligada 1s depois), depois a app-api.3 (14s depois), e por último a app-api.2 (14s depois da anterior). O processo completo levou ~38 segundos.

## 3. Disponibilidade

Não, o serviço permaneceu disponível durante todo o rolling update. A cada momento pelo menos 2 das 3 réplicas estavam ativas respondendo requisições.

## 4. Explicação

O Swarm mantém o serviço disponível durante o rolling update através de um processo gradual:

1. **Por padrão, atualiza 1 réplica por vez** — O Swarm não derruba todas as réplicas de uma vez. Ele seleciona uma réplica, inicia uma nova com a imagem atualizada, aguarda ela ficar saudável (`Running`), e só então desliga a réplica antiga.

2. **Paralelismo controlado** — Com `--update-parallelism 1` (padrão), apenas 1 tarefa é atualizada de cada vez. Isso garante que as outras réplicas continuem respondendo.

3. **Health check e rollback** — O Swarm monitora o estado da nova tarefa. Se ela falhar (ficar em estado de erro), o Swarm pode automaticamente fazer rollback.

4. **Load balancing** — A porta publicada (`--publish 3000:3000`) é servida pelo ingress network do Swarm, que faz load balancing entre todas as réplicas saudáveis. Durante o update, as requisições são roteadas apenas para as réplicas ativas.
