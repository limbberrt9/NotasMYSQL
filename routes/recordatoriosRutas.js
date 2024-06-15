const express = require('express');
const router = express.Router();
const recordatoriosControlador = require('../controllers/recordatoriosControlador');

router.get('/', recordatoriosControlador.getTodosLasRecordatorios);
router.get('/:id', recordatoriosControlador.getRecordatoriosPorId);
router.post('/', recordatoriosControlador.crearRecordatorios);
router.put('/:id', recordatoriosControlador.actualizarRecordatorios);
router.delete('/:id', recordatoriosControlador.eliminarRecordatorios);


module.exports = router;