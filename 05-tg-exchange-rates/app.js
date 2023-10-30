import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const apiKey = 'uLVfiW79ttPib_OPp7uHwhINGi14djDGvu3imn9TX-I0';
const url = 'https://api.monobank.ua/bank/currency';

const token = '6314201256:AAHhdplO6rhEhr3kVw-Ao_3rkz_M2eoWsPg';

const bot = new TelegramBot(token, {polling: true});

const keyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'USD' }],
            [{ text: 'EUR' }]
        ],
        resize_keyboard: true,
    },
};

const exitKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'Previous menu' }]
        ],
        resize_keyboard: true,
    },
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'For start choose options:', keyboard);
});

bot.onText(/USD/, (msg) => {
    const chatId = msg.chat.id;
    axios.get(url, {
        headers: {
          'X-Token': apiKey,
        },
      })
      .then((response) => {
        const currencyData = response.data;
        const message = `Monobank Exchange Rates:\nBuy ${currencyData[0].rateBuy}, Sell ${currencyData[0].rateSell}\n`;
      
        bot.sendMessage(chatId, message, exitKeyboard);
      })
      .catch((error) => {
        console.error('Помилка при запиті до Monobank API', error);
      });
});

bot.onText(/EUR/, (msg) => {
    const chatId = msg.chat.id;
    axios.get(url, {
        headers: {
          'X-Token': apiKey,
        },
      })
      .then((response) => {
        const currencyData = response.data;
        const message = `Monobank Exchange Rates:\nBuy ${currencyData[1].rateBuy}, Sell ${currencyData[1].rateSell}\n`;
      
        bot.sendMessage(chatId, message, exitKeyboard);
      })
      .catch((error) => {
        console.error('Помилка при запиті до Monobank API', error);
      });
});

bot.onText(/Previous menu/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'For start choose options:', keyboard);
});