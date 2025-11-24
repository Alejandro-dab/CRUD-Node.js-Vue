const express = require('express');
const router = express.Router();

//Importar controlador insumosController
const insumosController = require('../controllers/insumosController');

//Definición de ruta para el GET
router.get('/', insumosController.listar);
//Definición de ruta para el POST
router.post('/', insumosController.crear);
//Definición de ruta para el PUT
router.put('/:id', insumosController.editar);   
//Definición de ruta para el DELETE
router.delete('/:id', insumosController.eliminar); 
//Definición de ruta para Get por ID
router.get('/:id', insumosController.obtenerUno);

module.exports = router;