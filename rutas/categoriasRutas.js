
const express = require ('express');
const router = express.Router();
const categoriasControlador = require('../controlador/categoriasControlador');
const notasControlador = require('../controlador/notasControlador');
const recordatoriosControlador = require('../controlador/recordatoriosControlador');



router.get('/', categoriasControlador.getTodosLasCategorias);
router.get('/:id', categoriasControlador.getCategoriasPorId);
router.post('/', categoriasControlador.crearCategorias);
router.put('/:id', categoriasControlador.actualizarCategorias);
router.delete('/:id', categoriasControlador.eliminarCategorias);

//router.get('/rangoFechas', notasControlador.getNotasPorUsuarioYRangoDeFechas);
//router.get('/trabajo', categoriasControlador.getNotasPorCategoriaTrabajo);

module.exports = router;    