# Questão 2 — Versionamento SemVer

## Cenários e versões

| Cenário | Mudança | Versão (partindo de 1.3.0) |
|---|---|---|
| Breaking change na API | MAJOR | `2.0.0` |
| Correção de bug | PATCH | `1.3.1` |
| Nova funcionalidade compatível | MINOR | `1.4.0` |

## Comandos

MAJOR: `docker build -t app:2.0.0 .`
MINOR: `docker build -t app:1.4.0 .`
PATCH: `docker build -t app:1.3.1 .`

## Reflexão sobre :latest

Por que :latest é arriscado no cenário MAJOR mas aceitável no MINOR?

No cenário **MAJOR**, publicar `:latest` é arriscado porque a nova versão quebra compatibilidade com clientes antigos. Se alguém usa `app:latest` em produção, um simples `docker pull` pode trazer uma versão que quebra a aplicação inteira. Já no cenário **MINOR**, a nova funcionalidade é adicionada sem remover ou quebrar nada existente — clientes que usam `:latest` continuam funcionando normalmente, apenas ganham a nova feature. Ainda assim, o ideal é SEMPRE usar tags SemVer explícitas em produção, nunca `:latest`.
