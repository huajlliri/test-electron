const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize"); // Ruta correcta a tu archivo sequelize.js

const Cliente = sequelize.define(
  "Cliente",
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Cliente;
