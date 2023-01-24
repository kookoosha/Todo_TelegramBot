require('dotenv').config();
const axios = require('axios');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}`));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.command('lasttask', (ctx) => {
  axios.get('http://localhost:3000/bot').then((response) => {
    const todo = (response.data).map((el) => el.title);
    ctx.reply(`Сегодня тебе надо: ${todo[todo.length - 1]}`);
  });
});

bot.command('alltasks', (ctx) => {
  axios.get('http://localhost:3000/bot').then((response) => {
    const todo = (response.data).map((el) => el.title);
    ctx.reply(`Сегодня тебе надо: ${todo}`);
  });
});

bot.command('sendtask', (ct) => {
  console.log(ct.message.from);
  bot.on('message', (ctx) => {
    const { text } = ctx.message;
    console.log(ctx.message.text);
    axios.post('http://localhost:3000/bot', {

      title: text,
    })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
