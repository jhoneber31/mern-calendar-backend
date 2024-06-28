const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

console.log(process.env)

//Crear el servidor de express

const app = express();

//Base de datos
dbConnection();

//Cors
app.use(cors());

//directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
//TODO: auth //crear, login, renew
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD: eventos
app.use('/api/events', require('./routes/events'));

//escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ', process.env.PORT);
})