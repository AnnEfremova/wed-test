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
    code: "def50200f6c298922fec22c4847dc33c6576032f1f6b0dc1b8bc80c21addb8885f8caef219d4877f15b88d04f3e02ad7c2a376640565a23cffb16e4a4e19f61938d0afebdd343892a8f5ada86467ef82663a979ee49d662c877338f0058cb8fcf393225d01d32147f0cbc68c72f2f0904dc4978184b35f797c65f8fadae41872069318ac26fa144aa2d34d346d1ebc5a5950699332d1e8b57eb193e7a4a5d42d9d07839abbed31774d2d8462b512e8b8195cbe3005d2855e6b094894c063287b8ada903041c59e87da934793a1218c9a2d755da28ed835c7f911026774c10b5dad0e167fe97e7b4caf5ddc2bb0bb565b7faf5633f2e14303a3ee8f45975262409922535a1d8a90abbb001426ef5e169096bf8131816202892f475ab54f0ae49d98c09536d5c62bd386129070ac089bed5b9cf5052f5907fe65be148eaf043b902b3717a284588d2e3be5f5a3e41f21a466498caff7ea402936a890696f8a181780a15bdbc5bbb6757a6e10571b1838f57ebc0bb4eb0458f291a2d75aefbd9d807914dc8cd33fb878f8224104c9a3dba7ad2abcc3e33c13272f202ac2ad4b550ec344a7f6666f2e07b15553cdf35180ad43d979ab4e002249c918896640d7e405d98aba2192c84a5f8a7b9eb42a93e7e322220689",
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
        res.json("Ok");
      });
  } catch(err) {
    res.json("error");
  }
});

app.get("/", async (req, res) => {
  res.send(`Hello`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
