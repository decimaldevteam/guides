# Discord.js

Most of discord.js users does not knows how to make a perfect discord.js command handler and in this guide we will be making a basic command handler with discord.js

# Command Handler

## File structure

So for this, we will be using this file structure

```
|- node_modules/
|- index.js
|- package.json
|- package-lock.json
|- commands/
   |- ping.js
```

## Setting up the bot

FIrst you must have installed nodejs and then need to setup package.json and install discordjs

```bash
$ npm init -y
$ npm install discord.js
```

## Beginner code

The beginner code of discord.js

```js
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.login('token');
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

# Conclusion

So hereafter do not use a if and else command handler which is bad. You can even make aliases and help command using it :)<br/>
Try to edit this page and extend this guide :)