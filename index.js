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
    code: "def50200f5555223f1bc512c7dcc7241ee4964ae1042a8251c1fced0def83ee169f3e4dda2f3ef02acb07042da64a46081e296d97683b518ae9d873c143bc5933a0240b31c25d8437c274e38f56f037b0999797b984bd5a46fbfc9eb6a463714c39359651a25e58309fa75ae64de1fa26416f472ba3a3a85511384b682d1fa7944ce0619459cb04d695c32af7281d5b005e150125ed7817fb3182d0beba4d320a688790ca589a55bfbdc4f1263c96d7dd84c73695e872c2dac77ffa61edce2b1b8de683c4170d6a7a852bfba393179737409f2647f106ba30a0d0b8269ffe13ff83efc4c0cf952f892a670e73b5deb6b15245d85f79a775228f885e5e5d409038296df1c482521e3787dabe3daf7820c9340bef64a13992da9eee9b34aaf62bba078e19b941d4f886c9e5d05ef71a22dfc82b6663e2a3b3e448cb883682a79a017854207bbc35b82115e75d73cd09e8937228020db9b6283b59a3b108f13ea9af937e34e824a2dcf0b162a5dec8de3896c692eb8d631d7e0e9dd5ca99eefdf192b970ad36105396d170a139e54c274b887c24e838ce0b5f04ebdfa48db3358aa7dead31cb20fb3885980b98f336708333aaf6c49eb83f962ce51bb073d2c110ec2916cebafa4ba49280d22a148c73942bd6ee705",
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
