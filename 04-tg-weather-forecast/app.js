import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const token = 'YOUR_BOT_TOKEN';

const bot = new TelegramBot(token, {polling: true});

const apiKey = 'YOUR_API_KEY';
const city = 'Kyiv';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const keyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'Forecast in Kyiv' }],
        ],
        resize_keyboard: true,
    },
};

const moreOptionsKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'Every 3 hours' }],
            [{ text: 'Every 6 hours' }],
        ],
        resize_keyboard: true,
    },
};

const exitKeyboard = {
    reply_markup: {
        keyboard: [
            [{ text: 'I no longer want to receive a forecast' }],
        ],
        resize_keyboard: true,
    },
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'For start choose options:', keyboard);
});

bot.onText(/Forecast in Kyiv/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Select the forecast interval:', moreOptionsKeyboard);
});

bot.onText(/Every 3 hours/, (msg) => {
    const chatId = msg.chat.id;
    scheduleWeatherUpdates(3, chatId);
});

bot.onText(/Every 6 hours/, (msg) => {
    const chatId = msg.chat.id;
    scheduleWeatherUpdates(6, chatId);
});

bot.onText(/I no longer want to receive a forecast/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'You will no longer receive weather forecasts. If you change your mind, use /start to subscribe again.');
});

function getWeather(chatId) {
    axios.get(apiUrl)
        .then((response) => {
            const weatherData = response.data;
            const weatherDescription = weatherData.weather[0].description;
            const temperatureKelvin = weatherData.main.temp;
            const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2);
            const message = `Weather in ${city}: ${weatherDescription}, Temperature: ${temperatureCelsius}°C`;
            bot.sendMessage(chatId, message, exitKeyboard);
        })
        .catch((error) => {
            console.error(error);
        });
}

function scheduleWeatherUpdates(hour, chatId) {
    getWeather(chatId);
    const updateIntervalMs = hour* 60 * 60 * 1000;
    setInterval(() => getWeather(chatId), updateIntervalMs);
}


