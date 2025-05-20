import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './User.model.js';
import Producto from './Product.model.js';

const Compras = sequelize.define('compras', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    peso: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 1.00, // Valor por defecto de 1.00 kg
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'compras', // Nombre exacto de la tabla en la base de datos
    timestamps: true, // Sequelize manejará createdAt y updatedAt automáticamente
  });

// Relaciones
// Un carrito pertenece a un usuario
Compras.belongsTo(User, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  
  // Un usuario tiene muchos registros en el carrito
  User.hasMany(Compras, {
    foreignKey: 'userId',
  });
  
  // Un carrito pertenece a un producto
  Compras.belongsTo(Producto, {
    foreignKey: {
      name: 'productoId',
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  
  // Un producto puede estar en muchos registros del carrito
  Producto.hasMany(Compras, {
    foreignKey: 'productoId',
  });
  
  export default Compras;