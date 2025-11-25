require('dotenv').config();
console.log("=== ESTE ES EL APP.JS DEL BACKEND REAL ==="); 
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

conexion.connect((error) => {
    if(error){
        console.log("Error de conexión: " + error);
        return;
    }
    console.log("¡Conectado a la Base de Datos exitosamente!");
});

module.exports = conexion;