import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import CategoriaProducto from './CategoriaProducto.js';

const Producto = sequelize.define('Producto', {
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
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Relación: Un producto pertenece a una categoría
Producto.belongsTo(CategoriaProducto, {
  foreignKey: {
    name: 'categoriaId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

// Una categoría tiene muchos productos
CategoriaProducto.hasMany(Producto, {
  foreignKey: 'categoriaId',
});

export default Producto;
