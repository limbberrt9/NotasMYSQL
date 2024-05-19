const express = require('express');
const router = express.Router();
const notasControlador = require('../controlador/notasControlador');

router.get('/', notasControlador.getTodosLasNotas);
router.get('/:id', notasControlador.getNotasPorId);
router.post('/', notasControlador.crearNotas);
router.put('/:id', notasControlador.actualizarNotas);
router.delete('/:id', notasControlador.eliminarNotas);


// CONSULTAS - REPORTES
// BUSCAR VERSICULOS DE UN LIBRO : NUMEROS
router.get('/usuarios/:nombreUsuario', notasControlador.getNotaPorUsuario);
// contar versiculos por cada libro
router.get('/contar', notasControlador.contarNotasPorAutor);


module.exports = router;


