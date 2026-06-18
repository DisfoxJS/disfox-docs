BehaviorTables é uma poderosa ferramenta que permite que sua aplicação tenha comportamentos.

![BehaviorTable Result](/img/doc-banner-bt.png)

Essa ferramenta fornece automação. Atualmente a partir da versão **Disfox 0.1.0**, só pode ser aplicada em comandos slash.

As **BehaviorTables** são basicamente tabelas que definem comportamentos para comandos slash, e futuramente, para Eventos.

com essa ferramenta, você pode permitir, bloquear usuários sobe o uso de comandos específicos, ou executar ações quando um comando
é executado com sucesso.

Ela fornece o conceito de comportamento aclopável, em componentes Disfox.

> Atualmente, BehaviorTables é apenas compativel com SlashCommands, apenas no modelo Disfox.

## Importações

```js
// esm
import { BehaviorTable, BehaviorContext } from 'disfox';
```

## Uso

### Exemplo criação

```js
import { BehaviorTable, BehaviorContext } from 'disfox';

const table = new BehaviorTable({
    context: BehaviorContext.SlashCommand,
    onViolate: {
        alert: {
            content: "This command is not available for you.",
            flags: 64 // Ephemeral (optional)
        },
        log: {
            content: "Usuario tentou ultilizar comando restrito.",
            level: "warn"
        }
    }
});

```

- `context`: Contexto da tabela. Recebe o **enum** `BehaviorContext`.
- `onViolate`: O que fazer ao tentar violar.

### Exemplo completo:

```js

import { SlashService, BehaviorTable, BehaviorContext, SlashTag } from "disfox";
import fs from "fs/promises"
import path from 'path'
import { fileURLToPath } from "url";

const dn = path.dirname(fileURLToPath(import.meta.url));
const filepath = path.join(dn, '..', 'data', 'restricted.json');

const restricted = await fs.readFile(filepath, 'utf-8')
const parsed = JSON.parse(restricted)

const table = new BehaviorTable({
    context: BehaviorContext.SlashCommand,
   
    restricted: {
        userId: parsed
    },
   
    onViolate: {
        alert: {
            content: "This command is not available for you.",
            flags: 64 // Ephemeral (optional)
        },
       
    }
})

const command = new SlashService.Command("ping")
    .description("replies with Pong!")
    .dock(table)
    .action(async interaction => {
        await interaction.reply("Pong!")
    });

export default command;

```

#### Resultado

![BehaviorTable Result](/img/result1.png)

### Valor de entrada
Este exemplo mostrou apenas algumas ações que podem ser executadas. abaixo está uma explicação de todos os valores que o
valor `onViolate` pode receber:

```js
{
    onViolate: {
        alert?: {
            content: string,
            flags?: number
        };
        sendDM?: {
            content: string,
        };
        function?: (...args : any[]) => void;
        applyTimeout?: {
            reason?: string,
            duration: number
        };
        applyVoiceMute?: {
            mute: boolean,
            reason?: string
        };
        kickOfGuild?: {
            reason?: string
        };
        banOfGuild?: {
            reason?: string,
            deleteMessageSeconds?: number
        }
}
}
```
| Action | Description | Properties | Example |
|----------|----------|----------|----------|
| `alert` | Sends an alert message when a violation occurs. | `content`, `flags?` | `alert: { content: "You cannot use this command." }` |
| `sendDM` | Sends a direct message to the user. | `content` | `sendDM: { content: "You have been punished." }` |
| `function` | Executes a custom function when a violation is detected. | `(...args: any[]) => void` | `function: (...args) => console.log(args)` |
| `applyTimeout` | Applies a timeout to the guild member. | `duration`, `reason?` | `applyTimeout: { duration: 60000 }` |
| `applyVoiceMute` | Mutes or unmutes the member in voice channels. | `mute`, `reason?` | `applyVoiceMute: { mute: true }` |
| `kickOfGuild` | Removes the member from the guild. | `reason?` | `kickOfGuild: { reason: "Rule violation" }` |
| `banOfGuild` | Bans the member from the guild. | `reason?`, `deleteMessageSeconds?` | `banOfGuild: { deleteMessageSeconds: 3600 }` |




