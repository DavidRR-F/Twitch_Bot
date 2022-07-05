import tmi from 'tmi.js'
import { BLOCKED_WORDS } from './constants';
import dotenv from 'dotenv';

dotenv.config();
const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels : [process.env.TWITCH_CHANNEL]
};

const client = new tmi.Client(options);
client.connect().catch(console.error);
// trigger on connection
client.on('connected', (channel, user, message, self) => {
    client.say(channel, 'shagbagginsbot is connected');
});
// trigger on chat message
client.on('message', (channel, user, message, self) => {
    // if bot message ignore
    if(self) return;
    // message commands
    if(message == '!hello') {
        client.say(channel, `@${user.username}, hello!`)
    }

    if(message == 'Hello There') {
        client.say(channel, `@${user.username}, General Kenobi!`)
    }

    //moderateChat(channel, user, message);
});

function moderateChat(channel, user, message) {
    message = message.toLowerCase();
    let shouldSendMessage = false
    //check message
    shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()));
    //delete message
    if (shouldSendMessage) {
        client.say(channel, `@${user.username} literally stop no one likes you.`);
        client.deletemessage(channel, user.id);
    }

}