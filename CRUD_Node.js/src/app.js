require('dotenv').config() //Imporación de dontenv
const express = require('express'); //Importación de express
const app = express(); //Invocación de express
const conexion = require('./config/db'); //Importación de la base de datos y de conexion MYSQL
const rutasInsumos = require('./routes/insumos'); //Importar la ruta de insumos
const cors = require('cors'); //Importación de cors para evitar el bloqueo de puertos por navegador

//Permite entrar solo al puerto del frontend
app.use(cors({
    origin: 'https://nuevo-nombre-production.up.railway.app' 
}));

// Permite que el servidor entienda datos en formato JSON
app.use(express.json());

//Variable de entorno, por si el puerto 3000 esta ocupado
// Railway siempre inyecta una variable llamada PORT (en inglés)
const puerto = process.env.PORT || 3000;

//Ruta principal
app.get('/', function(req, res){
    res.send('Bienvenido al Sistema de Inventario de Obra');
});

//Invocar las rutas, la api con el CRUD
app.use('/api/insumos', rutasInsumos);

// Puerto como número (3000 en lugar de '3000')
app.listen(puerto, function(error){
    if(error){
        console.log("Hubo un error: ", error);
    } else {
        console.log("Servidor Ok en puerto: "+puerto);
    }
});