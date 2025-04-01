const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const gastosRoutes = require('./routes/gastos');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/gastos', gastosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});