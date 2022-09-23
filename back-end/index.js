const express = require('express')
const app = express()
const port = 4000
const { sequelize } = require('./models/index');
const cors = require('cors')
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

var corsOptions = {
  origin: process.env.FRONT_URL,
  optionsSuccessStatus: 200 
}

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// Rutas
app.use(require('./routes'));

app.listen(port, function () {
  console.log(`Example app listening on http://localhost:${port}!`);

  sequelize.authenticate().then(() => {
      console.log('Nos hemos conectado a la base de datos!!!!!');
  })
});