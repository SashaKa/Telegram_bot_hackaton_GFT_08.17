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

bot.onText(/start/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  bot.sendMessage(id, `Привет, ${name}! Где ты учишьcя?`, {
    reply_markup: {
      keyboard: [['10-11 классe'], ['В ВУЗЕ']],
      one_time_keyboard: true
    }
  })
})

bot.onText(/^(10-11 классe|В ВУЗЕ)$/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    'Answer 1': msg.text
  })
  const botAnswer = 'Тогда начнем?'
  bot.sendMessage(id, botAnswer).then(() => {
    bot.sendMessage(id, `А какой экзамен ты будешь сдавать?`, {
      reply_markup: {
        keyboard: [
          ['Биология', 'Физика', 'Химия'],
          ['Информатика', 'Профильная математика']
        ],
        one_time_keyboard: true
      }
    })
  })
})

bot.onText(
  /^(Биология|Физика|Химия|Информатика|Профильная математика)$/,
  msg => {
    const name = msg.from.first_name
    const id = msg.chat.id
    Object.assign(state[id], {
      'Answer 2': msg.text
    })
    bot
      .sendMessage(id, `${state[id]['Answer 2']} - очень интересное дело!`)
      .then(() => {
        bot.sendMessage(id, `Как ты лучше воспринимаешь информацию?!`, {
          reply_markup: {
            keyboard: [['Видео', 'Аудио'], ['Книги', 'Графики']],
            one_time_keyboard: true
          }
        })
      })
  }
)

bot.onText(/^(Видео|Аудио|Книги|Графики)$/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  Object.assign(state[id], {
    'Answer 3': msg.text
  })
  let text
  if (typeof state[id] !== 'undefined' && Object.keys(state[id]).length === 3) {
    text = `
      <strong> \u{2728}Поздравляю! \u{1F604}</strong>
      <em>Вот, что я узнал о тебе:</em>
       -что ты учишься в ${state[id]['Answer 1']}
       -тебе интересна ${state[id]['Answer 2']}
       -для тебя удобнее ${state[id]['Answer 3']}
       \u{1F525}\u{1F525}\u{1F525}\u{1F525}\u{1F525}
       <em>Поэтому, думаю, что тебе будет интересно </em>
       <a href="https://youtu.be/HNiojTHQ26c"> посмотреть видео </a>
       <em>и почитать по этой теме </em><a href="http://okhotnik-galina.ucoz.ru/_ph/9/247214088.jpg">статью</a>
      `
  } else {
    text = 'ваших ответов недостаточно, наберите команду <b>start</b>'
  }
  bot.sendMessage(id, text, {parse_mode: 'HTML'}).then(() => {
    bot.sendSticker(id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg').then(() => {
      bot.sendMessage(id, 'а теперь тест!').then(() => {
        bot.sendMessage(id, `2 + 2 = ?`, {
          reply_markup: {
            keyboard: [['1', '4'], ['58', 'Math.sqrt(16)']],
            one_time_keyboard: true
          }
        })
      })
    })
  })
})

module.exports = bot
