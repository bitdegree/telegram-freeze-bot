require('dotenv').config();

var TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_API_KEY || '';
const bot = new TelegramBot(token, {polling: true});

var whitelist = (process.env.TELEGRAM_WHITELIST || '').split(',').map(function (t) {
    return t.trim();
});

var activeFrom = parseInt(process.env.DELETION_ACTIVE_FROM);
var activeTo = parseInt(process.env.DELETION_ACTIVE_TO);

bot.on('message', function(msg) {
    var username = msg.from.username || '';
    var timeStamp = msg.date || Math.floor(Date.now() / 1000);

    console.log(JSON.stringify(msg));

    if(
        whitelist.indexOf(username) === -1 &&
        (timeStamp >= activeFrom || activeFrom === 0) &&
        (timeStamp <= activeTo || activeTo === 0)
    ) {
        // Delete the message
        bot.deleteMessage(msg.chat.id, msg.message_id).then(function () {
            console.log(msg.message_id + ' -> deleted');
        });

        // Kicks out bots that attempt to join the channel
        // This is necessary because normally bots can't see or delete messages sent by other bots
        (msg.new_chat_members || []).forEach(function (member) {
            if (member.is_bot) {
                bot.kickChatMember(msg.chat.id, member.id).then(function () {
                    console.log(member.id + ' -> kicked');
                })
            }
        });
    }
});
