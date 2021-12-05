const tmi = require('tmi.js');
const axios = require("axios");
const config = require('/config.json');
const fs = require("fs");
const tls = require('tls')
const dotenv = require("dotenv").config();
const client = new tmi.client(vars.tmi);
const vars = require("./variables");
const logger = require("tmi.js/lib/logger");
const { readdirSync } = require('fs');
const http = require('http').createServer(app);
const mongo = require("./db/database");
const MongoClient = require("mongodb").MongoClient;
const express = require('express')
const app = express();
app.use(express.static('public'));
require('dotenv').config();

var database;

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

function connect(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, res) => {
      const db = res.db(dbName);
      database = db;
      return callback(err);
    });
  }
  
  function getDB() {
    return database;
  }

var exports = module.exports = {};

let channelBan = [];

const twitchHeader = {
    headers: {
      "Client-ID": vars.clientID,
      Authorization: `Bearer ${vars.oauthToken}`
    }
  };



function commonCatch(e) {
    console.log(e.config);
    if (e.response) {
        console.log("RESPONSE");
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
        return "-1";
    } else if (e.request) {
        console.log("REQUEST");
        console.log(e.request);
        return "-2";
    } else {
        console.log("ERROR", e.message);
        return "-3";
    }
}
  
  function validResponse(res) {
    if (res.data !== undefined) {
      return true;
    }
  }

try {

    // something here to try and catch

//} finally 
// try  {catch {{(err) => 
    console.error(err);
//

//const client = new tmi.client(options);

const options = {
    options: {
        // change to true to see chat logs in console
        debug: false
    },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: 'bots-username',
        password: 'oauth-token'
    },
    channels: ['channel-name, use commas to seperate channels']
};

client.connect();

client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'echo') {
		client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
	}
});

// subscription alert
client.on('subscription', function(channel, username, method, message, userstate) {
    client.say(channel, username + ' just subscribed. Welcome!');
})

// resub alert
client.on('resub', function(channel, username, months, message, userstate, methods) {
    client.say(channel, username + " resubbed for " + months + ". Welcome back!");
})

// ban log
client.on('ban', function(channel, username, reason) {
    console.log(username + ' is banned from ' + channel);
    console.log('reason: ' + reason);
});

client.on("message", onMessage);
client.on("connected", onConnect);

function onConnect(add, port) {
    console.log(`connected to ${add}:${port}`);
}

client.join('#channel')

process.on("SIGINT", () => {
    client.disconnect()
        .then(() => {
            fs.writeFileSync(
                config.commands,
                JSON.stringify(commands.sort((a, b) => {
                    if (a.name < b.name) { return -1; }
                    else if (a.name > b.name) { return 1; }
                    else { return 0; }
                }), null, 4) + "\n",
                () => {
                    logger.warn(`Could not save commands to ${config.commands}!`);
                }
            );

            process.exit();
        });
});


client.connect().catch(console.error);

client.on('connected', onConnectedHandler)
client.on('disconnected', onDisconnectedHandler)

mongo.connect(err => {
    if (err) {
      throw err;
    } else {
      console.log("Successfully connected to Database");
    }
  });

function onConnectedHandler (addr, port) {
    console.log(`Successfully Connected to ${addr}:${port}`);
}

// Called every time the bot disconnects from Twitch:
function onDisconnectedHandler (reason) {
    console.log(`Disconnected: ${reason}`)
    process.exit(1)
}

const commandName = msg.trim();
  
function onMessageHandler(target, context, tags, message, self){
    if (self) { return; } //Ignore bot messages 

}

client.on('message', (channel, tags, message, self) => {
	// "Alca: Hello, World!"
	console.log(`${tags['display-name']}: ${message}`);
});

function onConnect(add, port) {
    console.log(`connected to ${add}:${port}`);
  }

client = new tmi.client(options);

client.connect();

client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'echo') {
		client.say(channel, `@${tags.username}, you said: "${args.join(' ')}"`);
	}
});

