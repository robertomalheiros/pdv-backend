require('dotenv').config();
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const envioDeEmail = async (destinatario, nomeDoDestinatario) => {
    const envio = transport.sendMail({
        from: process.env.EMAIL_PADRAO,
        to: destinatario,
        subject: 'DeBotSistemas - Confirmação de pedido',
        html: `${nomeDoDestinatario} seu pedido foi confirmado pelo DeBotSistemas.`
    });
}

module.exports = envioDeEmail;