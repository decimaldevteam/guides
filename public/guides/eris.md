# Eris
A NodeJS wrapper for interfacing with Discord.

## Installation

You need to have installed nodejs and npm to install npm packages then create package.json by useing `npm init` for faster you can use `npm init -y` first.

```bash
$ npm init -y
$ npm install --no-optional eris
```

---

# Setup

After you install eris you need to create file name index.js.

## File structure

So for this guide your file structure should be

```
|- node_modules/
|- index.js
|- package.json
|- package-lock.json
```

## Index.js

The beginner code of eris

```js
const Eris = require("eris");
const client = new Eris("BOT_TOKEN"); // Keep your bot token secret always

client.on("ready", () => {
    console.log("Ready!");
});
client.on("messageCreate", (msg) => {
    if(msg.content === "!ping") {
        client.createMessage(msg.channel.id, "Pong!");
    }
});
client.connect();
```

And run the index.js

```bash
$ node index.js
```

After you start the bot you need to test ping cmd by type `!ping` in your discord server. You will see the bot responding 'Pong'

> We will see how to make a command handler in the next guide!

---

# Command Handler

So if you dont know how to start a discord bot then read the previous page.

## File structure

So for this guide your file structure should be

```
|- node_modules/
|- index.js
|- package.json
|- package-lock.json
|- commands/
   |- general/
        | - ping.js
```

So now lets install fs module through npm

```bash
$ npm install fs
```

Then in your index.js file

```js
const fs = require('fs');
const Discord = require('discord.js');

client.commands = new Eris.Collection();
client.aliases = new Eris.Collection();

fs.readdir(`${__dirname}/commands`, (error, ctg) => {
    if (error) throw error;

    ctg.forEach(category => {

        fs.readdir(`${__dirname}/commands/${category}`, (err, commands) => {
            if (err) throw err;

            commands.forEach(command => {
                const cmd = require(`${__dirname}/commands/${category}/${command}`);
                if (!cmd.help) throw new Error(`Invalid command file structure ${command}!`);

                cmd.help.category = category;
                cmd.location = `${__dirname}/commands/${category}/${command}`;

                console.log(`Loading command ${command}...`);

                client.commands.set(cmd.help.name, cmd);
                if (cmd.help.aliases && Array.isArray(cmd.help.aliases)) cmd.help.aliases.forEach(alias => client.aliases.set(alias, cmd.help.name));
            });
        });
        
    });
});


```

For message event

```js
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.PREFIX) !== 0) return;

    const args = message.content.slice(config.PREFIX.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (!command) return;

    try {
        await command.run(client, message, args);
    } catch(e) {
        console.error(e);
        message.channel.send(`Something went wrong while executing command "**${command}**"!`);
    }
});
```

After this in your index.js file should be

```js
const fs = require('fs');
const Discord = require('discord.js');

client.commands = new Eris.Collection();
client.aliases = new Eris.Collection();

fs.readdir(`${__dirname}/commands`, (error, ctg) => {
    if (error) throw error;

    ctg.forEach(category => {

        fs.readdir(`${__dirname}/commands/${category}`, (err, commands) => {
            if (err) throw err;

            commands.forEach(command => {
                const cmd = require(`${__dirname}/commands/${category}/${command}`);
                if (!cmd.help) throw new Error(`Invalid command file structure ${command}!`);

                cmd.help.category = category;
                cmd.location = `${__dirname}/commands/${category}/${command}`;

                console.log(`Loading command ${command}...`);

                client.commands.set(cmd.help.name, cmd);
                if (cmd.help.aliases && Array.isArray(cmd.help.aliases)) cmd.help.aliases.forEach(alias => client.aliases.set(alias, cmd.help.name));
            });
        });
    });
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.PREFIX) !== 0) return;

    const args = message.content.slice(config.PREFIX.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (!command) return;

    try {
        await command.run(client, message, args);
    } catch(e) {
        console.error(e);
        message.channel.send(`Something went wrong while executing command "**${command}**"!`);
    }
});

client.connect();
```

Then create folder name commands and category name it anything you want for this guide, i will name it to general and create `ping.js` in the folder

## Ping.js

```js
module.exports.run = async (client, message, args) => {
    const msgCreated = message.createdTimestamp;

    message.channel.createMessage("Pinging...")
        .then(m => {
            m.edit(`Pong! That Took \`${m.createdTimestamp - msgCreated}ms\``);
        });
};

module.exports.help = {
    name: "ping",
    description: "Ping command",
    aliases: ["pong"]
};
```

Then run the index.js

```bash
$ node index.js
```

And you see your command handler working fine!

> This guide will be updated in upcomming time!<br/>Incase if you note some mistakes in the guide then kindly edit this guide!
