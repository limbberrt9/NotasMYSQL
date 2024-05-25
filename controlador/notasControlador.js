const Notas = require('../modelos/notas');
const Usuario = require('../modelos/usuario');
const sequelize = require('../config/database');
const Seq =  require('sequelize');
const Categoria = require('../modelos/categorias');
const Recordatorios = require('../modelos/recordatorios');
const { Op } = require('sequelize');    

exports.getTodosLasNotas = async (peticion, respuesta) => {
    try {
        const notas = await  Notas.findAll();
        respuesta.json(notas);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};




exports.getNotasPorId = async (peticion, respuesta) => {
    try {
       const { id } =  peticion.params;
       const notas = await Notas.findByPk(id);
        if (notas) 
            respuesta.json(notas);
        else
            respuesta.status(404).send({mensaje: 'Notas No Encontrado'})
    } 
    catch (error) {
        respuesta.status(500).send(error);
    }
};

exports.crearNotas = async (peticion, respuesta) => {
    try {
        const nuevaNotas = await Notas.create(peticion.body);
        respuesta.status(201).json(nuevaNotas);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.actualizarNotas = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const [NotasActualizada] = await Notas.update(peticion.body,{
            where : {idNota: id}
        });
        if (NotasActualizada){
            const notas = await Notas.findByPk(id);
            respuesta.json(notas);
        } else {
            respuesta.status(404).json({mensaje: 'Notas no encontrado'})
        }
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.eliminarNotas = async (peticion, respuesta) => {
    try {
        const { id } =  peticion.params;
        const eliminado =  await Notas.destroy({
            where : {idNota : id}
        });
        if (eliminado)
            respuesta.status(200).json({mensaje: 'Nota eliminado'});
        else
            respuesta.status(404).json({mensaje: 'Nota no encontrado'});
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};

exports.buscarNotas = async (peticion, respuesta) => {
    try {
        const { nombre } = peticion.query;
        const notas = await notas.findAll({
            where : { Titulo : { [Op.like] : `%${Titulo}%`} }
        });
        respuesta.json(usuario);
    } 
    catch (error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};


//CONTAR NOTAS POR AUTOR
exports.contarNotasPorAutor = async (peticion, respuesta) => {
    try {
        const todasNota = await Notas.findAll({
            attributes: [
                'idUsuario',
                [Seq.fn('COUNT', Seq.col('idNota')), 'contarNotas' ]
            ],
            group: ['idUsuario'],
            include: [{ model: Usuario, as: 'usuario', attributes: ['nombreUsuario'] }]
        });
        respuesta.json(todasNota);
    }
    catch(error){
        console.log(error);
        respuesta.status(500).send(error);
    }
};


// NOTAS POR USUARIO
exports.getNotaPorUsuario = async (peticion, respuesta) => {
    const { nombreUsuario } = peticion.params;
    try {
        const usuarioEncontrado = await Usuario.findOne({ where : { nombreUsuario: nombreUsuario } } );
        if (!usuarioEncontrado)
            return respuesta.status(404).json({mensaje: 'Usuario no encontrado'});
        const todasNotas = await Notas.findAll({
            where : {idUsuario : usuarioEncontrado.idUsuario },
            include: [{ model: Usuario, as: 'usuario' }]
        });
        respuesta.json(todasNotas);
    }
    catch(error){
        console.log(error);
        respuesta.status(500).send(error);
    }
};

// NOTAS POR CATEGORIA
exports.getNotaPorCategoria = async (peticion, respuesta) => {
    const { nombreCategoria } = peticion.params;
    try {
        // Encuentra las notas asociadas a la categoría especificada
        const notas = await Notas.findAll({
            where: {
                idNota: {
                    [Op.in]: sequelize.literal(
                        `(SELECT idNota FROM Categorias WHERE nombreCategoria = '${nombreCategoria}')`
                    )
                }
            },
            include: [{ model: Usuario, as: 'usuario' }] // Incluir la relación con Usuarios
        });

        respuesta.json(notas);
    } catch(error) {
        console.log(error);
        respuesta.status(500).send(error);
    }
};


/********************************* */

exports.getRecordatoriosPorCategoriaYUsuario = async (req, res) => {
    const { nombreUsuario, nombreCategoria } = req.params;
    try {
        const recordatorios = await Recordatorios.findAll({
            include: [
                {
                    model: Notas,
                    where: {
                        '$categorias.nombreCategoria$': nombreCategoria // Filtra por nombre de categoría
                    },
                    include: [
                        {
                            model: Usuario,
                            where: {
                                nombreUsuario: nombreUsuario // Filtra por nombre de usuario
                            }
                        },
                        {
                            model: Categoria,
                            as: 'categoria',
                            where: {
                                nombreCategoria: nombreCategoria // Filtra por nombre de categoría
                            }
                        }
                    ]
                }
            ]
        });
        res.json(recordatorios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al obtener los recordatorios.' });
    }
};

