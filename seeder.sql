-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS sazon;

-- Usar la base de datos creada
USE sazon;

-- Crear la tabla users con todos los campos incluyendo password
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar registros de prueba con passwords
INSERT INTO users (name, email, password) VALUES
    ('juanperez', 'juan@example.com', 'password123'),
    ('mariag', 'maria.garcia@example.com', 'securepass456'),
    ('carlos123', 'carlos.r@example.com', 'carlospass789'),
    ('ana_m', 'ana.martinez@example.com', 'anapass321');

-- Crear la tabla CategoriaProducto
CREATE TABLE IF NOT EXISTS CategoriaProducto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar categorías de producto (dulces)
INSERT INTO CategoriaProducto (nombre, descripcion) VALUES
    ('Chocolates', 'Productos de chocolate de diferentes tipos'),
    ('Gomitas', 'Gomitas dulces, ácidas y de sabores variados'),
    ('Caramelos', 'Caramelos duros y blandos'),
    ('Paletas', 'Paletas de sabores y colores variados');

-- Crear la tabla Producto
CREATE TABLE IF NOT EXISTS Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    categoriaId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoriaId) REFERENCES CategoriaProducto(id) ON DELETE CASCADE
);

-- Insertar productos de ejemplo
INSERT INTO Producto (nombre, descripcion, precio, categoriaId) VALUES
    ('Chocolate Amargo 70%', 'Barra de chocolate oscuro', 25.50, 1),
    ('Gomitas de Osito', 'Gomitas de frutas con forma de osito', 15.00, 2),
    ('Caramelo de Menta', 'Caramelo refrescante sabor menta', 10.00, 3),
    ('Paleta de Fresa', 'Paleta sabor fresa con relleno líquido', 12.00, 4);
