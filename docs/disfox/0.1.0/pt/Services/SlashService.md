Esse serviço cuida de tudo relacionado a **Slash Commands (/)** — utilitários e funções pra gerenciar comandos de barra.

Com ele, você extrai arquivos de módulo que exportam comandos no padrão do **Discord.js**, e também consegue extrair e converter módulos usando o modelo **Disfox**.

---

![BehaviorTable Result](/img/doc-banner-ss.png)

## Importação

```js
import { SlashService } from 'disfox';
```

---

## Estrutura básica de um comando

Exemplo usando o padrão padrão do **Discord.js** em arquivo único:

```js
import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde com pong"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    }
};
```



---

## Extração de comandos

Você pode extrair comandos de duas formas:

- **Arquivo único**
- **Diretório**

---

### Extraindo um arquivo único

```js
import { SlashService } from 'disfox';

const command = SlashService.extractFile("./command.js");
```

Retorna um array nesse formato:

```js
[
    {
        data: SlashCommandBuilder {
            options: [],
            name: 'ping',
            name_localizations: undefined,
            description: 'Responde com pong',
            description_localizations: undefined,
            contexts: undefined,
            default_permission: undefined,
            default_member_permissions: undefined,
            dm_permission: undefined,
            integration_types: undefined,
            nsfw: undefined
        },
        execute: [AsyncFunction: execute]
    }
]
```

> **Obs.:** Essa função funciona com os dois modelos.

---

### Extraindo um diretório

```js
import { SlashService } from 'disfox';

const commands = SlashService.extractDir("./commands");
```

Retorna:

```js
{
    valid: [
        {
            data: SlashCommandBuilder {
                options: [],
                name: 'ping',
                name_localizations: undefined,
                description: 'Responde com pong',
                description_localizations: undefined,
                contexts: undefined,
                default_permission: undefined,
                default_member_permissions: undefined,
                dm_permission: undefined,
                integration_types: undefined,
                nsfw: undefined
            },
            execute: [AsyncFunction: execute]
        }
    ],
    invalid: []
}
```

- Módulos com estrutura inválida vão pro array `invalid`.
- Módulos válidos vão pro array `valid`.

### Regras de validação

Cada módulo precisa ter:

- `data`
- `execute`

```js
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Responde com Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    }
};
```

---

## Modelo Disfox (DFX)

A partir da versão **v0.0.7**, o Disfox traz uma forma própria de criar comandos de barra.

### Criando um comando com o modelo DFX

```js
import { SlashService } from "disfox";

const command = new SlashService.Command("ping1")
    .description("responde")
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

> - O nome do comando (passado no construtor) não pode ter espaços, letras maiúsculas ou caracteres especiais, exceto `-` e `_`.

#### Usando tags

As tags definem certos comportamentos no uso ou na visibilidade do comando, dentro do Discord.

```js
import { SlashOptions, SlashService, SlashTag } from "disfox";

const command = new SlashService.Command("ping1")
    .description("responde")
    .mark(SlashTag.AdminOnly)
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

@[
    "AdminOnly": {
        "Deixa o comando visível apenas para cargos admnistradores.",
        "Enum: `SlashTag.AdminOnly`"
    },
    "NSFW": {
        "Deixa o comando invisível para o público sensível.",
        "Enum: `SlashTag.NSFW`"
    }
]


---

## Registrando e ouvindo comandos

Os dois modelos passam pelo conversor interno `dfx2djs`, então o processo é o mesmo nos dois casos.

---

### Registro global

```js
import { SlashService } from 'disfox';
import { Events } from 'discord.js';

app.client.on(Events.ClientReady, async () => {
    const commands = (await SlashService.extractDir("./commands")).valid;

    await app.slash.deployGlobal(commands);
});
```

- Recebe um array de comandos extraídos.
- Registra os comandos globalmente.

---

### Registro por servidor (guild)

```js
import { SlashService } from 'disfox';
import { Events } from 'discord.js';

app.client.on(Events.ClientReady, async () => {
    const commands = (await SlashService.extractDir("./commands")).valid;

    await app.slash.deployGuilds(commands, ['1234', '12345']);
});
```

- O segundo parâmetro é um array de IDs de servidor.
- Os comandos são registrados apenas nesses servidores.

---

### Ouvindo comandos

#### Uso simples

```js
import { SlashService } from 'disfox';
import { Events } from 'discord.js';

app.client.on(Events.ClientReady, async () => {
    const commands = (await SlashService.extractDir("./commands")).valid;

    await app.slash.deployGlobal(commands);
    app.slash.listen();
});
```

---

#### Com mensagem de erro personalizada

```js
app.slash.listen({
    onError: {
        message: "Ocorreu um erro, tente novamente!",
        flags: 64
    }
});
```

---

#### Com callback customizado

```js
app.slash.listen({
    onError: {
        callback: (interaction, error) => {
            console.error("Erro ao executar o comando:", error);
            interaction.reply("Ocorreu um erro, tente novamente!");
        }
    }
});
```


## Adicionando Tabelas

```js
import { SlashOptions, SlashService, SlashTag, BehaviorTable } from "disfox";

const table = new BehaviorTable({})

const command = new SlashService.Command("ping1")
    .description("responde")
    .dock(table)
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```


---

Com isso, sua aplicação já está pronta pra registrar, ouvir e executar slash commands sem dor de cabeça.

> Last updated: June 18, 2026