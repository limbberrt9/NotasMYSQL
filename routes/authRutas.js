//routes
//authRutas
const express = require('express');
const router = express.Router();
const authControlador = require('../controllers/authControlador.js');

router.get('/verregistro', (req, res) => {
    res.render('registro');
});

router.get('/verinicio-sesion', (req, res) => {
    res.render('iniciosecion'); 
});

router.post('/registro', authControlador.registroUsuario);
router.post('/inicio-sesion', authControlador.inicioSesion);
router.post('/cierre-sesion', authControlador.cierreSesion);
module.exports = router;  

