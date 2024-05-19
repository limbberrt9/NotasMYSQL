//CONFIGURACION PARA CONEXION DE BASE DE DATOS
const Sequelize =  require('sequelize');

const sequelize = new Sequelize('NotasDB', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps : false
    }
});
//exportar
module.exports = sequelize;