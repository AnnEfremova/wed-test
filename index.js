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
    code: "def502006af64e71730f54c0e7a43a9f799a5d4ebe94def787c33556232caa78fc37dab7db8b99c4ce903f1a03d6ee948c6eaa2556617b108e124d3c84b80fab306c85280b6b8d6a50f39a7f7a0f0b7a2e213b15c9aa08fe7d477b01f02a4492c3ee4d9902dbcf169f68142b12d930b0372b96c28d062f31141e7b2ba6084d8a9acd7063b147bbfbe1d3210e28005eca9e84676c0adf3e3c8947903fec8cd182d8aa93fca23906ee42a13175e4e6672599ed3d175dafe7679f7c01be8353823575bc59d8a7eead8ff8573664b4f3c288e0df0eea488cd9a7ff0bf3ef658cffcb04930a15306dd968096607b63a0df920ee7127d57712c6f9826bf447d7ebea4f292e521ec6cb7889e963ff95cca31e52f461d2e9e4f2e2c4a2ff2c86dea40964ebb2bd97cb05025de6f591dc585b68720faad2cfe8a9b3a6c2f20c44b5dfa6149b74c9161e49972a59f2f4c7a87accec264313b4278ccac589fe58d7f57b65b7a02973c1b8c15bce20a52b4a9581a25db6454cd24a30c335d0711b9648c622ae95d62d29ff4b19fe48e6c769ec5b755af9b12b2810f0ec45cf136d7f789c14a2bd0666b6e6860243dd83804eff82bf439512cef4593949b28848a52a0c3e2bfeac6feab1ed447afaf4379babb883f18af06ab18b",
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
