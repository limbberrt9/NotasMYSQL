const express = require('express');
const usuarioRutas = require('./rutas/usuarioRutas');
const notasRutas = require('./rutas/notasRutas');
const categoriasRutas = require('./rutas/categoriasRutas');
const recordatoriosRutas = require('./rutas/recordatoriosRutas');

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/notas', notasRutas);
app.use('/api/categorias', categoriasRutas);
app.use('/api/recordatorios', recordatoriosRutas);

// Levantar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
});

