// Llamando nuestro modelo
const Categorias = require('../modelos/categorias');
const { Op } = require('sequelize');    

exports.getTodosLasCategorias = async (peticion, respuesta) => {
    try {
        const categorias = await  Categorias.findAll();
        respuesta.json(categorias);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};




exports.getCategoriasPorId = async (peticion, respuesta) => {
    try {
       const { id } =  peticion.params;
       const categorias = await Categorias.findByPk(id);
        if (categorias) 
            respuesta.json(categorias);
        else
            respuesta.status(404).send({mensaje: 'Categoria No Encontrado'})
    } 
    catch (error) {
        respuesta.status(500).send(error);
    }
};

exports.crearCategorias = async (peticion, respuesta) => {
    try {
        const nuevaCategoria = await Categorias.create(peticion.body);
        respuesta.status(201).json(nuevaCategoria);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.actualizarCategorias = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const [CategoriaActualizada] = await Categorias.update(peticion.body,{
            where : {idCategoria: id}
        });
        if (CategoriaActualizada){
            const categorias = await Categorias.findByPk(id);
            respuesta.json(categorias);
        } else {
            respuesta.status(404).json({mensaje: 'Categoria no encontrado'})
        }
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.eliminarCategorias = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const eliminado =  await Categorias.destroy({
            where : {idCategoria : id}
        });
        if (eliminado)
            respuesta.status(200).json({mensaje: 'Categorias eliminado'});
        else
            respuesta.status(404).json({mensaje: 'Categorias no encontrado'});
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.buscarCategorias = async (peticion, respuesta) => {
    try {
        const { nombreCategoria } = peticion.query; // Cambiado a 'nombreCategoria'
        const categorias = await Categorias.findAll({
            where: { nombreCategoria: { [Op.like]: `%${nombreCategoria}%` } } // Cambiado a 'nombreCategoria'
        });
        respuesta.json(categorias);
    } catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};


