const app = require('express')();

const works = require("./data/works");

const sendMail = require("./services/nodemailer");

app.use(require('express').json())

const allowCors = handler => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await handler(req, res)
}

app.get("/api/works", allowCors((req, res) => {
  res.status(200).json({ works });
}));

app.get("/api/works/:id", allowCors((req, res) => {
  const { id } = req.params;
  const work = works.find((work) => work.id === id);
  res.status(200).json({ work });
}));

app.post("/api/mail", allowCors(async (req, res) => {
  const { name, surname, email, area } = req.body;
  await sendMail({
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: `Prise de contact (${email})`,
    html: `
      <h1>${name} ${surname} souhaite prendre contact avec vous</h1>
      <h2>Message reçu de sa part</h2>
      <p>${area}</p>
    `
  });
  res.status(200).json({ message: 'Message envoyé' })
}));

module.exports = app;