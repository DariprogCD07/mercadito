import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

let nextId = 4;
let products = [
  { id: 1, name: 'Auriculares', category: 'Tecnología', price: 42999, stock: 12 },
  { id: 2, name: 'Botella térmica', category: 'Hogar', price: 15900, stock: 20 },
  { id: 3, name: 'Cuaderno', category: 'Papelería', price: 6900, stock: 35 }
];

app.get('/', (_req, res) => res.json({ message: 'API de productos funcionando', endpoints: ['/api/products', '/api/products/:id'] }));
app.get('/api/products', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const category = String(req.query.category || '').toLowerCase();
  const result = products.filter(p => p.name.toLowerCase().includes(q) && (!category || p.category.toLowerCase() === category));
  res.json({ count: result.length, data: result });
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});
app.post('/api/products', (req, res) => {
  const { name, category, price, stock = 0 } = req.body;
  if (typeof name !== 'string' || !name.trim() || typeof category !== 'string' || !category.trim() || !Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({ error: 'Enviá name y category como texto, price como número positivo y stock como entero no negativo.' });
  }
  const product = { id: nextId++, name: name.trim(), category: category.trim(), price, stock };
  products.push(product);
  res.status(201).json(product);
});
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  const { name, category, price, stock } = req.body;
  if (name !== undefined && (typeof name !== 'string' || !name.trim())) return res.status(400).json({ error: 'name debe ser texto no vacío.' });
  if (category !== undefined && (typeof category !== 'string' || !category.trim())) return res.status(400).json({ error: 'category debe ser texto no vacío.' });
  if (price !== undefined && (!Number.isFinite(price) || price < 0)) return res.status(400).json({ error: 'price debe ser un número no negativo.' });
  if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) return res.status(400).json({ error: 'stock debe ser un entero no negativo.' });
  products[index] = { ...products[index], ...req.body, id: products[index].id };
  res.json(products[index]);
});
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  const [deleted] = products.splice(index, 1);
  res.json({ message: 'Producto eliminado', data: deleted });
});
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});
app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));
