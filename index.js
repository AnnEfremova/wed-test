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
    code: "def502002ce109105a34d3b570a29817d293488059d69f239b6ce824feee759cb0eae66a8a69d8b6c6348dc01ee2b4e9fbadb22cbc462d910e3b0d1f05e4a0a018cab2efabd9520b12d4b2d92bc1630d06e6b5bfbd1e1feb26b916799ca9ed2af830226fb2ca8044cc96d334f4a9a5737cfcf7e269f2fd2bde3f156cda24ada6e6fe88108255cc6dc3fc7a23e3248ed0ae794ac32429f35f93aa53a041a3561b27eab8892d3285a852423e2234eb39769019ea96ab2b0110877b489d1fca033854cc278813739c57a506b8acd7909d2cd93bbda919835a863e38d7c9e6f3fbf141cdf76f95f6e46760764f0d6c3e4b7e24526828ea2182575c1803edf64ae533e9de08132a3f9f2ae0d95f15a583fbece83e50c7230d45430a80456a3577be39ea3521ff6b0258cceb464b15452fcebdc20247f6b5782c983454c00097fdb1934d60913f4078ad5ef193768d133006a79afa3415f6bf60cc5ec9d5e7a517d2d8149f4697394d4c3100e8e876284a48cc94ed81b8fa7b31763e3d1e4ebe742027fbdcf35507a4356e9734c2ca61fdb618e19bf968a18c79a58f92a83c500342179a4fe6279245d0fb2d74b228792e81f032bb24d1685fe06df0745b41c5f63ffe73ba8afa32dfb87a49f7963f459d3ed79ad9eaca",
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
