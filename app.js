const {Telegraf} = require('telegraf')
const express = require('express')
const mongoose = require('mongoose')




const shecma = new mongoose.Schema({
    msg: {
        type: String
    }
})
const testmodel = mongoose.model('test',shecma)


mongoose.connect('mongodb+srv://rasedul20:rasedul20@telegramcluster.xfaz1rx.mongodb.net/sdBot', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

const app = express()

const bot = new Telegraf('5758005288:AAEeMH-vZPRqu5m3rkEzhgF4hlkkJxWcq_o')


bot.start(ctx=>{
    ctx.reply('Bot started')
})


bot.command('testdb',ctx=>{
    testmodel.find()
    .then(data=>{
        ctx.reply(data[0].msg)
    })
    .catch(e=>console.log(e))
})

app.use(bot.webhookCallback('/'))

app.get('/',(req,res)=>{
    res.json({"Status": "the site is running"})
})

app.get('/data',(req,res)=>{
    testmodel.find()
    .then(data=>{
        res.json({"data":data[0].msg})
    })
    .catch(e=>console.log(e))
})




app.listen(4999, ()=>{
    console.log("The site is running")
})