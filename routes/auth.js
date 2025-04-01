const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const usuarioFalso = {
  username: 'admin',
  password: '1234'
};

const SECRET_KEY = 'mi_clave_secreta';

router.post('/login', (req, res) => {
  console.log(req.body); // para depurar

  const { username, password } = req.body;

  if (username === usuarioFalso.username && password === usuarioFalso.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

module.exports = router;