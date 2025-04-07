import Producto from '../models/Product.model.js';
import CategoriaProducto from '../models/CategoriaProducto.model.js';
import fs from "fs";
import path from "path";

export const getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: {
        model: CategoriaProducto,
        attributes: ['id', 'nombre'], // Traer solo los campos necesarios de la categoría
      },
    });

    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, categoriaId } = req.body;

    // Verificar campos básicos
    if (!nombre || !precio || !descripcion || !categoriaId) {
      return res.status(400).json({ message: 'Faltan campos necesarios' });
    }

    // Validar que se haya enviado una imagen
    if (!req.file) {
      return res.status(400).json({ message: 'La imagen es obligatoria.' });
    }

    // Construir ruta de la imagen
    const imagen = `/uploads/products/${req.file.filename}`;

    // Crear el producto con imagen incluida
    const nuevoProducto = await Producto.create({
      nombre,
      precio,
      descripcion,
      categoriaId,
      imagen,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

export const editProducto = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL
    const { nombre, precio, descripcion, categoriaId } = req.body; // Obtener los datos del producto a actualizar

    // Verificar que los campos necesarios estén presentes
    if (!nombre && !precio && !descripcion && !categoriaId) {
      return res.status(400).json({ message: 'No hay datos para actualizar' });
    }

    // Buscar el producto en la base de datos por su ID
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar los campos que han sido enviados en el cuerpo de la solicitud
    await producto.update({
      nombre: nombre || producto.nombre,
      precio: precio || producto.precio,
      descripcion: descripcion || producto.descripcion,
      categoriaId: categoriaId || producto.categoriaId,
    });

    // Enviar la respuesta con el producto actualizado
    res.json(producto);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL

    // Buscar el producto por ID
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Eliminar el producto
    await producto.destroy();

    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};

export const getProducto = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del producto desde los parámetros de la URL

    // Buscar el producto por ID
    const producto = await Producto.findByPk(id, {
      include: {
        model: CategoriaProducto,
        attributes: ['id', 'nombre'], // Traer solo los campos necesarios de la categoría
      },
    });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Enviar el producto como respuesta
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};
