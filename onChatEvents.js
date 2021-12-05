// Default 'chat' event file, commands and other on-chat procedures should usually be handled in here.
const { prefix } = require('../cfg/config.json');
const { CommandStore } = require('../store/CommandStore');

const commands = new CommandStore(
    process.cwd() + '/commands/'
);

const isUserPermitted = require('../utils/isUserPermitted');

module.exports = async(client, ...eventParams) => {

    let [channel, userstate, message, self] = eventParams;

    if (self) return;
    if(!message.startsWith(prefix)) return;

    const context = message.slice(prefix.length).split(/ +/);
    const commandName = context.shift().toLowerCase();
    const command = commands.getCommand(commandName);

    if(command !== null) 
    {
        if(isUserPermitted(userstate['badges'], command.permissions))
            await command.run(client, channel, userstate, context);
        else 
            await client.say(channel, `@${userstate['display-name']} - You don't have permission to use that command!`);
    } else return;

}

