import CategoriaProducto from '../models/CategoriaProducto.model.js';

export const getAllCategories = async (req, res) => {
  try {
    const categorias = await CategoriaProducto.findAll({
      attributes: ['id', 'nombre'], // puedes agregar 'descripcion' si también la necesitas
    });
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error.message);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};
