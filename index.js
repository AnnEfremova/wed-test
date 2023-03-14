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
    code: "def502004ad9064905a41a14f6ae410de323662efb4a858d6fc8db569501407b4f79e0429816a3591d575677484b396193ac7386aff420050b772cfd20434d7dbece3ccbbd30c130cea3572f37afd5a5304db808918937d4da07d3083bbce49f00573d18b61f247a08c59b12afb9c512c900e6779fcfa58b22c28935796e274d5a0ecb45d5620a86d04ce304744cb956892842e2ebea92bbed943f7a578518d784defc15b5e0f8118591eec27257b5e6842d89358db6d10499d97aab4a84d9ce275d77a7bbbb2b92878613ae418471e9fd45db5187240c5a1d6f35fc5b4694fbb342b0282e1370fc9e856a9adc16908040ba1f37cf2ac5996f5da4c71a25812d07896e77d9fcee893019b03c5afd58f42b7adcac5e386dd13079300355d47c4ae0f6bb953af4313cb07b9cf171c2cc6cadd9a050c58bc2cf9fd0c47456cb8888958abc074c5e1da2360b72e2d70508101a4967e09fd01e1ea8adf36c163d35ef79cfc4102c746bd59c4469252a734a13627c437755432ad07233d43d4c99e4083225231b65301b21bfaff519aed994a8ae5178fd29e36ffdc01be38b587bdeadfcd9eb82dee10c29beb5693c0fccc4aced25a00352d2602e65f6f35da9387636e147d8b2c48171fef355f05721fe4ffaa01fcb58",
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
          price: parseFloat(
            req.body.price.replace(/\s/g, "").replace(",", ".")
          ),
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
