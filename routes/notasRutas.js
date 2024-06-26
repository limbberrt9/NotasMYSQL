//routes
//notasRutas.js

const express = require('express');
const router = express.Router();
const notasControlador = require('../controllers/notasControlador');
const recordatoriosControlador = require('../controllers/recordatoriosControlador');

router.get('/', notasControlador.getTodosLasNotas);
router.get('/:id', notasControlador.getNotasPorId);
router.post('/', notasControlador.crearNotas);
router.put('/:id', notasControlador.actualizarNotas);
router.delete('/:id', notasControlador.eliminarNotas);


// CONSULTAS - REPORTES
router.get('/usuarios/:nombreUsuario', notasControlador.getNotaPorUsuario);

//router.get('/categorias/:nombreCategoria', notasControlador.getNotaPorCategoria);

router.get('/notas/:fecha/:categoria/:prioridad', notasControlador.getNotasPorFechaCategoriaYPrioridad);


router.get('/:titulo/:nombreUsuario/:prioridadRecordatorio', notasControlador.getNotasPorTituloYUsuarioYRecordatorio);
module.exports = router;









// contar versiculos por cada libro
//router.get('/contar', notasControlador.contarNotasPorAutor);
//router.get('/:nombreUsuario/:nombreCategoria', notasControlador.getNotaPorUsuario);