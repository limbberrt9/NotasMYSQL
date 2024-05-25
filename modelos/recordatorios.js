const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración de Sequelize
const Nota = require('./notas');




const Recordatorios = sequelize.define('recordatorios', {
    idRecordatorio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaRecordatorio: {
        type: DataTypes.DATE,
        allowNull: false,
        idNota: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:Nota,
                key:'idNota'
            }
        }
    }
});

/***************************/
// Relación 1 a 1
Recordatorios.belongsTo(Nota, { foreignKey: 'idNota', as: 'nota' });

// Relación 1 a muchos
Nota.hasMany(Recordatorios, { foreignKey: 'idNota', as: 'recordatorios' });


/***************************/

module.exports = Recordatorios;




