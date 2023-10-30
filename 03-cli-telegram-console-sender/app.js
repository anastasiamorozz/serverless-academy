import TelegramBot from 'node-telegram-bot-api';
import { program } from 'commander';

const token = 'YOUR_BOT_TOKEN';

const bot = new TelegramBot(token, {polling: true});

function sender(){
    program
      .option('-m, --send-message <message>', 'Send a message')
      .option('-p, --send-photo <photo>', 'Send a photo')
      .option('--help', 'Display help');
    
    program.parse(process.argv);
    
    const options = program.opts();
    
    if (options.help) {
      program.outputHelp();
    } else if (options.sendMessage) {
        bot.sendMessage('YOUR_CHAT_ID', options.sendMessage);
    } else if (options.sendPhoto) {
      console.log('Sending a photo:', options.sendPhoto);
      bot.sendPhoto('YOUR_CHAT_ID', options.sendPhoto);
    } else {
      console.log('No command provided. Use --help for usage information.');
    }
}

sender();


