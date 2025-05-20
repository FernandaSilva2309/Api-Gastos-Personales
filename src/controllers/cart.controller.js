import Carrito from "../models/Carrito.model.js";
import Producto from "../models/Product.model.js";
import User from '../models/User.model.js';

export const getCarritoByUserId = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del usuario desde los parámetros de la URL

    // Buscar todos los registros en el carrito que pertenezcan al usuario
    const carrito = await Carrito.findAll({
      where: { userId: id }, // Filtrar por el ID del usuario
      include: [
        {
          model: Producto,
          attributes: ["id", "nombre", "descripcion", "precio", "imagen"], // Campos del producto que queremos incluir
        },
      ],
    });

    // Si el carrito está vacío o no hay registros para el usuario
    if (!carrito || carrito.length === 0) {
      return res
        .status(404)
        .json({ message: "Carrito vacio, agrega un producto" });
    }

    // Enviar los registros del carrito como respuesta
    res.json(carrito);
  } catch (error) {
    console.error("Error al obtener el carrito del usuario:", error);
    res
      .status(500)
      .json({ message: "Error al obtener el carrito del usuario" });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { iduser, idproducto } = req.params;
    const { peso } = req.body;

    // Asegurarnos de que peso sea un número
    const pesoNumber = parseFloat(peso);
    if (isNaN(pesoNumber)) {
      return res.status(400).json({ message: 'El peso debe ser un número válido' });
    }

    // Verificar que el usuario existe
    const user = await User.findByPk(iduser);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar que el producto existe
    const producto = await Producto.findByPk(idproducto);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Buscar si el producto ya está en el carrito del usuario
    let carritoItem = await Carrito.findOne({
      where: {
        userId: iduser,
        productoId: idproducto,
      },
    });

    if (carritoItem) {
      // Si el producto ya está en el carrito, reemplazar el peso con el nuevo valor
      carritoItem.peso = pesoNumber; // Reemplazar en lugar de sumar
      await carritoItem.save();
      return res.status(200).json({ message: 'Peso actualizado en el carrito', carritoItem });
    } else {
      // Si el producto no está en el carrito, crear un nuevo registro
      carritoItem = await Carrito.create({
        userId: iduser,
        productoId: idproducto,
        peso: pesoNumber,
      });
      return res.status(201).json({ message: 'Producto agregado al carrito', carritoItem });
    }
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ message: 'Error al agregar producto al carrito', details: error.message });
  }
};

// Controlador para eliminar un producto del carrito
export const deleteProductFromCart = async (req, res) => {
    try {
      const { iduser, idproducto } = req.params;
  
      // Verificar que el usuario existe
      const user = await User.findByPk(iduser);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Verificar que el producto existe
      const producto = await Producto.findByPk(idproducto);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Buscar el registro en el carrito
      const carritoItem = await Carrito.findOne({
        where: {
          userId: iduser,
          productoId: idproducto,
        },
      });
  
      // Si no se encuentra el registro, devolver un 404
      if (!carritoItem) {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito del usuario' });
      }
  
      // Eliminar el registro del carrito
      await carritoItem.destroy();
  
      // Devolver una respuesta exitosa
      return res.status(200).json({ message: 'Producto eliminado del carrito correctamente' });
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      res.status(500).json({ message: 'Error al eliminar producto del carrito', details: error.message });
    }
  };