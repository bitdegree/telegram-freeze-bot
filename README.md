# Telegram Freeze Bot

A Telegram bot that promptly deletes all new messages from the chat.

## Configuration

Rename `.env.example` file to `.env` and edit its values as described in the comments.

You must invite the bot to the channel that you want to freeze and grant it permission to delete messagees.

## Running the bot

Install dependencies by running:

```
npm install
```

When testing you can run the bot with

```
node bot.js
```

In production you may want to use a process manager. Example with PM2:

```
pm2 start bot.js --name=telegram-bot

```

If you change the configuration you must restart the bot for the changes to take effect. For example, with PM2 you would do something like:

```
pm2 restart telegram-bot
```

## Notes

This bot comes with no warranties. Use at your own risk. 

At the time of writing there were issues with Telegram mobile app lagging to receive message deletion events. That's why some messages might still show up even if they were deleted by this bot.