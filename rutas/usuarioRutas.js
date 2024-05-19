const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controlador/usuarioControlador');

router.get('/', usuarioControlador.getTodosLosUsuarios);
router.get('/:id', usuarioControlador.getUsuarioPorId);
router.post('/', usuarioControlador.crearUsuario);
router.put('/:id', usuarioControlador.actualizarUsuario);
router.delete('/:id', usuarioControlador.eliminarUsuario);


router.get('/busqueda', usuarioControlador.buscarUsuario);

module.exports = router;