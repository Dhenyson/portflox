const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport(
    {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    },
    { from: `${process.env.SMTP_NAME} <${process.env.SMTP_EMAIL}>` }
)

exports.send = async (options) => {
    await transport.sendMail(options)
}