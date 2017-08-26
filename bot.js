let token = process.env.TOKEN

let Bot = require('node-telegram-bot-api')
let bot

if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token)
  bot.setWebHook(process.env.HEROKU_URL + bot.token)
} else {
  bot = new Bot(token, { polling: true })
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode')

const state = {}

bot.onText(/^/, function(msg) {
  const name = msg.from.first_name
  const id = msg.chat.id
  bot.sendMessage(id, `Ты только что сказала мне ${msg.text}`).then(function() {
    console.log('state', state)
  })
})

bot.onText(/begin/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  bot.sendMessage(id, `Привет, ${name}! Выбери один из вариантов!`, {
    reply_markup: {
      keyboard: [
        ['Опция 1', 'Опция 2'],
        ['Опция 3', 'Опция 4']
      ],
      one_time_keyboard: true
    }
  })
})

bot.onText(/^(Опция 1|Опция 2|Опция 3|Опция 4)$/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    1: msg.text
  })
  bot.sendMessage(id, `Твой выбор ${state[id][1]}`).then(() => {
    bot.sendMessage(id, `Давай попробуем еще!`, {
      reply_markup: {
        keyboard: [
          ['Опция 5', 'Опция 6'],
          ['Опция 7', 'Опция 8']
        ],
        one_time_keyboard: true
      }
    })
  })
})

bot.onText(/^sticker/, msg => {
  bot.sendSticker(msg.chat.id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg')
})

module.exports = bot
