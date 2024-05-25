const express = require('express');
const router = express.Router();
const notasControlador = require('../controlador/notasControlador');
const recordatoriosControlador = require('../controlador/recordatoriosControlador');

router.get('/', notasControlador.getTodosLasNotas);
router.get('/:id', notasControlador.getNotasPorId);
router.post('/', notasControlador.crearNotas);
router.put('/:id', notasControlador.actualizarNotas);
router.delete('/:id', notasControlador.eliminarNotas);


// CONSULTAS - REPORTES
router.get('/usuarios/:nombreUsuario', notasControlador.getNotaPorUsuario);

router.get('/categorias/:nombreCategoria', notasControlador.getNotaPorCategoria);

//router.get('/recordatorios/:nombreUsuario/:nombreCategoria', recordatoriosControlador.getRecordatoriosPorCategoriaYUsuario);

module.exports = router;









// contar versiculos por cada libro
//router.get('/contar', notasControlador.contarNotasPorAutor);
//router.get('/:nombreUsuario/:nombreCategoria', notasControlador.getNotaPorUsuario);