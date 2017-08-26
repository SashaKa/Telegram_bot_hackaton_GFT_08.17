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
  if (!state[id]) state[id] = []
  state[id].push(msg.text)
  bot.sendMessage(id, `Ты только что сказала мне ${msg.text}`).then(function() {
    console.log('state', state)
    if (state[id].length > 3) {
      bot.sendMessage(id, `В моем стейте уже 4 элемента`)
    }
  })
})

bot.onText(/^show me keyboard/, msg => {
  bot.sendMessage(msg.chat.id, 'Keyboard example', {
    reply_markup: {
      keyboard: [
        ['Sample text', 'Second sample'],
        ['Keyboard', 'another'],
        ["I'm robot"]
      ]
    }
  })
})

bot.onText(/^sticker/, msg => {
  bot.sendSticker(msg.chat.id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg')
})

module.exports = bot
