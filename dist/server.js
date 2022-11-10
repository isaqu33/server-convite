"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("./prisma");
const nodemailer_1 = __importDefault(require("nodemailer"));
const smtp_1 = require("./config/smtp");
const { port, user, pass, host } = smtp_1.smtp;
const transporter = nodemailer_1.default.createTransport({
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
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/confirm', async (req, res) => {
    const { nome } = req.body;
    const convidado = await prisma_1.prisma.convidado.upsert({
        where: {
            nome
        },
        update: {
            nome
        },
        create: {
            nome
        }
    });
    const mailsend = await transporter.sendMail({
        text: `${nome} acaba de confirmar presença na sua festa!`,
        subject: "Confirmação de presença",
        from: "Convite Interativo Async <convite.interativoasync@gmail.com>",
        to: ["joo.santos8psy@gmail.com"]
    });
    console.log(mailsend);
    return res.status(201).json(convidado);
});
app.get('/confirm', async (req, res) => {
    const convidado = await prisma_1.prisma.convidado.findMany();
    return res.status(201).json(convidado);
});
app.listen(3333, () => { console.log("HTTP server running"); });
