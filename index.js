const { Client } = require("amocrm-js");
const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  tags: {
    blockStart: "[%",
    blockEnd: "%]",
    variableStart: "[[",
    variableEnd: "]]",
    commentStart: "[#",
    commentEnd: "#]",
  },
});

app.set("view engine", "njk");
app.use(express.json());
app.use(express.static("public"));

// авторизация

const client = new Client({
  domain: "https://katekateileoru.amocrm.ru",
  auth: {
    client_id: "clientId", // ID интеграции
    client_secret: "clientSecret", // Секретный ключ
    redirect_uri: "redirectUri", // Ссылка для перенаправления
    code: "code", // Код для упрощённой авторизации, необязательный
  },
});

app.post("/", bodyParser.urlencoded({ extended: false }), async (req, res) => {

    const lead = new client.Lead({
      tg_id: req.body.id,
      username: req.body.username,
      phone: req.body.phone,
      info: req.body.info,
    });

    await lead.save();
  }
);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
