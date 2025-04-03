import mysql from 'mysql2';
import { DB_HOST, DB_PASSWORD, DB_USER } from './src/config.js';
import bcrypt from 'bcryptjs';

// Configuración de conexión a la base de datos
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD, 
  multipleStatements: true, //Permite ejecutar múltiples sentencias SQL en una sola consulta
});

// El script SQL que deseas ejecutar
const sqlScript = `
  -- Eliminar la base de datos si ya existe
  DROP DATABASE IF EXISTS sazon;

  -- Crear la base de datos
  CREATE DATABASE IF NOT EXISTS sazon;

  -- Usar la base de datos creada
  USE sazon;

  -- Crear la tabla users con todos los campos incluyendo password
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  -- Crear la tabla CategoriaProducto
  CREATE TABLE IF NOT EXISTS CategoriaProductos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  -- Crear la tabla Producto
  CREATE TABLE IF NOT EXISTS Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    categoriaId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoriaId) REFERENCES CategoriaProductos(id) ON DELETE CASCADE
  );
`;

// Función para encriptar contraseñas usando bcrypt
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generar un "sal" de 10 rondas
  return bcrypt.hash(password, salt); // Retornar la contraseña encriptada
};

// Usuarios de ejemplo con contraseñas
const users = [
  { name: 'juanperez', email: 'juan@example.com', password: 'password123', role: 'administrador' },
  { name: 'mariag', email: 'maria.garcia@example.com', password: 'securepass456', role: 'cliente' },
  { name: 'carlos123', email: 'carlos.r@example.com', password: 'carlospass789', role: 'cliente' },
  { name: 'ana_m', email: 'ana.martinez@example.com', password: 'anapass321', role: 'cliente' },
];

// Categorías de productos de ejemplo
const categorias = [
  { nombre: 'Chocolates', descripcion: 'Productos de chocolate de diferentes tipos' },
  { nombre: 'Gomitas', descripcion: 'Gomitas dulces, ácidas y de sabores variados' },
  { nombre: 'Caramelos', descripcion: 'Caramelos duros y blandos' },
  { nombre: 'Paletas', descripcion: 'Paletas de sabores y colores variados' },
];

// Productos de ejemplo
const productos = [
  { nombre: 'Chocolate Amargo 70%', descripcion: 'Barra de chocolate oscuro', precio: 25.50, categoriaId: 1 },
  { nombre: 'Gomitas de Osito', descripcion: 'Gomitas de frutas con forma de osito', precio: 15.00, categoriaId: 2 },
  { nombre: 'Caramelo de Menta', descripcion: 'Caramelo refrescante sabor menta', precio: 10.00, categoriaId: 3 },
  { nombre: 'Paleta de Fresa', descripcion: 'Paleta sabor fresa con relleno líquido', precio: 12.00, categoriaId: 4 },
];

// Función para insertar usuarios con contraseñas encriptadas
const insertUsers = async () => {
  let userInsertSQL = '';

  // Encriptar las contraseñas de los usuarios y preparar la inserción en SQL
  for (const user of users) {
    const hashedPassword = await hashPassword(user.password);
    userInsertSQL += `INSERT INTO users (name, email, password, role) VALUES 
      ('${user.name}', '${user.email}', '${hashedPassword}', '${user.role}');\n`;
  }

  return userInsertSQL;
};

// Función para insertar las categorías de productos
const insertCategorias = () => {
  let categoriaInsertSQL = '';
  
  categorias.forEach((categoria) => {
    categoriaInsertSQL += `INSERT INTO CategoriaProductos (nombre, descripcion) VALUES 
      ('${categoria.nombre}', '${categoria.descripcion}');\n`;
  });

  return categoriaInsertSQL;
};

// Función para insertar los productos
const insertProductos = () => {
  let productoInsertSQL = '';

  productos.forEach((producto) => {
    productoInsertSQL += `INSERT INTO Productos (nombre, descripcion, precio, categoriaId) VALUES 
      ('${producto.nombre}', '${producto.descripcion}', ${producto.precio}, ${producto.categoriaId});\n`;
  });

  return productoInsertSQL;
};

// Ejecutar el script SQL
connection.connect(async (err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }

  console.log('Conexión exitosa a la base de datos.');

  try {
    // Obtener las consultas para insertar los usuarios, categorías y productos
    const userInsertSQL = await insertUsers();
    const categoriaInsertSQL = insertCategorias();
    const productoInsertSQL = insertProductos();

    // Ejecutar el script SQL (con las inserciones de los usuarios, categorías y productos)
    connection.query(sqlScript + userInsertSQL + categoriaInsertSQL + productoInsertSQL, (error, results) => {
      if (error) {
        console.error('Error al ejecutar el script SQL:', error);
      } else {
        console.log('Script SQL ejecutado con éxito.');
      }

      // Cerrar la conexión
      connection.end();
    });
  } catch (error) {
    console.error('Error al encriptar las contraseñas:', error);
    connection.end();
  }
});