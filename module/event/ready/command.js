const path = require("path");
const fs = require("fs");

module.exports = async (client) => {
    const commandsPath = path.join(__dirname, '..', '..', 'slashcommands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            return;
        }
    }
};