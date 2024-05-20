//LOGICA DE DATOS, DATOS DE LA BASE DE DATOS PROPIEDADES
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const usuario = sequelize.define('usuarios',{
    idUsuario: {
        type :  DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true       
    },
    nombreUsuario : {
        type : DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    Contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
});
module.exports = usuario;  