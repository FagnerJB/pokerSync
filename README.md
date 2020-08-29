# pokerSync
Um sistema de "rolamento de dados" para o Europair RPG.
Disponível em [FagnerJB.com](https://fagnerjb.com/app/pokersync).

## Changelog

### 1.0

* Site todo em português.
* Três opções de baralho (_deck_).
* Possibilidade de sacar (_draw_) de 5 a 1 carta - para variações de testes.
* Possibilidade de incluir 0 a 4 coringas (_jokers_) no baralho - para bônus.
* Possibilidade de remover cartas por naipes (_suits_) - para variações de testes e bônus.
* Possibilidade de remover cartas por valores (_ranks_) - para variações de testes e bônus.
* Sistema de salas (_rooms_) com compartilhamento das jogadas em tempo real.

### 1.1 (planejado)

* Site traduzido em inglês.
* Mostrar quem são os outros jogadores na mesma sala.
* Link para compartilhar o resultado da jogada atual (Notion Embed).

### 1.5 (planejado)

* Site traduzido em esperanto.
* Suporte completo para cegos.

## Execução do Ambiente de Desenvolvimento

```
cd web
npm install # ou yarn
npm start
cd ../server
npm install # ou yarn
npm run dev
```

### Necessita banco Mongo

Crie um arquivo em `server/src/database/credentials.ts`, com o conteúdo:
```
const db = {
    user: '', # Usuário do banco
    pswd: '', # Senha do banco
    dtbs: '', # Nome do banco
    url:  ''  # Endereço para o banco
}

export default db
```

**PokerSync** foi criado usando React, Node, MongoDB e Socket.IO.
