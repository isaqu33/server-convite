
import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'
import { smtp } from './config/smtp'
import cors from 'cors'
// var cors = require('express-cors')


const { port, user, pass, host } = smtp


const transporter = nodemailer.createTransport({
  port,
  host,
  secure: false,
  auth: {
    user,
    pass
  },
  tls: {
    rejectUnauthorized: false
  }


})



const app = express()

//const corsOptions = {
//  origin: 'https://rosileneangelo.vercel.app',
//  optionsSuccessStatus: 200,
//  methods: "GET, PUT, POST"
//}

// 'https://rosileneangelo.vercel.app', 'http://localhost:5173'

//Use
app.use(express.json())
app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin",'https://rosileneangelo.vercel.app')
  res.header("Acess-Control-Allow-Methods",'GET,POST')
  app.use(cors())
  next()

})

app.post('/confirm', async (req, res) => {
  const { nome } = req.body



  const convidado = await prisma.convidado.upsert({
    where: {
      nome
    },
    update: {
      nome
    },
    create: {
      nome
    }
  })

  const mailsend = await transporter.sendMail({
    text: `${nome} acaba(m) de confirmar presença em seu casamento!`,
    subject: "Confirmação de presença",
    from: "Convite Interativo Async <convite.interativoasync@gmail.com>",
    to: ["angello.sistem@gmail.com", "joo.santos8psy@gmail.com", "rosy_anjin@hotmail.com"]
  })
  console.log(mailsend)
  return res.status(201).json(convidado)
})

app.get('/confirm', async (req, res) => {


  const convidado = await prisma.convidado.findMany()
  return res.status(201).json(convidado)
})

app.listen(process.env.PORT || 3333, () => { console.log("HTTP server running") })
