import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const CategoriaProducto = sequelize.define('CategoriaProducto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default CategoriaProducto;
