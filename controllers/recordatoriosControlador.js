// Llamando nuestro modelo



const Recordatorios = require('../modelos/recordatorios');
const Notas = require('../modelos/notas');
const Usuario = require('../modelos/notas');
const Categoria = require('../modelos/categorias');



const { Op } = require('sequelize'); 
const Nota = require('../modelos/notas');
const sequelize = require('../config/database');
const Seq =  require('sequelize');





exports.getTodosLasRecordatorios = async (peticion, respuesta) => {
    try {
        const recordatorios = await  Recordatorios.findAll();
        respuesta.json(recordatorios);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};




exports.getRecordatoriosPorId = async (peticion, respuesta) => {
    try {
       const { id } =  peticion.params;
       const recordatorios = await Recordatorios.findByPk(id);
        if (recordatorios) 
            respuesta.json(recordatorios);
        else
            respuesta.status(404).send({mensaje: 'Recordatios No Encontrado'})
    } 
    catch (error) {
        respuesta.status(500).send(error);
    }
};

exports.crearRecordatorios = async (peticion, respuesta) => {
    try {
        const nuevaRecordatorios = await Recordatorios.create(peticion.body);
        respuesta.status(201).json(nuevaRecordatorios);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.actualizarRecordatorios = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const [RecordatiosActualizada] = await Recordatorios.update(peticion.body,{
            where : {idRecordatorios: id}
        });
        if (RecordatiosActualizada){
            const recordatorios = await Recordatorios.findByPk(id);
            respuesta.json(recordatorios);
        } else {
            respuesta.status(404).json({mensaje: 'Recodatorio no encontrado'})
        }
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.eliminarRecordatorios = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const eliminado =  await Recordatorios.destroy({
            where : {idRecordatorios : id}
        });
        if (eliminado)
            respuesta.status(200).json({mensaje: 'Recordatorio eliminado'});
        else
            respuesta.status(404).json({mensaje: 'Recordatori no encontrado'});
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};