client.on('message', (client, channel, tags, user, message, self, streamer) => {
    console.log(message);
    console.log(tags);
    if (message.startsWith('!hello') 
    )},
        

client.on('subscription', function(channel, username, method, message, userstate) {
    client.say(channel, username + ' just subscribed. Welcome!');
}),

// resub alert
client.on('resub', function(channel, username, months, message, userstate, methods) {
    client.say(channel, username + " resubbed for " + months + ". Welcome back!");
}),

// ban log
client.on('ban', function(channel, username, reason) {
    console.log(username + ' is banned from ' + channel);
    console.log('reason: ' + reason);

client.on('chat', function(channel, user, message, self) {
    if (message.endsWith)

client.say(channel, )

client.on("message", receivedMessage);

client.on('message', (channel, tags, message, self) => {
    console.log(`${tags['display-name']}: ${message}`);
});

client.on("message", (msg) => {
    // split message into array of words
    const args = msg.content.split(" ");
  
    // If bot sends message end functions
    if (msg.author.bot) return;
  
    // Get info
    if (msg.content.startsWith(`${prefix}live`)) {
      // Make get request to Twitch API with streamer name
      axios
        .get(`https://api.twitch.tv/helix/search/channels?query=${args[1]}`, {
          headers: {
            "client-id": process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
          },
        })
        .then((res) => {
          let response = res.data.data;
          response[0].is_live
            ? msg.reply(
                `${response[0].broadcaster_login} is live playing ${response[0].game_name}. Watch here: https://twitch.tv/${response[0].broadcaster_login}`
              )
            : msg.reply(`${response[0].broadcaster_login} is not live`);
        })
        .catch((err) => console.log(err));
    }

const client = new tmi.Client(

class TwitchBot {

class TwitchApi {

},Client(fs.openSync), Client(opts, tmi.Options),: tmi.Client,

client.on("chat", (channel, userstate, commandMessage, self) => {
    if (self) { return; };
    if (!config.verbose) { return; };

    if (!viewers.includes(userstate.username)) {
        viewers.push(userstate.username);
        client.say(channel, `Welcome to the stream, ${userstate["display-name"]} HeyGuys`);
    }

    if (!commandMessage.startsWith("!")) { return; };

    let commandName = commandMessage.split(/\s/)[0].toLowerCase();
    commandMessage = commandMessage.slice(commandName.length).trim();

    switch (commandName) {
        case ("!commands"):
            (() => {
                let names = "!commands !add !remove"
                    .split(/\s/)
                    .concat(
                        commands.map(c => {
                            if (c.active) { return c.name; }
                            else { return null; }
                        }).filter(name => {
                            return name !== null
                        })
                    ).sort()
                    .join(", ");

                client.say(channel, `@${userstate.username} The following commands are available: ${names}`);
            })();
            break;
        case ("!add"):
            (() => {
                const usage = `@${userstate.username} Usage: !add command message`;

                if (!commandMessage) { client.say(channel, usage); return; }

                commandName = commandMessage.split(/\s/)[0];
                if (!commandName) { client.say(channel, usage); return; }

                commandMessage = commandMessage.substr(commandName.length);
                if (!commandMessage) { client.say(channel, usage); return; }

                commandName = (commandName.startsWith("!") ? "" : "!") + commandName;
                commandName = commandName.toLowerCase();

                let commandNames = "!commands !add !remove"
                    .split(/\s/)
                    .concat(
                        commands.map(command => {
                            if (!command.active) { return null; }
                            return command.name;
                        }).filter(name => {
                            return name !== null
                        })
                    );

                if (commandNames.includes(commandName)) {
                    client.say(channel, `@${userstate.username} The command ${commandName} already exists!`); return;
                }

                commands.push({
                    name: commandName,
                    message: commandMessage,
                    author: userstate.username,
                    active: true
                });

                client.say(channel, `@${userstate.username} The command ${commandName} has been added!`);
            })();
            break;
        case ("!remove"):
            (() => {
                commandMessage = commandMessage.split(/\s/)[0];
                if (!commandMessage) { client.say(channel, `@${userstate.username} Usage: !remove command`); return; }

                commandMessage = (commandMessage.startsWith("!") ? "" : "!") + commandMessage.toLowerCase();

                if ("!commands !add !remove".split(/\s/).includes(commandMessage)) {
                    client.say(channel, `@${userstate.username} The command ${commandMessage} cannot be removed!`);
                    return;
                }

                let command = commands
                    .filter(c => {
                        return c.name === commandMessage && c.active;
                    });

                if (command.length <= 0) {
                    // client.say(channel, `@${userstate.username} The command ${commandMessage} does not exist!`);
                    return;
                }

                command = command[0];

                if (command.author !== userstate.username) {
                    client.say(channel, `@${userstate.username} The command ${commandMessage} cannot be removed. @${command.author} is the author!`);
                    return;
                }

                commands = commands
                    .filter(c => {
                        return c.name !== command.name;
                    });

                client.say(channel, `@${userstate.username} The command ${commandMessage} has been removed!`);
            })();
            break;
        default:
            (() => {
                let command = commands
                    .filter(c => {
                        return c.name === commandName && c.active;
                    });

                if (command.length <= 0) { return; }
                command = command[0];

                if (`#${command.author}` === channel) {
                    client.say(channel, `${command.message}`);
                }
                else {
                    client.say(channel, `${command.message} (${command.author})`);
                }
            })();
            break;
    }
}),


function clearChatHandler(channel) {
    client
      .clear(channel)
      .then(() => {
        console.log("CHAT CLEARED");
      })
      .catch(err => {
        console.log(err);
      });
  },

export default (client, channel, user, message, streamer) => {

    if (user.mod || user.username.toLowerCase() === streamer) {
    }

    if (message.toLowerCase() === '!hello') {
    // "@alca, heya!"
    client.say(channel, `@${tags.username}, heya!`);
    }
}

return client.say(),

axios.post('https://api.twitch.tv/helix/channels?broadcaster_id=[broadcaster id]', data, {'headers':headers}).then(resp => {
    console.log(resp.data);
}).catch(err => console.error(err))

var listener = app.listen(process.env.PORT, function() {
    console.log('Listening on port ', + listener.address().port)
    app.get('/', (req, res) => res.send('Hello World!'))
  });

module.exports = async(client, ...eventParams) => {

}

/* DATABSE FUNCTIONS */



module.exports = options;
module.exports = TwitchApi;
module.exports = TwitchBot