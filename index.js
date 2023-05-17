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
    code: "def50200811e3626a623a942890f1bfdd03f6894d306e016f3ade63a248997502280b84d26e30fcbbca80211584cc5a177982a2882ce8d25e6a14dbfd1f27412a071eea6ddd1b3b7b21a5a80fa5d5ecf63a0b7de017ef38bfec85e049e7f53922667c90e0e1c1e5862bffce47d43cda8a1aa5ca45fffd216c9514a43e21815c9ea43dd210a7cf2373ba0c1f13638a05eecee4b20b71da072d6d103790a8572355a0dcfcbe1717dde9760a768a17fb3f86323e639e4827f73cbc041615ebd960c384818d25ae9498c353f59c640689a59b2308e1428a8232d7a5ca13588e703432afa571df3809e4a50ab8bc6641fcc67a023b1d79d30e40c87dddc74127e7dba2f8f955ae3f61010a0188491867c45d477a0eaf7c4b4abcff935cbfbdea893eddaa5100b55d7eade9f6859af57b7a54dfccb9cb34c459c36546ea27fb9df216daeb8adc6cb50cb8ddeb0d2606b58cade8c964c86df660812d792baab9b0a994d09fe00cbdd6ed4055587d7da32f54d0cd7d912c84de7ed9724a3bfadd5cf144fa6389ac4519cf76b2327a70a3a6fc248b0357246f10be773a3e2b06fb8cf1d7cc81f97e0f775caf24c9d32b2a0a6ff894f000f378ecb8c6aa0f33cc2a6025e5f85e7af7c52b68a227a7bff061c7a2b136e980d9338c9bf6e9fcc07f49b45d3adbcea5c",
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
  } catch (err) {
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
