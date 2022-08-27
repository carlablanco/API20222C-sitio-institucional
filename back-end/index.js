const express = require('express')
const app = express()
const port = 3000
const { sequelize } = require('../models/index');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes'));

app.listen(port, function () {
  console.log(`Example app listening on http://localhost:${port}!`);

  sequelize.authenticate().then(() => {
      console.log('Nos hemos conectado a la base de datos!!!!!');
  })
});