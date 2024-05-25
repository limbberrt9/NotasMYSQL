// Llamando nuestro modelo
const Categorias = require('../modelos/categorias');
const { Op } = require('sequelize');
const Notas = require('../modelos/notas');
const Usuario = require('../modelos/usuario')



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







/*****************notas por categorias ************/ 
exports.getNotasPorCategoria = async (peticion, respuesta) => {
    const { nombreCategoria } = peticion.params;
    try {
        const notasPorCategoria = await Categorias.findAll({
            where: { nombreCategoria: nombreCategoria },
            include: [{
                model: Notas,
                as: 'notas'
            }]
        });

        if (notasPorCategoria.length === 0)
            return respuesta.status(404).json({ mensaje: 'Categoría no encontrada o sin notas' });

        respuesta.json(notasPorCategoria.map(cat => cat.notas));
    } catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};





/*******************2*************** */
exports.getNotasPorUsuarioYRangoDeFechas = async (peticion, respuesta) => {
    const { nombreUsuario, fechaInicio, fechaFin } = peticion.query;
    try {
        const usuario = await Usuario.findOne({ where: { nombreUsuario } });
        if (!usuario) {
            return respuesta.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const notas = await Notas.findAll({
            where: {
                idUsuario: usuario.idUsuario,
                fechaCreacion: {
                    [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
                }
            }
        });

        respuesta.json(notas);
    } catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};


/****************************************/


/***********************/ 


exports.getCategoriasPorId = async (peticion, respuesta) => {
    try {
       const { id } =  peticion.params;
       const categorias = await Categorias.findByPk(id);
        if (categorias) 
            respuesta.json(categorias);
        else
            respuesta.status(404).send({mensaje: 'Categorissa No Encontrado'})
    } 
    catch (error) {
        respuesta.status(500).send(error);
    }
};