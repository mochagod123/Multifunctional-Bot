const path = require("path");
const fs = require("fs");

module.exports = async (client) => {
    function loadEvents(directory) {
        const folders = fs.readdirSync(directory);
    
        for (const folder of folders) {
            const folderPath = path.join(directory, folder);
            if (fs.statSync(folderPath).isDirectory()) {
                const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));
    
                for (const file of files) {
                    const eventPath = path.join(folderPath, file);
                    const event = require(eventPath);
    
                    if (typeof event !== "function") continue;
    
                    client.on(folder, event);
                }
            }
        }
    }

    loadEvents(path.join(__dirname, "event"))
};