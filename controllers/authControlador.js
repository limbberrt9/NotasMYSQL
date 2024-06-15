const { User } =  require('../models');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.registroUsuario = async ( req, res) => {
        const {username, password} = req.body;
        const contrasenaEncriptada =  await bcrypt.hash(password, 10);
        try {
            const usuarioCreado = await User.create({ username, password: contrasenaEncriptada });
            
            console.log(usuarioCreado);
            console.log("USUARIO CREADO",usuarioCreado);
           // res.status(201).send('usuario creado');
           res.render('registro');

        } catch(error){
            console.log(error);
            res.status(400).send('Error al crear usuario');
        }
        
    };

exports.inicioSesion =  async (req, res , next) =>{
        passport.authenticate('local', (err, usuario, info) => {
            if (err)
                return next(err);
            if (!usuario) {
                return res.status(400).send(info.message);
            }
            req.logIn(usuario, (error) => {
                if (error)
                    return next(error);
                //return res.send('Autenticado!!');
                return res.redirect('/bienvenida');
            });
        })(req, res, next);
    };

exports.cierreSesion = async (req, res) =>{
        req.logout((err) => {
            if (err) {
                return res.status(500).send('Erro al cerrar la sesion');
            }
        //res.send('Sesion cerrada');
            return res.redirect('/auth/verinicio-sesion');
        }); 
    };