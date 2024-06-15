//MODELOS 
// notas.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');


const Nota = sequelize.define('notas', {
    idNota: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Titulo: {
        type: DataTypes.STRING(255),
        allowNull: true  // Modifica según si el título es opcional o no
    },
    Cuerpo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW  // Establece por defecto la fecha actual
    },
    fechaModificacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW  // Establece por defecto la fecha actual
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,  // Esta es la tabla de usuarios
            key: 'idUsuario'  // La clave en la tabla de usuarios que estamos referenciando
        }
    }
});

/***************************/
// relacion 1 a 1
Nota.belongsTo(Usuario, {foreignKey: 'idUsuario', as: 'usuario'});
// relacion 1 a muhcos
Usuario.hasMany(Nota, {foreignKey : 'idUsuario', as: 'notas'})
module.exports = Nota;

/***************************/


module.exports = Nota;

