# SlashService

This service handles everything related to **Discord Slash Commands (/)**, providing utilities and tools for command extraction, registration, and execution.

With SlashService, you can extract modules that follow the standard **Discord.js** command structure, as well as modules created using the **Disfox Command Model (DFX)**.

---

![BehaviorTable Result](/img/doc-banner-ss.png)

## Import

```js
import { SlashService } from "disfox";
```

---

## Basic Command Structure

Example using the standard **Discord.js** command format:

```js
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    }
};
```

---

## Command Extraction

Commands can be extracted in two ways:

- **Single File**
- **Directory**

---

### Extracting a Single File

```js
import { SlashService } from "disfox";

const command = SlashService.extractFile("./command.js");
```

Returns:

```js
[
    {
        data: SlashCommandBuilder {
            options: [],
            name: "ping",
            name_localizations: undefined,
            description: "Replies with Pong",
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

> **Note:** This function supports both the Discord.js and Disfox command models.

---

### Extracting a Directory

```js
import { SlashService } from "disfox";

const commands = SlashService.extractDir("./commands");
```

Returns:

```js
{
    valid: [
        {
            data: SlashCommandBuilder {
                options: [],
                name: "ping",
                name_localizations: undefined,
                description: "Replies with Pong",
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

- Modules with invalid structures are placed in the `invalid` array.
- Valid modules are placed in the `valid` array.

### Validation Rules

Every module must export:

- `data`
- `execute`

```js
import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply("Pong!");
    }
};
```

---

## Disfox Command Model (DFX)

Since **v0.0.7**, Disfox includes its own command model for creating Slash Commands.

### Creating a Command with DFX

```js
import { SlashService } from "disfox";

const command = new SlashService.Command("ping")
    .description("Replies with Pong!")
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

> Command names cannot contain spaces, uppercase letters, or special characters, except for `-` and `_`.

### Using Tags

Tags define specific visibility and behavior settings for commands within Discord.

```js
import { SlashOptions, SlashService, SlashTag } from "disfox";

const command = new SlashService.Command("ping")
    .description("Replies with Pong!")
    .mark(SlashTag.AdminOnly)
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

| Tag | Description | Enum |
|------|-------------|------|
| AdminOnly | Makes the command visible only to users with administrator permissions. | `SlashTag.AdminOnly` |
| NSFW | Marks the command as age-restricted and only available in NSFW contexts. | `SlashTag.NSFW` |

---

## Registering and Listening for Commands

Both command models are internally converted through the `dfx2djs` converter, so the registration process is identical.

---

### Global Registration

```js
import { SlashService } from "disfox";
import { Events } from "discord.js";

app.client.on(Events.ClientReady, async () => {
    const commands = (await SlashService.extractDir("./commands")).valid;

    await app.slash.deployGlobal(commands);
});
```

- Accepts an array of extracted commands.
- Registers commands globally.

---

### Guild Registration

```js
import { SlashService } from "disfox";
import { Events } from "discord.js";

app.client.on(Events.ClientReady, async () => {
    const commands = (await SlashService.extractDir("./commands")).valid;

    await app.slash.deployGuilds(commands, ["1234", "12345"]);
});
```

- The second parameter is an array of guild IDs.
- Commands are only registered in those guilds.

---

### Listening for Commands

#### Basic Usage

```js
import { SlashService } from "disfox";
import { Events } from "discord.js";

app.client.on(Events.ClientReady, async () => {
    const commands = (await SlashService.extractDir("./commands")).valid;

    await app.slash.deployGlobal(commands);
    app.slash.listen();
});
```

---

#### Custom Error Message

```js
app.slash.listen({
    onError: {
        message: "An error occurred. Please try again.",
        flags: 64
    }
});
```

---

#### Custom Error Callback

```js
app.slash.listen({
    onError: {
        callback: (interaction, error) => {
            console.error("Failed to execute command:", error);
            interaction.reply("An error occurred. Please try again.");
        }
    }
});
```

---

## Attaching BehaviorTables

```js
import {
    SlashOptions,
    SlashService,
    SlashTag,
    BehaviorTable
} from "disfox";

const table = new BehaviorTable({});

const command = new SlashService.Command("ping")
    .description("Replies with Pong!")
    .dock(table)
    .action(interaction => {
        interaction.reply("Pong!");
    });

export default command;
```

BehaviorTables allow you to attach reusable restrictions, permissions, and automated actions directly to your commands.

---

With that, your application is ready to register, listen for, and execute Slash Commands with minimal setup.

> Last updated: June 18, 2026