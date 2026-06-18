Este serviço está relacionado ao tratamento de **Eventos emitidos pelo Discord**, fornecendo extração segura e um padrão de arquitetura.

Ele é muito útil para ouvir múltiplos eventos de forma simples.

## Importação

```js
    import { EventService } from 'disfox'
```

## Estrutura Listener recomendada

```js

import { EmbedBuilder, Events } from "discord.js";

export default {
    data: Events.MessageCreate,
    async execute(message) {
        console.log(message)
    }
}

```

## Ouvindo