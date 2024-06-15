// app.js

const cors = require('cors');

const session = require('express-session');
const passport = require('passport');
const { sequelize } = require('./models');
const passportConfig = require('./config/passport');
const authRutas = require('./routes/authRutas');




const express = require('express');
const usuarioRutas = require('./routes/usuarioRutas');
const notasRutas = require('./routes/notasRutas');
const categoriasRutas = require('./routes/categoriasRutas');
const recordatoriosRutas = require('./routes/recordatoriosRutas');
//const sequelize = require('./config/database');

const app = express();

//Configuracion de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); //fixed



//CONFIGURACION DEL CORS
const corsOption = {
    origin: '*',
        methods: 'GET, POST, PUT, DELETE',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true
};
app.use(cors(corsOption))// cors con opciones configuradas

//------------ 
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// directorio publico
app.use(express.static('public'));

app.use(session({
    secret: 'clave_secreta',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);









// Rutas
// NOTAS: verificar dirnmae_no estair funcionado en este nivel
app.get('/', function(req, res) {
    res.render('index'); //fixed
});

app.use('/api/usuarios', usuarioRutas);
app.use('/api/notas', notasRutas);
app.use('/api/categorias', categoriasRutas);
app.use('/api/recordatorios', recordatoriosRutas);
app.use('/auth', authRutas);


// Levantar el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
});





// app.js



// Agregar ruta de categorías
app.use('/categorias', categoriasRutas);
app.use('/notas', notasRutas);


app.get('/bienvenida', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/verinicio-sesion');
    }
    res.render('bienvenida', { user: req.user });
});