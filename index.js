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
  domain: "katekateileoru",
  auth: {
    client_id: "2945cf73-517a-4104-8865-3d8bfc1f2fc5", // ID интеграции
    client_secret:
      "5e0IQugUbhMq9LYwLTF4fApEUVI9EqXbA95JLevOV8V6p7PnYHHZeS1HXog7FuGx", // Секретный ключ
    redirect_uri: "https://example.com", // Ссылка для перенаправления,
    code: "def50200ec474135e9499ab4e836fb1fcb4d085c313e537e5186e26fbda00c86aaa8d75f64ecf5acce800722dff6bb0688d5caa56c0a7173c3cff7e6f80e039ded39eb46caf80ad63daddb4a801886759a8f8e883e8fa8fb37b3e5a6507dd74065822714ce25b1c9ae3de7c614fa6f8234c7b9205a633a27ecf3fd2da94d484ef64057279faed680c0e1508025e6ca9267bac5cecaf804f0b5e41aa8b22e1715cc8e51b462a4cd68b0a471f0305b0114cfaf170bb60afd881911516c0484e3e5380e19deb3972e5debf611d09383512964556059b77a58fcb5bf0480d2c983c4ce65aedef6a8e9d16d26301881d4b6fa64c68410cf3b318b556ef1d6a3e96ec6b17d1b9ac426886c0939b68e43d3e1a0623216b85b3f20c351f75b2e65eb5a1065db158ed4e23960177615ef3bfade015bcf10fd975ecd095626f31bc3d63b3412da0346b169d372368fcecf0e9afaa5550f1a317177e14ee7bb008b38bc777ddc344e859a2e17b923487fc37aba6d91b5581ae4457f1ea5e40b0835e8a75fc60a71ee0eb5356b80733175a23adaaefac24e4aca39d62f884f67bcbb8f8ce7ba22e94f8cce25a551abd5bccc41469cfa8a6b7431845aae15398098c86320c4a7c77c13e6a65fe3d007c71253c43072020997e83d",
  },
});

(async () => {
  const data = await client.request.get("/api/v4/leads");
  console.log(data.data._embedded.leads[0]);
})();


app.post("/", bodyParser.urlencoded({ extended: false }), async (req, res) => {
  try {
    const response = await client.request
      .post("/api/v4/leads", [
        {
          name: req.body.name,
          price: Number(req.body.price),
          custom_fields_values: [
            {
              field_id: 1211133,
              values: [{ value: req.body.tg_id }],
            },
            {
              field_id: 1211109,
              values: [{ value: req.body.phone }],
            },
            {
              field_id: 1211121,
              values: [{ value: req.body.budget }],
            },
            {
              field_id: 1212467,
              values: [{ value: req.body.level }],
            },
            {
              field_id: 1211113,
              values: [{ value: req.body.guests }],
            },
            {
              field_id: 1212851,
              values: [{ value: req.body.details }],
            },
            {
              field_id: 1211115,
              values: [{ value: req.body.format }],
            },
            {
              field_id: 1212829,
              values: [{ value: req.body.new }],
            },
            {
              field_id: 1212469,
              values: [{ value: req.body.decor }],
            },
            {
              field_id: 1211119,
              values: [
                { value: `Развлекательная программа: ${req.body.program}` },
              ],
            },
            {
              field_id: 1212779,
              values: [{ value: `Времени на подготовку: ${req.body.time}` }],
            },
            {
              field_id: 1211175,
              values: [{ value: req.body.who }],
            },
            {
              field_id: 1211123,
              values: [
                { value: `Где хотите организовать свадьбу: ${req.body.place}` },
              ],
            },
            {
              field_id: 634119,
              values: [{ value: `Метка перехода: ${req.body.li}` }],
            },
          ],
        },
      ])
      .then(() => {
        res.json({ result: "done" });
      });
  } catch(err) {
    res.json({ result: "error" });
  }
});

app.get("/", async (req, res) => {
  res.send(`Hello`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
