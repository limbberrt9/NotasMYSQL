const express = require('express');
const usuarioRutas = require('./rutas/usuarioRutas');
const notasRutas = require('./rutas/notasRutas');
const app = express();
//middleware
app.use(express.json());
//Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/notas', notasRutas);

//levantar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log('Servidor levantado http://localhost:'+PORT);
});

