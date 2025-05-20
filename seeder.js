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

  -- Crear la tabla Carrito
  CREATE TABLE IF NOT EXISTS carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    productoId INT NOT NULL,
    peso DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (productoId) REFERENCES Productos(id) ON DELETE CASCADE
  );

    -- Crear la tabla Compras
  CREATE TABLE IF NOT EXISTS compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    productoId INT NOT NULL,
    peso DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (productoId) REFERENCES Productos(id) ON DELETE CASCADE
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
    name: "Fernanda Jeronimo",
    email: "fernanda@gmail.com",
    password: "123456789",
    role: "administrador",
  },
  {
    name: "Fernando Giron",
    email: "fernando@gmail.com",
    password: "123456789",
    role: "cliente",
  },
  {
    name: "Yamileth Ramos",
    email: "yamileth@gmail.com",
    password: "123456789",
    role: "cliente",
  },
  {
    name: "Gloria Luna",
    email: "gloria@gmail.com",
    password: "123456789",
    role: "cliente",
  },
  {
    name: "Michel Mendoza",
    email: "michel@gmail.com",
    password: "123456789",
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
    precio: 128.0,
    categoriaId: 1,
    imagen: '/uploads/products/mangomitas.jpg',
  },
  {
    nombre: "Lunetas",
    descripcion:
      "Los caramelos blandos son un dulce único compuesto de gelatina, edulcorantes, aromatizantes y colorantes.",
    precio: 160.0,
    categoriaId: 1,
    imagen: '/uploads/products/lunetas.jpg',
  },
  {
    nombre: "Gomitas",
    descripcion:
      "Los caramelos blandos son un dulce único compuesto de gelatina, edulcorantes, aromatizantes y colorantes.",
    precio: 128.0,
    categoriaId: 1,
    imagen: '/uploads/products/gomitas.jpg',
  },
  {
    nombre: "Gomitas lombrices (mix)",
    descripcion:
      "Divertidas lombrices de suave gomita con sabor agridulce, a los niños les encantan.",
    precio: 128.0,
    categoriaId: 1,
    imagen: '/uploads/products/gomitas-lombrices-mix.jpg',
  },
  {
    nombre: "Ositos",
    descripcion:
      "Los caramelos blandos son un dulce único compuesto de gelatina, edulcorantes, aromatizantes y colorantes.",
    precio: 144.0,
    categoriaId: 1,
    imagen: '/uploads/products/ositos.jpg',
  },
  {
    nombre: "Pasas con chocolate",
    descripcion:
      "Los caramelos blandos son un dulce único compuesto de gelatina, edulcorantes, aromatizantes y colorantes.",
    precio: 176.0,
    categoriaId: 1,
    imagen: '/uploads/products/pasas-con-chocolate.jpg',
  },
  {
    nombre: "Chicharrines",
    descripcion: "Botana frita hecha de maíz de alta calidad y frescura.",
    precio: 160.0,
    categoriaId: 2,
    imagen: '/uploads/products/chicharrines.jpg',
  },
  {
    nombre: "Cacahuate salado",
    descripcion:
      "Prueba nuestras delicioso cacahuate con un toque de sal; son una botana que conquista con su sabor.",
    precio: 112.0,
    categoriaId: 2,
    imagen: '/uploads/products/cacahuate-salado.jpg',
  },
  {
    nombre: "Pistache",
    descripcion:
      "El pistache contiene nutrientes como las vitaminas B9, B3, E y A. Además de estas propiedades, el pistacho tostado salado contienen hierro y potasio.",
    precio: 144.0,
    categoriaId: 2,
    imagen: '/uploads/products/pistache.jpg',
  },
  {
    nombre: "Churritos enchilados",
    descripcion:
      "Deliciosos churritos enchilados perfectos para disfrutarlos en un momento de descanso o con una buena compañía.",
    precio: 144.0,
    categoriaId: 2,
    imagen: '/uploads/products/churritos-enchilados.jpg',
  },
  {
    nombre: "Palomitas",
    descripcion:
      "Prueba nuestras deliciosas palomitas con un toque de sal; son una botana que conquista con su sabor.",
    precio: 128.0,
    categoriaId: 2,
    imagen: '/uploads/products/palomitas.jpg',
  },
  {
    nombre: "Papas botana",
    descripcion:
      "Prueba nuestras deliciosas papas con un toque de sal; son una botana que conquista con su sabor.",
    precio: 160.0,
    categoriaId: 2,
    imagen: '/uploads/products/papas-botana.jpg',
  },
  {
    nombre: "Cacahuates enchilados",
    descripcion:
      "Prueba nuestras deliciosos cacahuates enchilados con un toque de chile; son una botana que conquista con su sabor.",
    precio: 112.0,
    categoriaId: 2,
    imagen: '/uploads/products/cacahuates-enchilados.jpg',
  },
  {
    nombre: "Coco rayado",
    descripcion:
      "Delicioso coco deshidratado y rayado rico en fibra, minerales y vitaminas muy utilzado para ensaladas y postres, usalo para acompañar cerelaes, fruta o yogurt.",
    precio: 192.0,
    categoriaId: 3,
    imagen: '/uploads/products/coco-rayado.jpg',
  },
  {
    nombre: "Arandano",
    descripcion:
      "Son una rica fuente de antioxidantes; un excelente snack a cualquier hora. También añádelos a tus ensaladas, cereal, sándwiches y postres. En tus reuniones, combínalos con cacahuates y otras semillas para tener una botana saludable y deliciosa.",
    precio: 160.0,
    categoriaId: 3,
    imagen: '/uploads/products/arandano.jpg',
  },
  {
    nombre: "Botana mixta especial",
    descripcion:
      "Deliciosa combinación de frutas deshidratadas, son el snack ideal para compartir en tus reuniones, en el trabajo o posterior a realizar ejercicio.",
    precio: 144.0,
    categoriaId: 3,
    imagen: '/uploads/products/botana-mixta-especial.jpg',
  },
  {
    nombre: "Avena",
    descripcion:
      "Es una excelente fuente de minerales, proteínas y vitamina C. Puedes incorporarlo en variedad de bebidas, licuados, salsas, guisados, etc. Además es un aliado para prevenir inflamación, diabetes, y paros cardiacos.",
    precio: 144.0,
    categoriaId: 3,
    imagen: '/uploads/products/avena.jpg',
  },
  {
    nombre: "Nuez de la India",
    descripcion:
      "Esta nuez en forma de riñón tiene un delicado sabor y aroma disfrútala como botana pues además de deliciosa es rica en ácidos grasos omega 3 que ayudan a la salud de tu corazón.",
    precio: 192.0,
    categoriaId: 3,
    imagen: '/uploads/products/nuez-de-la-india.jpg',
  },
  {
    nombre: "Jamaica",
    descripcion:
      "Ideal para preparar agua fresca o como aditivo en una variedad de platillos. Ayuda a reducir el colesterol y la presión arterial.",
    precio: 160.0,
    categoriaId: 3,
    imagen: '/uploads/products/jamaica.jpg',
  },
  {
    nombre: "Alegrias de sabores",
    descripcion:
      "Dulce hecho de amaranto, pepitas de calabaza, nuez, cacahuate, pasas, piloncillo y miel.",
    precio: 176.0,
    categoriaId: 3,
    imagen: '/uploads/products/alegrias-de-sabores.jpg',
  },
  {
    nombre: "Cacahuate horneado",
    descripcion:
      "El cacahuate tiene varios beneficios para la salud, como ayudar a disminuir la inflamación en el cuerpo y proteger al corazón, previniendo enfermedades cardiovasculares, como la aterosclerosis.",
    precio: 128.0,
    categoriaId: 3,
    imagen: '/uploads/products/cacahuate-horneado.jpg',
  },
  {
    nombre: "Nuez entera",
    descripcion:
      "Favorece los sistemas cardiovascular, nervioso, digestivo y reproductivo, y mejora el sueño y la memoria.",
    precio: 144.0,
    categoriaId: 3,
    imagen: '/uploads/products/nuez-entera.jpg',
  },
  {
    nombre: "Almendras",
    descripcion:
      "Son ricas en grasas insaturadas y también contienen 3.5 g de ácido linoleico por porción de 28 g, lo que ayuda a mantener los niveles normales de colesterol en la sangre.",
    precio: 160.0,
    categoriaId: 3,
    imagen: '/uploads/products/almendras.jpg',
  },
  {
    nombre: "Chile de arbol",
    descripcion: "Chile de árbol picoso; árbol extra picoso.",
    precio: 160.0,
    categoriaId: 4,
    imagen: '/uploads/products/chile-de-arbol.jpg',
  },
  {
    nombre: "Arroz",
    descripcion:
      "El arroz es una excelente fuente de vitaminas y minerales como niacina, vitamina D, calcio, fibra, hierro, tiamina y riboflavina.",
    precio: 32.0,
    categoriaId: 4,
    imagen: '/uploads/products/arroz.jpg',
  },
  {
    nombre: "Granos molidos",
    descripcion:
      "Es una excelente fuente de minerales, proteínas y vitamina C. Puedes incorporarlo en variedad de bebidas, licuados, salsas, guisados, etc. Además es un aliado para prevenir inflamación, diabetes, y paros cardiacos.",
    precio: 80.0,
    categoriaId: 4,
    imagen: '/uploads/products/granos-molidos.jpg',
  },
  {
    nombre: "Chile mora",
    descripcion:
      "Esta variedad de chile seco, picante y de color oscuro, deja un sabor delicioso en salsas, adobos y moles.",
    precio: 64.0,
    categoriaId: 4,
    imagen: '/uploads/products/chile-mora.jpg',
  },
  {
    nombre: "Guajillo extra grande",
    descripcion:
      "Es uno de los chiles secos más utilizados, en fresco se le conoce como mirasol, es de color rojo oscuro y su picor varía de poco a medianamente fuerte, es muy utilizado por su sabor para salsas y guisos.",
    precio: 64.0,
    categoriaId: 4,
    imagen: '/uploads/products/guajillo-extra-grande.jpg',
  },
  {
    nombre: "Ajonjilí",
    descripcion:
      "Es una excelente fuente de minerales, proteínas y vitamina C. Puedes incorporarlo en variedad de bebidas, licuados, salsas, guisados, etc. Además es un aliado para prevenir inflamación, diabetes, y paros cardiacos.",
    precio: 48.0,
    categoriaId: 4,
    imagen: '/uploads/products/ajonjoli.jpg',
  },
  {
    nombre: "Pimienta molida",
    descripcion:
      "La pimienta estimula los enzimas digestivos pancreáticos e intestinales, mejorando la digestión: ayuda en el vaciado gástrico y al ser una especia carminativa ayuda a eliminar los gases.",
    precio: 64.0,
    categoriaId: 4,
    imagen: '/uploads/products/pimienta-molida.jpg',
  },
  {
    nombre: "Canela molida",
    descripcion:
      "Los beneficios para la salud que tienen que ver con su carácter antioxidante gracias a su contenido en flavonoides (catequinas).",
    precio: 80.0,
    categoriaId: 4,
    imagen: '/uploads/products/canela-molida.jpg',
  },
];

