const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/test.db', // Ruta a tu base de datos SQLite
  logging: false, // Puedes habilitar el registro de consultas si lo deseas
});

module.exports = sequelize;
