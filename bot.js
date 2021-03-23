//ИМЯ БОТА В ТЕЛЕГРАМ @stasNewBot

const {Telegraf} = require('telegraf')
const covidApi = require('covid19-api')
const countries = require('./const')

const bot = new Telegraf('1291929195:AAF7vs7sVMIp6MMCGbUHxyXTP8Mjcn7Ck2U')

bot.start(ctx => ctx.reply(`
Привет ${ctx.from.first_name}!
Узнай статистику по Коробкавиндовсу.
Введи страну на английском языке и получи статистику.
Получить весь список стран можно по команде /help."
`))


bot.help((ctx) => ctx.reply(`${countries}`))


bot.on('text', async (ctx) => {
    try {
        const userText = ctx.message.text
        const covidData = await covidApi.getReportsByCountries(userText)
        const countryData = covidData[0][0]

        const formatData = `
Страна: ${countryData.country}
Случаи: ${countryData.cases}
Смерти: ${countryData.deaths}
Выздоровело: ${countryData.recovered}`
        await ctx.replyWithPhoto(countryData.flag, {caption: formatData})
    } catch (e) {
        await ctx.reply('Такой страны не существует, для получения списка стран используй команду /help')
    }
})


bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.launch()
console.log('Bot is running...')