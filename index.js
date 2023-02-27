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
      "exkSk2SARJsI0rCg34WfJedOJ9b2WNalQUyZb4RkRGjymyOm3xHvT419j7bEOBRR", // Секретный ключ
    redirect_uri: "https://probable-honey-kryptops.glitch.me/", // Ссылка для перенаправления,
    code: "def50200588ac9d9af90c527ec300babf6ea651a776c3484a427c1c8b565500ca813802da4837daeb139dacc1be2f51c530ecbf40eff18d7a05cef4a149c2d1e03977e9f9c05bc5bbf0f6bfb9e8131f82b7627d8149f240b17fd452fe2b4a9dd4f8ec9deece34c9f91775b3ea6bd7feb036f57a214c83ff303b78b00a89c096294b390f3cc31f9c7a30e49face89d1ebb07a22ff6560e6202cd6e634c7b105133fa690111ff884c6f3d5da4cef7f61a16fdb18e050d73765df8583a7e8a4456fe5029e8b47819afaa88ba98ddd7a61c206d60b711c0dc809fa6b926eae4239392765cf96d65e7c4b74572965cb7ad170e1aeff7ef2b5652e2c09f5011d91929c1dca154284663bad13ce35d97bb8f31e5dbaad454163c83474282a83cbd1bd114164f90181fa5f595688cc8db262c42bd14e2d3ce9e502f95ddf99a6c466d1389e75476e75519eb30e1a29567d9abaef638c38069788aff2f6b6c00b8650b60f0d2f8a19309ca19dc59412b059180b57f1303f7f3b65ef8cd2eb18273f98b74f9f2a7f527053419a69c437ad3c44b1cd3d9fdb7ddee9c4ba9030805658ef604d2d695417b8ddaee57764420fda5a1d12aacf54131f0f1c5f6f653d2085b75c20ac1e761c2d76391fbfe4c0493356cde45759e2379a9d03722d86455472b06a6a2e40b61017ecec111c4373ac",
  },
});

(async () => {
  const data = await client.request.get("/api/v4/leads/36102549");
  console.log(data.data);
})();

app.post("/", bodyParser.urlencoded({ extended: false }), async (req, res) => {
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
        ],
      },
    ])
    .then(() => {
      res.json("Ok");
    });
});

app.get("/", async (req, res) => {
  res.send(`Hello`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
