require('dotenv').config() //Imporación de dontenv
const express = require('express'); //Importación de express
const app = express(); //Invocación de express
const conexion = require('./config/db'); //Importación de la base de datos y de conexion MYSQL

app.get('/', function(req, res){
    res.send('Ruta INICIO');
});

//Variable de entorno, por si el puerto 3000 esta ocupado
const puerto = process.env.PUERTO || 3000;

// RUTA DE PRUEBA (Borrar después)
app.get('/probar-conexion', function(req, res){
    // Intentamos pedirle todos los datos a la tabla 'Existencias'
    conexion.query('SELECT * FROM Existencias', function(error, filas){
        if(error){
            // Si falla, mostramos el error en pantalla
            res.send("Error en la consulta: " + error);
        } else {
            // Si funciona, mostramos los datos en formato JSON
            res.json(filas);
        }
    });
});

// Puerto como número (3000 en lugar de '3000')
app.listen(puerto, function(error){
    if(error){
        console.log("Hubo un error: ", error);
    } else {
        console.log("Servidor Ok en puerto: "+puerto);
    }
});