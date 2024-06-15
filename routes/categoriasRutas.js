//routes
//categoriasRutas.js

const express = require ('express');
const router = express.Router();
const categoriasControlador = require('../controllers/categoriasControlador');
const notasControlador = require('../controllers/notasControlador');
const recordatoriosControlador = require('../controllers/recordatoriosControlador');




router.get('/', categoriasControlador.renderizarCategorias);




router.get('/', categoriasControlador.getTodosLasCategorias);
router.get('/:id', categoriasControlador.getCategoriasPorId);
router.post('/', categoriasControlador.crearCategorias);
router.put('/:id', categoriasControlador.actualizarCategorias);
router.delete('/:id', categoriasControlador.eliminarCategorias);

//router.get('/rangoFechas', notasControlador.getNotasPorUsuarioYRangoDeFechas);
//router.get('/trabajo', categoriasControlador.getNotasPorCategoriaTrabajo);

module.exports = router;    