require('dotenv').config();
const mysql = require('mysql2');

console.log("=== CARGANDO CONFIGURACIÓN DE BASE DE DATOS ===");
console.log("DB_HOST:", process.env.DB_HOST || process.env.MYSQLHOST);

// Pool en vez de conexión única: si Railway/MySQL cierran el socket por
// inactividad, una sola conexión se queda "muerta" hasta reiniciar el server.
// El pool abre conexiones nuevas solo cuando se necesitan.
const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    user: process.env.DB_USER || process.env.MYSQLUSER,
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
    database: process.env.DB_NAME || process.env.MYSQLDATABASE,
    port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,

    //Aiven requiere de la conexión cifrada sino rechazara en producción 
    //?  activa cifrado sin verificar el certificado CA
    //? ssl define los parametros de cifrado entre Node.js y MySQL en la nube
    //Si el DB_SSL es igual a true entonces recibira ese objeto, si es false (como en local) 
    //es indefinido y no es necesario
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((error, connection) => {
    if (error) {
        console.log("Error de conexión:", error);
        return;
    }
    console.log("¡Conectado a la Base de Datos exitosamente!");
    connection.release(); // solo probamos, el pool maneja el resto
});

module.exports = pool;