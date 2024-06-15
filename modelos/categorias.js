
//modelos
// categorias.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración de Sequelize
const Nota = require('./notas');


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
    descripcion: {
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
Categorias.belongsTo(Nota, {foreignKey: 'idNota', as: 'notas'});
// relacion 1 a muhcos
Nota.hasMany(Categorias, {foreignKey : 'idNota', as: 'categorias'})


module.exports = Categorias;


