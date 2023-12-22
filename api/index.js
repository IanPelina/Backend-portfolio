const app = require('express')();

const works = require("./data/works");

const sendMail = require("./services/nodemailer");

app.use(require('express').json())

app.get("/api/works", (req, res) => {
  res.status(200).json({ works });
});

app.get("/api/works/:id", (req, res) => {
  const { id } = req.params;
  const work = works.find((work) => work.id === id);
  res.status(200).json({ work });
});

app.post("/api/mail", async (req, res) => {
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
});

module.exports = app;
