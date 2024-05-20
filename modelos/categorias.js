const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración de Sequelize
const Nota = require('./notas');
const Usuario = require('./usuario');


const Categorias = sequelize.define('categorias', {
    idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreCategoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idNota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Nota,
            key:'idNota'
        }
    }
});


//RELACIONES
Usuario.hasMany(Nota, { foreignKey: 'idUsuario', as: 'nota' });
Nota.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuarios' });
Nota.hasMany(Categorias, { foreignKey: 'idNota', as: 'categorias' });
Categorias.belongsTo(Nota, { foreignKey: 'idNota', as: 'nota' });

module.exports = Categorias;


