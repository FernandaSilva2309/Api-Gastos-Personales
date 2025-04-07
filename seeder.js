import mysql from "mysql2";
import { DB_HOST, DB_PASSWORD, DB_USER } from "./src/config.js";
import bcrypt from "bcryptjs";

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
    imagen VARCHAR(255),
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
  {
    name: "Juan Perez",
    email: "juan@example.com",
    password: "password123",
    role: "administrador",
  },
  {
    name: "Maria Lopez",
    email: "maria.garcia@example.com",
    password: "securepass456",
    role: "cliente",
  },
  {
    name: "Calos Diaz",
    email: "carlos.r@example.com",
    password: "carlospass789",
    role: "cliente",
  },
  {
    name: "Fernanda Sanchez",
    email: "ana.martinez@example.com",
    password: "fer123456",
    role: "administrador",
  },
];

// Categorías de productos de ejemplo
const categorias = [
  {
    nombre: "Dulces",
    descripcion:
      "Una aventura de sabor y diversión con nuestra variedad de dulces, encuentra el tuyo y llévate la cantidad que necesites.",
  },
  {
    nombre: "Botanas",
    descripcion:
      "La botana perfecta para momentos especiales, encuentra tu favorita y llévate la cantidad que necesites.",
  },
  {
    nombre: "Saludables",
    descripcion:
      "Ponle todo el sazón a tus super alimentos, cuidarte nunca fue tan sabroso.",
  },
  {
    nombre: "Ingredientes",
    descripcion:
      "Encuentra todo los ingredientes para tus recetas de cocina y llévate la cantidad que necesitas.",
  },
];

// Productos de ejemplo
const productos = [
  {
    nombre: "Mangomitas",
    descripcion:
      "Deliciosas gomitas de almidón sabor mango, con rica cubierta picosita.",
    precio: 16.0,
    categoriaId: 1,
    imagen: '/uploads/products/mangomitas.jpg',
  },
  {
    nombre: "Lunetas",
    descripcion:
      "Los caramelos blandos son un dulce único compuesto de gelatina, edulcorantes, aromatizantes y colorantes.",
    precio: 20.0,
    categoriaId: 1,
    imagen: '/uploads/products/lunetas.jpg',
  },
  {
    nombre: "Chicharrines",
    descripcion: "Botana frita hecha de maíz de alta calidad y frescura.",
    precio: 18.0,
    categoriaId: 2,
    imagen: '/uploads/products/chicharrines.jpg',
  },
  {
    nombre: "Cacahuate salado",
    descripcion:
      "Prueba nuestras delicioso cacahuate con un toque de sal; son una botana que conquista con su sabor.",
    precio: 14.0,
    categoriaId: 2,
    imagen: '/uploads/products/cacahuate-salado.jpg',
  },
  {
    nombre: "Coco rayado",
    descripcion:
      "Delicioso coco deshidratado y rayado rico en fibra, minerales y vitaminas muy utilzado para ensaladas y postres, usalo para acompañar cerelaes, fruta o yogurt.",
    precio: 22.0,
    categoriaId: 3,
    imagen: '/uploads/products/coco-rayado.jpg',
  },
  {
    nombre: "Arandano",
    descripcion:
      "Son una rica fuente de antioxidantes; un excelente snack a cualquier hora. También añádelos a tus ensaladas, cereal, sándwiches y postres. En tus reuniones, combínalos con cacahuates y otras semillas para tener una botana saludable y deliciosa.o",
    precio: 24.0,
    categoriaId: 3,
    imagen: '/uploads/products/arandano.jpg',
  },
  {
    nombre: "Chile de arbol",
    descripcion: "Chile de árbol picoso; árbol extra picoso.",
    precio: 16.0,
    categoriaId: 4,
    imagen: '/uploads/products/chile-de-arbol.jpg',
  },
  {
    nombre: "Arroz",
    descripcion:
      "El arroz es una excelente fuente de vitaminas y minerales como niacina, vitamina D, calcio, fibra, hierro, tiamina y riboflavina.",
    precio: 14.0,
    categoriaId: 4,
    imagen: '/uploads/products/arroz.jpg',
  },
];

// Función para insertar usuarios con contraseñas encriptadas
const insertUsers = async () => {
  let userInsertSQL = "";

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
  let categoriaInsertSQL = "";

  categorias.forEach((categoria) => {
    categoriaInsertSQL += `INSERT INTO CategoriaProductos (nombre, descripcion) VALUES 
      ('${categoria.nombre}', '${categoria.descripcion}');\n`;
  });

  return categoriaInsertSQL;
};

// Función para insertar los productos
const insertProductos = () => {
  let productoInsertSQL = "";

  productos.forEach((producto) => {
    productoInsertSQL += `INSERT INTO Productos (nombre, descripcion, precio, categoriaId, imagen) VALUES 
      ('${producto.nombre}', '${producto.descripcion}', ${producto.precio}, ${producto.categoriaId}, '${producto.imagen}');\n`;
  });

  return productoInsertSQL;
};

// Ejecutar el script SQL
connection.connect(async (err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err.stack);
    return;
  }

  console.log("Conexión exitosa a la base de datos.");

  try {
    // Obtener las consultas para insertar los usuarios, categorías y productos
    const userInsertSQL = await insertUsers();
    const categoriaInsertSQL = insertCategorias();
    const productoInsertSQL = insertProductos();

    // Ejecutar el script SQL (con las inserciones de los usuarios, categorías y productos)
    connection.query(
      sqlScript + userInsertSQL + categoriaInsertSQL + productoInsertSQL,
      (error, results) => {
        if (error) {
          console.error("Error al ejecutar el script SQL:", error);
        } else {
          console.log("Script SQL ejecutado con éxito.");
        }

        // Cerrar la conexión
        connection.end();
      }
    );
  } catch (error) {
    console.error("Error al encriptar las contraseñas:", error);
    connection.end();
  }
});
