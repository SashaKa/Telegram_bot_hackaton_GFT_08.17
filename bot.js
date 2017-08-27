let token = process.env.TOKEN

let Bot = require('node-telegram-bot-api')
let bot

if (process.env.NODE_ENV === 'production') {
  bot = new Bot(token)
  bot.setWebHook(process.env.HEROKU_URL + bot.token)
} else {
  bot = new Bot(token, {polling: true})
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode')

const state = {}

// это нужно убрать когда пойдете в продакшен
bot.onText(/^/, function(msg) {
  const name = msg.from.first_name
  const id = msg.chat.id
  console.log('state:', state)
})

// вот до сюда

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

bot.onText(/^(В школе|В университете|В техникуме|Не учусь)$/, (msg, match) => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    'Answer 1': msg.text
  })
  const botAnswer =
    match[0] != 'Не учусь'
      ? `${state[id]['Answer 1']} - здорово!`
      : 'И это только начало'
  bot.sendMessage(id, botAnswer).then(() => {
    bot.sendMessage(id, `Что тебе нравится?`, {
      reply_markup: {
        keyboard: [['Лазеры', 'Роботы'], ['Еда', 'Все это']],
        one_time_keyboard: true
      }
    })
  })
})
bot.onText(/^(Лазеры|Роботы|Еда|Все это)$/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  Object.assign(state[id], {
    'Answer 2': msg.text
  })
  bot.sendMessage(id, `${state[id]['Answer 2']} по тебе!`).then(() => {
    bot.sendMessage(id, `Насколько ты знаешь физику от 0 до 10?`, {
      reply_markup: {
        keyboard: [['До 5', '5-7'], ['7-10', 'Совсем не знаю']],
        one_time_keyboard: true
      }
    })
  })
})

bot.onText(/^(Совсем не знаю|До 5|5-7|7-10)$/, (msg, match) => {
  const name = msg.from.first_name
  const id = msg.chat.id
  Object.assign(state[id], {
    'Answer 3': msg.text
  })
  let botAnswer
  switch (match[0]) {
    case 'Совсем не знаю':
      botAnswer = 'попробуем подтянуть!'
    case 'До 5':
      botAnswer = '2!'
    case '5-7':
      botAnswer = '3!'
    case '7-10':
      botAnswer = '4!'
  }
  bot.sendMessage(id, botAnswer).then(() => {
    bot.sendMessage(id, `Выбери удобный тебе формат обучения!`, {
      reply_markup: {
        keyboard: [['Смотреть', 'Читать'], ['Слушать', 'На практике']],
        one_time_keyboard: true
      }
    })
  })
})

bot.onText(/^(Смотреть|Читать|Слушать|На практике)$/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  Object.assign(state[id], {
    'Answer 4': msg.text
  })
  let text;
  if (typeof state[id] !== 'undefined' && Object.keys(state[id]).length === 4) {
    text = `
    Поздравляем, вы успешно прошли наш тест!
    \u{2728}
    \u{1F604}
    <strong>Поздравляю!</strong>
    <i>От всей души!</i>
    <em>тут какой то текст</em>
    <a href="https://www.youtube.com/watch?v=RQg_Q4HYYpg">ссылка на видео</a>
    <a href="http://www.google.com/">Ссылка</a>
    Ваши ответы:
    1: ${state[id]['Answer 1']}
    2: ${state[id]['Answer 2']}
    3: ${state[id]['Answer 3']}
    4: ${state[id]['Answer 4']}`
  } else {
    text = 'ваших ответов недостаточно, наберите команду <b>start</b>'
  }
  bot.sendMessage(id, text, {parse_mode: 'HTML'}).then(() => {
    bot.sendSticker(msg.chat.id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg')
  })
})

bot.onText(/^sticker/, msg => {
  bot.sendSticker(msg.chat.id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg')
})
bot.onText(/^video/, msg => {
  bot.InlineQueryResultVideo(msg.chat.id, '')
})
bot.onText(/^Gif/, msg => {
  bot.InlineQueryResultGif(msg.chat.id, '')
})

module.exports = bot
