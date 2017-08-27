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
      keyboard: [['10-11 классe'], ['В ССУЗЕ']],
      one_time_keyboard: true
    }
  })
})

bot.onText(/^(10-11 классe|В ССУЗЕ)$/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    'Answer 1': msg.text
  })
  const botAnswer = 'Здорово! \u{1F63B}'
  bot.sendMessage(id, botAnswer).then(() => {
    bot.sendMessage(id, `А какой экзамен ты будешь сдавать?`, {
      reply_markup: {
        keyboard: [
          ['Биология', 'Физика', 'Химия'],
          ['Информатика', 'Математика']
        ],
        one_time_keyboard: true
      }
    })
  })
})

bot.onText(
  /^(Биология|Физика|Химия|Информатика|Математика)$/,
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
            keyboard: [['Видео'], ['Книги', 'Графики']],
            one_time_keyboard: true
          }
        })
      })
  }
)

bot.onText(/^(Видео)$/, msg => {
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
      \u{2705} что ты учишься в ${state[id]['Answer 1']}
      \u{2705} тебе интересна ${state[id]['Answer 2']}
      \u{2705} для тебя удобнее ${state[id]['Answer 3']}
      \u{1F525}\u{1F525}\u{1F525}\u{1F525}\u{1F525}
      <em>Поэтому, думаю, что тебе будет 
      интересно это видео </em>
      <a href="https://youtu.be/HNiojTHQ26c">\u{23EC} </a> 
      `
  } else {
    text = 'твоих ответов недостаточно, набери команду <b>start</b>'
  }
  bot.sendMessage(id, text, {parse_mode: 'HTML'}).then(() => {
    bot.sendSticker(id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg').then(() => {
      bot.sendMessage(id, 'Ответь, пожалуйста, на вопросы!').then(() => {
        bot.sendMessage(
          id,
          `Скорость света мало зависит от среды, в которой свет распространяется. Она приблизительно равна 300 000 км/с. Со звуком все совсем не так. В какой из этих сред скорость звука максимальная?`,
          {
            reply_markup: {
              keyboard: [['Вода', 'Сталь'], ['Воздух', 'Вакуум']],
              one_time_keyboard: true
            }
          }
        )
      })
    })
  })
})

bot.onText(/^(Книги)$/, msg => {
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
      \u{2705} что ты учишься в ${state[id]['Answer 1']}
      \u{2705} тебе интересна ${state[id]['Answer 2']}
      \u{2705} для тебя удобнее ${state[id]['Answer 3']}
      \u{1F525}\u{1F525}\u{1F525}\u{1F525}\u{1F525}
      <em>Поэтому, думаю, что тебе будет 
      интересен этот урок </em>
      <a href="http://www.hemi.nsu.ru/">\u{23EC} </a> 
      `
  } else {
    text = 'твоих ответов недостаточно, набери команду <b>start</b>'
  }
  bot.sendMessage(id, text, { parse_mode: 'HTML' }).then(() => {
    bot.sendSticker(id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg').then(() => {
      bot.sendMessage(id, 'Ответь, пожалуйста, на вопросы!').then(() => {
        bot.sendMessage(
          id,
          `Скорость света мало зависит от среды, в которой свет распространяется. Она приблизительно равна 300 000 км/с. Со звуком все совсем не так. В какой из этих сред скорость звука максимальная?`,
          {
            reply_markup: {
              keyboard: [['Вода', 'Сталь'], ['Воздух', 'Вакуум']],
              one_time_keyboard: true
            }
          }
        )
      })
    })
  })
})

bot.onText(/^(Графики)$/, msg => {
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
      \u{2705} что ты учишься в ${state[id]['Answer 1']}
      \u{2705} тебе интересна ${state[id]['Answer 2']}
      \u{2705} для тебя удобнее ${state[id]['Answer 3']}
      \u{1F525}\u{1F525}\u{1F525}\u{1F525}\u{1F525}
      <em>Поэтому, думаю, что тебе будет 
      интересна эта инфограмма </em>
      <a href="http://okhotnik-galina.ucoz.ru/_ph/9/815905096.jpg">\u{23EC} </a> 
      `
  } else {
    text = 'твоих ответов недостаточно, набери команду <b>start</b>'
  }
  bot.sendMessage(id, text, { parse_mode: 'HTML' }).then(() => {
    bot.sendSticker(id, 'CAADAgADrAADBCOmDIRBbsLh2lHxAg').then(() => {
      bot.sendMessage(id, 'Ответь, пожалуйста, на вопросы!').then(() => {
        bot.sendMessage(
          id,
          `Скорость света мало зависит от среды, в которой свет распространяется. Она приблизительно равна 300 000 км/с. Со звуком все совсем не так. В какой из этих сред скорость звука максимальная?`,
          {
            reply_markup: {
              keyboard: [['Вода', 'Сталь'], ['Воздух', 'Вакуум']],
              one_time_keyboard: true
            }
          }
        )
      })
    })
  })
})


bot.onText (/^(Вакуум)$/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    'Answer 4': msg.text
  })
  const botAnswer = 'Верно! \u{1F64C}'
  bot.sendMessage(id, botAnswer).then(() => {
    bot.sendMessage(
      id,
      `Похоже, тебе действительно интересно! Попробуй еще! Неделимая порция какой-либо величины в физике называется именно так.`,
      {
        reply_markup: {
          keyboard: [['Квант', 'Корпускула'], ['Барион']],
          one_time_keyboard: true
        }
      }
    )
  })
})

bot.onText(/^(Вода|Воздух|Сталь)$/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    'Answer 4': msg.text
  })
  const botAnswer = '\u{1F648} Попробуй еще! '
  bot.sendMessage(id, botAnswer).then(() => {
    bot.sendMessage(
      id,
      `Неделимая порция какой-либо величины в физике называется именно так.`,
      {
        reply_markup: {
          keyboard: [['Квант', 'Корпускула'], ['Барион']],
          one_time_keyboard: true
        }
      }
    )
  })
})
bot.onText(/^(Квант|Корпускула|Барион)$/, msg => {
  const name = msg.from.first_name
  const id = msg.chat.id
  state[id] = {}
  Object.assign(state[id], {
    'Answer 4': msg.text
  })
  const botAnswer = 'Да ты лействительно готов быть на высоте! \u{1F680}'
  bot.sendMessage(id, botAnswer).then(() => {
    bot.sendMessage(
      id,
      ` \u{1F340} Покажи родителям наш сайт http://project358306.tilda.ws `,
      {
        reply_markup: {
          keyboard: [[' \u{1F5FB}', '\u{1F4DA}'], ['\u{1F4F1}']],
          one_time_keyboard: true
        }
      }
    )
  })
})

module.exports = bot
