// Añadiremos nuestro servidor, conexión a la base de datos y uniremos el resto de la aplicación

const express = require ('express');
const app = express();
const PORT = 7000;
const {dbConnection} = require('./config/config');
const router = require('./routes/post')


app.use(express.json());
dbConnection();

app.use('/', router);



app.listen(PORT, () => console.log(`server started on port http://localhost:${PORT}`));

module.exports= app;