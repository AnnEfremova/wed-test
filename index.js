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
    code: "def5020016e34f811b17b030b649f024483d041abe0fcaf187afec15cb3f5752d3e5ecc9778020f52b457ba1b01aba668cb76ff023b2c291a35c5d8f973a2adcacc3f16230e6a1d4d287bc244068c30f18bea200113ce1a08db801159a866ad54ec99d9a8bc7cad06bcb0adda6194611a8d98e0bab96c9a43fec0b43ff3dd35c239ad62a858c96a4b0642908c7b3072f4da2393b48665c22c28b3837a06c5ed32e0b4f112990606cc8e73ed4c02e6118689d1480a4634261f828edbe8b4a2744d43cf6e9c1209e3e0c2210728ebe61e99e24e084c6c1357bf8269e238b372e59c2fcf778abd5a1a6e5ca66bad067f41b5743798cb4d3bd6f2572efff4ba97972216ae95a0e94f7d1c7a34294d47169283a2e1d6528c108cd6ed90c472ae486ea0ae0ce42250192e2c8ae7cadb0bd4b76128696fa1fde9039f0cdabeb3aaedd8f275f1173a6fc50fc6e641289f7615c483a9b8b5d1f0d9242d611a0d1646fc2690de81aea4820e23e34368376afd1a6160c35cdb2b7f21c1abef8067544dac18d4f7345313cb05b6c924a5a846f691f2eaa6ebc77491947d1d10912bbc1920727ca22cb16e5a29d6196d64e75609062a896c2e43e4cfec9a8abf4326f694b188f17050f391279b95857b7f804803b3200ae41ef64",
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
