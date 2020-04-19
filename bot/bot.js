const Discord = require('discord.js');
const client = new Discord.Client();

const npcCommand = "!npc ";
const helpCommand = "!npc_help";

const textArgument = "!text ";

const npcResponsePrefix = "\n**[NPC] ";
const npcResponseSuffix = "**\n";

client.on('ready', () => {
    client.user.setActivity('Type ' + helpCommand, { type: 'PLAYING' })
    console.log('Logged in as ${client.user.tag}!');
});

client.on('message', msg => {
    let msgContent = msg.content;

    let msgContentNoLinebreak = msgContent.replace(/\n/g, " ");

    // Si la commande commence par "!HELP", on indique le message d'aide
    if (msgContentNoLinebreak.toLowerCase().startsWith(helpCommand)) {
        msg.reply("You can use the following example :\n```!npc Dragon !text \"Hello there, little adventurer !\" exclaimed the beast. \"What are you doing inside my cave ?\"```");
        return;
    }

    // Déterminer si le contenu du message commence avec la commande "PNJ"
    if (msgContentNoLinebreak.toLowerCase().startsWith(npcCommand)) {
        // Dans le cas où il n'y a pas d'autre argument, on affiche un message d'erreur
        msgContentNoLinebreak = msgContentNoLinebreak.replace(npcCommand, "").replace(/^\s+/g, ''); // suppression des espaces en trop en début + de la commande NPC
        if (!msgContentNoLinebreak.includes(textArgument)) {
            msg.reply('Invalid arguments ! Please type "!help" for help.')
            return;
        }

        // On a un argument -> récupérer le nom du PNJ
        let npcName = msgContentNoLinebreak.substring(0, msgContentNoLinebreak.indexOf(textArgument)).replace(/^\s*\w+,\s\w+!\s*/, ''); // on retire les espaces de début et de fin

        // Récupérer le contenu du message
        let npcContent = msgContent.substring(msgContent.indexOf(textArgument) + textArgument.length, msgContent.length).replace(/^\s*\w+,\s\w+!\s*/, '');

        if (!npcName || !npcContent || npcName.length == 0 || npcContent.length == 0) {
            msg.reply('Invalid arguments ! There does not seem to be an NPC name or text. Please type "!help" for help.')
            return;
        }

        // Et on envoie ;)
        msg.channel.send(npcResponsePrefix + npcName + npcResponseSuffix + npcContent);
        msg.delete();
    }
});

client.login(process.env.BOT_TOKEN);