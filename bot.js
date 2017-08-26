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
  
  // // bot.sendMessage(id, `Привет, как тебя зовут?`).then(function() {
  // //   console.log('state', state)
  // })
})

bot.onText(/start/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  bot.sendMessage(id, `Привет, ${name}! Где ты учишься?`, {
    reply_markup: {
      keyboard: [['В школе', 'В университете'], ['В техникуме', 'Не учусь']],
      one_time_keyboard: true
    }
  })
})

bot.onText(/^В школе/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    1: msg.text
  })
  bot.sendMessage(id, `${state[id][1]} - здорово!`).then(() => {
    bot.sendMessage(id, `Что тебе нравится?`, {
      reply_markup: {
        keyboard: [['Лазеры', 'Роботы'], ['Еда', 'Все это']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^В университете/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    2: msg.text
  })
  bot.sendMessage(id, `${state[id][2]} - здорово!`).then(() => {
    bot.sendMessage(id, `Что тебе нравится?`, {
      reply_markup: {
        keyboard: [['Лазеры', 'Роботы'], ['Еда', 'Все это']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^В техникуме/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    3: msg.text
  })
  bot.sendMessage(id, `${state[id][3]} - интересно!`).then(() => {
    bot.sendMessage(id, `Что тебе нравится?`, {
      reply_markup: {
        keyboard: [['Лазеры', 'Роботы'], ['Еда', 'Все это']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^Не учусь/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    4: msg.text
  })
  bot.sendMessage(id, `И это только начало!`).then(() => {
    bot.sendMessage(id, `Что тебе нравится?`, {
      reply_markup: {
        keyboard: [['Лазеры', 'Роботы'], ['Еда', 'Все это']],
        one_time_keyboard: true
      }
    })
  })
})

bot.onText(/^Лазеры/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    1: msg.text
  })
  bot.sendMessage(id, `${state[id][1]} по тебе!`).then(() => {
    bot.sendMessage(id, `Насколько ты знаешь физику от 0 до 10?`, {
      reply_markup: {
        keyboard: [['До 5', '5-7'], ['7-10', 'Совсем не знаю']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^Роботы/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    2: msg.text
  })
  bot.sendMessage(id, `${state[id][2]} по тебе!`).then(() => {
    bot.sendMessage(id, `Насколько ты знаешь физику от 0 до 10?`, {
      reply_markup: {
        keyboard: [['До 5', '5-7'], ['7-10', 'Совсем не знаю']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^Еда/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    3: msg.text
  })
  bot.sendMessage(id, `${state[id][3]} по тебе!`).then(() => {
    bot.sendMessage(id, `Насколько ты знаешь физику от 0 до 10?`, {
      reply_markup: {
        keyboard: [['До 5', '5-7'], ['7-10', 'Совсем не знаю']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^Все это/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    4: msg.text
  })
  bot.sendMessage(id, `Да ты голова!`).then(() => {
    bot.sendMessage(id, `Насколько ты знаешь физику от 0 до 10?`, {
      reply_markup: {
        keyboard: [['До 5', '5-7'], ['7-10', 'Совсем не знаю']],
        one_time_keyboard: true
      }
    })
  })
})

bot.onText(/^Совсем не знаю/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    4: msg.text
  })
  bot.sendMessage(id, `попробуем подтянуть!`).then(() => {
    bot.sendMessage(id, `Выбери удобный тебе формат обучения!`, {
      reply_markup: {
        keyboard: [['Смотреть', 'Читать'], ['Слушать', 'На практике']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^До 5/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    1: msg.text
  })
  bot.sendMessage(id, `${state[id][1]} - есть с чего начать!`).then(() => {
    bot.sendMessage(id, `Выбери удобный тебе формат обучения!`, {
      reply_markup: {
        keyboard: [['Смотреть', 'Читать'], ['Слушать', 'На практике']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^5-7/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    2: msg.text
  })
  bot.sendMessage(id, `Хорошо! Продолжим?`).then(() => {
    bot.sendMessage(id, `Выбери удобный тебе формат обучения!`, {
      reply_markup: {
        keyboard: [['Смотреть', 'Читать'], ['Слушать', 'На практике']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^7-10/, msg => {
  bot.sendSticker(msg.chat.id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg')
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    3: msg.text
  })
  bot.sendMessage(id, `${state[id][3]} - Так держать! Будет интересно!`).then(() => {
    bot.sendMessage(id, `Выбери удобный тебе формат обучения!`, {
      reply_markup: {
        keyboard: [['Смотреть', 'Читать'], ['Слушать', 'На практике']],
        one_time_keyboard: true
      }
    })
  })
})

bot.onText(/^Смотреть/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    3: msg.text
  })
  bot
    .sendMessage(id, `${state[id][3]} - Так держать! Будет интересно!`)
    .then(() => {
      bot.sendMessage(id, `Выбери удобный тебе формат обучения!`, {
        reply_markup: {
          keyboard: [['Смотреть', 'Читать'], ['Слушать', 'На практике']],
          one_time_keyboard: true
        }
      })
    })
})

bot.onText(/^sticker/, msg => {
  bot.sendSticker(msg.chat.id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg')
})
bot.onText(/^video/, msg => {
  bot.InlineQueryResultVideo (msg.chat.id,'' )
})
bot.onText(/^Gif/, msg => {
  bot.InlineQueryResultGif(msg.chat.id,'')
})


module.exports = bot
