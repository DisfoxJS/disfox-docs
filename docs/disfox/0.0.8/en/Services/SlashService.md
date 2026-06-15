This service is related to **Slash Commands (/)**, providing utilities and functions for managing *slash* commands.

With it, you can extract multiple module files that export commands following the **Discord.js** structure, as well as extract and convert modules using the **Disfox** model.



## Import

```js
import { SlashService } from 'disfox';
```

---

## Basic command structure

Example using the standard **Discord.js** pattern in a single file:




```js
import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    }
};

```

---

## Command extraction

To extract commands, choose between:

- **Single file**
- **Directory**

---

### Extracting a single file

```js
import { SlashService } from 'disfox';

const command = SlashService.extractFile("./command.js");
```

The function returns an array in the following format:

```js
[
    {
        data: SlashCommandBuilder {
            options: [],
            name: 'ping',
            name_localizations: undefined,
            description: 'Replies with pong',
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

> **Note:** This function works with both models.

---

### Extracting a directory

```js
import { SlashService } from 'disfox';

const commands = SlashService.extractDir("./commands");
```

The function returns:

```js
{
    valid: [
        {
            data: SlashCommandBuilder {
                options: [],
                name: 'ping',
                name_localizations: undefined,
                description: 'Replies with pong',
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

- Modules with invalid structure are added to the `invalid` array.
- Valid modules are added to the `valid` array.

### Validation rules

Each module must include:

- `data`
- `execute`

```js
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    }
};
```

---

## Disfox Model (DFX)

Starting from version **v0.0.7**, Disfox introduces a new model for creating *slash* commands.

### Creating a command using the DFX model

```js
import { SlashOptions, SlashService, SlashTag } from "disfox";

const command = new SlashService.Command("ping1")
    .description("replies")
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

> - The command name (passed to the constructor) must not contain spaces, uppercase letters, or special characters, except `-` and `_`.

---

## Registering and handling commands

Both models use an internal converter called `dfx2djs`, so the process is the same.

---

### Global registration

```js
import { SlashService } from 'disfox';
import { Events } from 'discord.js';

app.client.on(Events.ClientReady, async () => {
    const commands = (await SlashService.extractDir("./commands")).valid;

    await app.slash.deployGlobal(commands);
});
```

- Receives an array of extracted commands.
- Commands are registered globally.

---

### Guild registration

```js
import { SlashService } from 'disfox';
import { Events } from 'discord.js';

app.client.on(Events.ClientReady, async () => {
    const commands = (await SlashService.extractDir("./commands")).valid;

    await app.slash.deployGuilds(commands, ['1234', '12345']);
});
```

- The second parameter is an array of guild IDs.
- Commands are registered only in those guilds.

---

### Listening to commands

#### Simple usage

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

#### With error message handling

```js
app.slash.listen({
    onError: {
        message: "An error occurred, please try again!",
        flags: 64
    }
});
```

---

#### With custom callback

```js
app.slash.listen({
    onError: {
        callback: (interaction, error) => {
            console.error("Error executing command:", error);
            interaction.reply("An error occurred, please try again!");
        }
    }
});
```

---

With this, your application is ready to register, listen to, and execute *slash* commands efficiently.