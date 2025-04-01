const express = require('express');
const router = express.Router();
const db = require('../data/db');
const verificarToken = require('../middleware/auth');

router.get('/', verificarToken, (req, res) => {
  res.json(db.getAll());
});

router.get('/test', (req, res) => {
    res.send('Hola, mundo');
});

router.get('/prueba', (req, res) => {
  res.send('Esto es una prueba random');
});

router.post('/', verificarToken, (req, res) => {
  const nuevoGasto = db.add(req.body);
  res.status(201).json(nuevoGasto);
});

router.delete('/:id', verificarToken, (req, res) => {
  const id = parseInt(req.params.id);
  db.delete(id);
  res.status(204).send();
});

router.put('/:id', verificarToken, (req, res) => {
  const id = parseInt(req.params.id);
  db.update(id, req.body);
  res.status(200).json({ mensaje: 'Gasto actualizado' });
});

module.exports = router;
