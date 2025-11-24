//Importación de la conexión a la DB
const conexion = require('../config/db');

//Metodo GET
// Este método va a la base de datos, pide todo y lo devuelve al usuario
const listar = (req, res) => {
    conexion.query('SELECT * FROM Existencias', (error, filas) => {
        if(error){
            // Si falla, enviamos código 500 (Error del servidor)
            res.status(500).json({ mensaje: "Error en la consulta", error: error });
        } else {
            // Si todo sale bien, enviamos las filas
            res.json(filas);
        }
    });
};

// Método POST
const crear = (req, res) => {
    //Recepción de los datos del 'body' de la petición
    const { descripcion, precio, stock } = req.body;

    //Consulta SQL
    const sql = 'INSERT INTO Existencias (descripcion, precio, stock) VALUES (?, ?, ?)';

    //Ejecución de la consulta
    conexion.query(sql, [descripcion, precio, stock], (error, resultado) => {
        if(error){
            res.status(500).json({ error: error });
        } else {
            // Devolver el ID del nuevo producto creado
            res.json({ mensaje: "Insumo creado", id: resultado.insertId });
        }
    });
};

//Metodo PUT
const editar = (req, res) => {
    // Recepción del ID de la URL
    const { id } = req.params;
    const { descripcion, precio, stock } = req.body;
    const sql = 'UPDATE Existencias SET descripcion = ?, precio = ?, stock = ? WHERE id = ?';

    conexion.query(sql, [descripcion, precio, stock, id], (error, result) => {
        if(error) return res.status(500).json({ error: error });
        res.json({ mensaje: "Insumo actualizado exitosamente" });
    });
};

//Metodo DELETE
const eliminar = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Existencias WHERE id = ?';

    conexion.query(sql, [id], (error, result) => {
        if(error) return res.status(500).json({ error: error });
        res.json({ mensaje: "Insumo eliminado" });
    });
};

//Exportar el metodo para reutilizarlo
module.exports = {
    listar,
    crear, 
    editar, 
    eliminar
};