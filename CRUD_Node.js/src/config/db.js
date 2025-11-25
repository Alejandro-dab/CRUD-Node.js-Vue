require('dotenv').config();
console.log("=== ESTE ES EL APP.JS DEL BACKEND REAL ==="); 
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    user: process.env.DB_USER || process.env.MYSQLUSER,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
    database: process.env.DB_NAME || process.env.MYSQLDATABASE,
    port: process.env.DB_PORT || process.env.MYSQLPORT || 3306
});

conexion.connect((error) => {
    if(error){
        console.log("Error de conexión: " + error);
        return;
    }
    console.log("¡Conectado a la Base de Datos exitosamente!");
});

module.exports = conexion;