// Ejemplo de datos para la tabla carrito
const carritoData = [
  { userId: 2, productoId: 1, peso: 1.5 }, // María López añade 1.5 kg de Mangomitas
  { userId: 2, productoId: 3, peso: 0.8 }, // María López añade 0.8 kg de Chicharrines
  { userId: 3, productoId: 5, peso: 2.0 }, // Carlos Díaz añade 2.0 kg de Coco rayado
  { userId: 3, productoId: 7, peso: 0.3 }, // Carlos Díaz añade 0.3 kg de Chile de árbol
];

const comprasData = [
  { userId: 2, productoId: 1, peso: 1.5 }, // María compró 1.5 kg de Mangomitas
  { userId: 3, productoId: 5, peso: 2.5 }, // Carlos compró 2.0 kg de Coco rayado
  { userId: 2, productoId: 3, peso: 0.5 }, // María compró 0.8 kg de Chicharrines
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

// Función para insertar datos en la tabla carrito
const insertCarrito = () => {
  let carritoInsertSQL = "";

  carritoData.forEach((item) => {
    carritoInsertSQL += `INSERT INTO carrito (userId, productoId, peso) VALUES 
      (${item.userId}, ${item.productoId}, ${item.peso});\n`;
  });

  return carritoInsertSQL;
};

const insertCompras = () => {
  let comprasInsertSQL = "";

  comprasData.forEach((compra) => {
    comprasInsertSQL += `INSERT INTO compras (userId, productoId, peso) VALUES 
      (${compra.userId}, ${compra.productoId}, ${compra.peso});\n`;
  });

  return comprasInsertSQL;
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
    const carritoInsertSQL = insertCarrito();
    const comprasInsertSQL = insertCompras();

    // Ejecutar el script SQL (con las inserciones de los usuarios, categorías y productos)
    connection.query(
      sqlScript + userInsertSQL + categoriaInsertSQL + productoInsertSQL + carritoInsertSQL + comprasInsertSQL,
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
