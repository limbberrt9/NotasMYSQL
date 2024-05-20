const express = require('express');
const router = express.Router();
const categoriasControlador = require('../controlador/categoriasControlador');

router.get('/', categoriasControlador.getTodosLasCategorias);
router.get('/:id', categoriasControlador.getCategoriasPorId);
router.post('/', categoriasControlador.crearCategorias);
router.put('/:id', categoriasControlador.actualizarCategorias);
router.delete('/:id', categoriasControlador.eliminarCategorias);
router.get('/busqueda', categoriasControlador.buscarCategorias);

module.exports = router;