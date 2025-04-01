let gastos = [];

module.exports = {
  getAll: () => gastos,
  add: (gasto) => {
    gasto.id = Date.now();
    gastos.push(gasto);
    return gasto;
  },
  delete: (id) => {
    gastos = gastos.filter(g => g.id !== id);
  },
  update: (id, nuevoGasto) => {
    gastos = gastos.map(g => (g.id === id ? { ...g, ...nuevoGasto } : g));
  }
};