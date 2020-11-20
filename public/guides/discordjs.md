# Discord.js

Most of discord.js users does not knows how to make a perfect discord.js command handler and in this guide we will be making a basic command handler with discord.js

## Installation

Asusual you need to have installed nodejs and npm to install npm packages!

```bash
$ npm i discord.js
```

---

# Login to your bot

## Setting up

Now lets login to your discord bot first you need to setup package.json and make sure you have installed discord.js!

```bash
$ npm init -y
$ npm install discord.js
```

## File structure

So for this guide your file structure should be

```
|- node_modules/
|- index.js
|- package.json
|- package-lock.json
```

## Index.js

The beginner code of discord.js

```js
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login('token');
```

**Hurrah! We have a running bot!**

> Keep your bot token secret always, try to save it in .env file!

## Test command

So, lets test our bot now by a simple pong command!

```js
client.on('message', message => {
   if(message.content == '!ping') return message.channel.send('pong');
});
```

Now go to a discord channel where the bot has permission and exists and send the `!ping` message and you see the bot running!

> The above code uses if and else type of command handler which is not good so you can read how to make a command handler in the next page!

---

# Command Handler

So if you dont know how to start a discord bot then read the previous page!

## File structure

So for this guide, we will be using this file structure will be this

```
|- node_modules/
|- index.js
|- package.json
|- package-lock.json
|- commands/
   |- ping.js
```

## Do not

Most of the people use this type of command handler

```js
client.on('message', message => {
    if(message.content == '!ping') return message.channel.send('pong')
    else if(message.content == '!kek') return message.channel.send('kok');
});
```

This kind of if and else makes the bot slow and is a bad way of using command handler

## Right way

For this way you need to use Discord Collection and [fs](https://npmjs.com/package/fs);

```bash
$ npm i fs
```

Then in you index.js file

```js
const fs = require('fs');
const Discord = require('discord.js');

const commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if(err) return console.error(err);
    files = files.filter(x => x.endsWith('.js'));

    files.forEach(file => {
        let cmdFile = require('./commands/' + file);
        commands.set(cmdFile.config.name, cmdFile);
    });
});
```

Then use the message event

```js
const prefix = '!'; // Lets assume that, this is your prefix...

client.on('message', message => {
    if(
        message.author.bot ||
        !message.content.startsWith(prefix) ||
        message.author.type == 'dm'
    ) return;

    const messageArray = message.content.split(' ');
    const args = messageArray.slice(1);
    const cmd = messageArray[0].slice(prefix.length);

    const cmdFile = commands.get(cmd);
    if(cmdFile) cmdFile.run(client, message, args);
});
```

And now in your command file

In command/ping.js

```js
module.exports = {
    config: {
        name: 'ping',
        description: 'Just a simple command',
        usage: '!ping'
    },
    run: (client, message, args) => {
        message.channel.send('pong');
    }
};
```

---

# Auto changing statuses

Make automatically changing statuses for your bot with setInterval...<br/>
The following code below will make auto changing statuses

```js
const Discord = require('discord.js');
const client = new Discord.Client();

const statuses = [
    'status1',
    'status2',
    'status3'
]; // You can make your own array of custom statuses...

client.on('ready', () => {
    console.log('Bot is ready');

    setInterval(() => {
        client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)]); // Set your custom status
    }, 5000); // 5000ms means 5s, which will changes status for each 5s, you can use custom time
});

client.login('token');
```
