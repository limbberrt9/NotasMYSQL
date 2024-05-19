// Llamando nuestro modelo
const Usuario = require('../modelos/usuario');
const { Op } = require('sequelize');    

exports.getTodosLosUsuarios = async (peticion, respuesta) => {
    try {
        // Aquí deberías usar el modelo Usuario, no Libro
        const usuarios = await Usuario.findAll();
        respuesta.json(usuarios);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};


exports.getUsuarioPorId = async (peticion, respuesta) => {
    try {
       const { id } =  peticion.params;
       const usuario = await Usuario.findByPk(id);
        if (usuario) 
            respuesta.json(usuario);
        else
            respuesta.status(404).send({mensaje: 'Usuario No Encontrado'})
    } 
    catch (error) {
        respuesta.status(500).send(error);
    }
};

exports.crearUsuario = async (peticion, respuesta) => {
    try {
        const nuevoUsuario = await Usuario.create(peticion.body);
        respuesta.status(201).json(nuevoUsuario);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.actualizarUsuario = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const [usuarioActualizado] = await Usuario.update(peticion.body,{
            where : {idUsuario: id}
        });
        if (usuarioActualizado){
            const usuario = await Usuario.findByPk(id);
            respuesta.json(usuario);
        } else {
            respuesta.status(404).json({mensaje: 'Usuario no encontrado'})
        }
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.eliminarUsuario = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const eliminado =  await Usuario.destroy({
            where : {idUsuario : id}
        });
        if (eliminado)
            respuesta.status(200).json({mensaje: 'Usuario eliminado'});
        else
            respuesta.status(404).json({mensaje: 'Usuario no encontrado'});
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.buscarUsuario = async (peticion, respuesta) => {
    try {
        const { nombre } = peticion.query;
        const usuario = await Usuario.findAll({
            where : { nombreUsuario : { [Op.like] : `%${nombre}%`} }
        });
        respuesta.json(usuario);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};