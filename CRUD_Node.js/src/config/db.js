//Driver mysql2 para tener compatibilidad con el MYSQL actual
const mysql = require('mysql2'); //Importación de MYSQL
require('dotenv').config(); 

const conexion = mysql.createConnection({
    // Node busca la variable. Si está en Railway, la usa. 
    // Si no, la busca en el archivo .env local.
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Puerto general de Rwailway
    port: process.env.DB_PORT || 3306 
});

conexion.connect((error) => {
    if(error){
        console.log("Error de conexión: " + error);
        return;
    }
    console.log("¡Conectado a la Base de Datos 'Suministros' exitosamente!");
});

module.exports = conexion;