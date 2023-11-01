import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import NodeCache from "node-cache";

const token = 'YOUR_BOT_TOKEN';
const cache = new NodeCache();
const bot = new TelegramBot(token, {polling: true});

const apiPrivat = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5'; 
const apiMono = 'https://api.monobank.ua/bank/currency'                       ; 

const keyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'USD' }],
            [{ text: 'EUR' }]
        ],
        resize_keyboard: true,
    },
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'For start choose options:', keyboard);
});

bot.onText(/USD/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        let currencyDataPrivat = cache.get('currencyDataPrivat'); 
        let currencyDataMono = cache.get('currencyDataMono');
        if (!currencyDataPrivat) {
            const responsePrivat = await axios.get(apiPrivat);
            currencyDataPrivat = responsePrivat.data;
            cache.set('currencyDataPrivat', currencyDataPrivat, 300);
        }
        if (!currencyDataMono) {
            const responseMono = await axios.get(apiMono);
            currencyDataMono = responseMono.data;
            cache.set('currencyDataMono', currencyDataMono, 400);
        }

        const selectedMonoEur = currencyDataMono.find(mono => mono.currencyCodeA === 840);// ISO code for EUR
        const selectedPrivat = currencyDataPrivat.find(currency => currency.ccy === 'USD');

        const message = `Monobank Rates:\nBuy: ${selectedMonoEur.rateBuy}, Sell: ${selectedMonoEur.rateSell}\nPrivatBank Rates:\nBuy: ${selectedPrivat.buy}, Sell: ${selectedPrivat.sale}`;
        bot.sendMessage(chatId, message);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
});

bot.onText(/EUR/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        let currencyDataPrivat = cache.get('currencyDataPrivat'); 
        let currencyDataMono = cache.get('currencyDataMono');
        if (!currencyDataPrivat) {
            const responsePrivat = await axios.get(apiPrivat);
            currencyDataPrivat = responsePrivat.data;
            cache.set('currencyDataPrivat', currencyDataPrivat, 300);
        }
        if (!currencyDataMono) {
            const responseMono = await axios.get(apiMono);
            currencyDataMono = responseMono.data;
            cache.set('currencyDataMono', currencyDataMono, 400);
        }

        const selectedMonoEur = currencyDataMono.find(mono => mono.currencyCodeA === 978);// ISO code for EUR
        const selectedPrivat = currencyDataPrivat.find(currency => currency.ccy === 'EUR');

        const message = `Monobank Rates:\nBuy: ${selectedMonoEur.rateBuy}, Sell: ${selectedMonoEur.rateSell}\nPrivatBank Rates:\nBuy: ${selectedPrivat.buy}, Sell: ${selectedPrivat.sale}`;
        bot.sendMessage(chatId, message);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
});