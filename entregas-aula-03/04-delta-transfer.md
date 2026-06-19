# Questão 4 — Transferência Delta

## Output do push de app:1.0.0
```
The push refers to repository [localhost:5000/app]
e6e6f308e46a: Pushed 
8a8ab62cbcaf: Pushed 
b3533523b198: Pushed 
875728841659: Pushed 
55afa1ecc21d: Pushed 
1ab5d8a304ff: Pushed 
3c142f572651: Pushed 
370bcbe9d42a: Pushed 
a0bd913d436d: Pushed 
1.0.0: digest: sha256:fbc46bf431bb73d420dded7c6676068a0964e3b37bdc1c50755406f489de603b size: 856
```

## Output do push de app:1.0.1
```
The push refers to repository [localhost:5000/app]
4074b71a4769: Pushed 
370bcbe9d42a: Layer already exists 
3c142f572651: Layer already exists 
a0bd913d436d: Layer already exists 
55afa1ecc21d: Layer already exists 
12241b6ab77d: Pushed 
1ab5d8a304ff: Layer already exists 
b3533523b198: Layer already exists 
875728841659: Layer already exists 
1.0.1: digest: sha256:f5e17f854f9aed894ecd6059a73ba8f597d08a9f7ccb6be338a62486616ceca1 size: 856
```

## Comparação

| Camada | Push 1.0.0 | Push 1.0.1 | Transferida em 1.0.1? |
|---|---|---|---|
| a0bd913d436d (Alpine base) | Pushed | Layer already exists | ❌ Não |
| 370bcbe9d42a (Alpine) | Pushed | Layer already exists | ❌ Não |
| 3c142f572651 (Alpine) | Pushed | Layer already exists | ❌ Não |
| 1ab5d8a304ff (Alpine) | Pushed | Layer already exists | ❌ Não |
| 55afa1ecc21d (Alpine) | Pushed | Layer already exists | ❌ Não |
| 875728841659 (Alpine) | Pushed | Layer already exists | ❌ Não |
| b3533523b198 (Alpine) | Pushed | Layer already exists | ❌ Não |
| 8a8ab62cbcaf (npm install) | Pushed | — (substituída) | ✅ Sim (nova) |
| e6e6f308e46a (código v1.0.0) | Pushed | — (substituída) | — |
| 12241b6ab77d (npm install v1.0.1) | — | Pushed | ✅ Sim (nova) |
| 4074b71a4769 (código v1.0.1) | — | Pushed | ✅ Sim (nova) |

## Análise

No segundo push, apenas **2 camadas** foram realmente transferidas: a camada do `npm install` e a camada do código da aplicação. As **7 camadas base** do Alpine + Node.js já existiam no registry desde o push 1.0.0 e foram reaproveitadas.

Isso acontece porque o Docker identifica cada camada por seu hash de conteúdo (SHA256). Como as camadas base (Alpine, Node.js) são idênticas entre as versões, o registry reconhece que já as possui e responde "Layer already exists". Isso é a **transferência delta**: só o que mudou é enviado pela rede.

## Garbage collection

```
21 blobs marked, 0 blobs and 0 manifests eligible for deletion
```

**Explicação:** O garbage collector percorreu todos os blobs e manifestos do registry. Como ambas as tags (`1.0.0` e `1.0.1`) ainda estão referenciadas e nenhuma foi sobrescrita ou deletada, **zero blobs** foram removidos. Isso é esperado: o GC só remove blobs órfãos (que não são referenciados por nenhum manifesto). Como fizemos apenas push de duas versões diferentes, sem deletar ou sobrescrever tags, todos os 21 blobs estão em uso.
