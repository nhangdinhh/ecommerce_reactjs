

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/images', express.static('public/images'));

let products = [
  { id: 1, name: 'Laptop Legion 5 Pro', price: 800, stock: 10, category: 'Electronics', image: '/images/product1.jpg' },
  { id: 2, name: 'Shirt SKT T1', price: 50, stock: 20, category: 'Clothing', image: '/images/product2.jpg' },
  { id: 3, name: 'Seiko Watch', price: 150, stock: 15, category: 'Accessories', image: '/images/product3.jpg' },
  { id: 4, name: 'iPhone 14 Pro', price: 600, stock: 8, category: 'Electronics', image: '/images/product4.jpg' },
  { id: 5, name: 'Nike Running Shoes', price: 80, stock: 12, category: 'Clothing', image: '/images/product5.jpg' },
  { id: 6, name: 'Levi\'s Jeans', price: 40, stock: 30, category: 'Clothing', image: '/images/product6.jpg' },
  { id: 7, name: 'Baseball Cap', price: 25, stock: 50, category: 'Accessories', image: '/images/product7.jpg' },
  { id: 8, name: 'Ray-Ban Sunglasses', price: 70, stock: 40, category: 'Accessories', image: '/images/product8.jpg' },
  { id: 9, name: 'Samsung Galaxy Tab', price: 250, stock: 5, category: 'Electronics', image: '/images/product9.jpg' },
  { id: 10, name: 'Canon DSLR Camera', price: 450, stock: 7, category: 'Electronics', image: '/images/product10.jpg' },
  { id: 11, name: 'Bose Headphones', price: 100, stock: 25, category: 'Accessories', image: '/images/product11.jpg' },
  { id: 12, name: 'Herschel Backpack', price: 70, stock: 18, category: 'Bags', image: '/images/product12.jpg' },
  { id: 13, name: 'Apple Watch', price: 150, stock: 22, category: 'Electronics', image: '/images/product13.jpg' },
  { id: 14, name: 'JBL Bluetooth Speaker', price: 60, stock: 14, category: 'Electronics', image: '/images/product14.jpg' },
  { id: 15, name: 'Epson Projector', price: 300, stock: 6, category: 'Electronics', image: '/images/product15.jpg' },
  { id: 16, name: 'Mechanical Keyboard', price: 120, stock: 11, category: 'Accessories', image: '/images/product16.jpg' },
  { id: 17, name: 'Dell Monitor', price: 200, stock: 9, category: 'Electronics', image: '/images/product17.jpg' },
  { id: 18, name: 'Logitech Mouse', price: 30, stock: 35, category: 'Accessories', image: '/images/product18.jpg' },
  { id: 19, name: 'Gaming Mouse Pad', price: 10, stock: 60, category: 'Accessories', image: '/images/product19.jpg' },
  { id: 20, name: 'HP Printer', price: 150, stock: 10, category: 'Electronics', image: '/images/product20.jpg' },
  { id: 21, name: 'Surgical Mask', price: 5, stock: 100, category: 'Health & Beauty', image: '/images/product21.jpg' },
  { id: 22, name: 'Dyson Fan', price: 45, stock: 8, category: 'Home Appliances', image: '/images/product22.jpg' },
  { id: 23, name: 'IELTS Book', price: 20, stock: 25, category: 'Books', image: '/images/product23.jpg' },
  { id: 24, name: 'USB-C Charging Cable', price: 15, stock: 40, category: 'Electronics', image: '/images/product24.jpg' },
  { id: 25, name: 'Philips Rice Cooker', price: 60, stock: 10, category: 'Home Appliances', image: '/images/product25.jpg' },
  { id: 26, name: 'Soccer Ball', price: 10, stock: 35, category: 'Sports', image: '/images/product26.jpg' },
  { id: 27, name: 'Electric Kettle', price: 25, stock: 15, category: 'Home Appliances', image: '/images/product27.jpg' },
  { id: 28, name: 'MAC Lipstick', price: 20, stock: 50, category: 'Health & Beauty', image: '/images/product28.jpg' },
  { id: 29, name: 'Leather Handbag', price: 50, stock: 20, category: 'Bags', image: '/images/product29.jpg' },
  { id: 30, name: 'Fishing Rod', price: 75, stock: 12, category: 'Sports', image: '/images/product30.jpg' },
  { id: 31, name: 'Non-stick Pan', price: 35, stock: 20, category: 'Home Appliances', image: '/images/product31.jpg' },
  { id: 32, name: 'Leather Wallet', price: 25, stock: 30, category: 'Accessories', image: '/images/product32.jpg' },
  { id: 33, name: 'Mixed Fruit Basket', price: 10, stock: 100, category: 'Food & Beverages', image: '/images/product33.jpg' },
  { id: 34, name: 'Mineral Water Bottle', price: 2, stock: 150, category: 'Food & Beverages', image: '/images/product34.jpg' },
  { id: 35, name: 'Transformer Toy Set', price: 15, stock: 25, category: 'Toys & Games', image: '/images/product35.jpg' },
  { id: 36, name: 'Paracetamol Tablets', price: 20, stock: 60, category: 'Health & Beauty', image: '/images/product36.jpg' }
];

let users = [];
let orders = [];

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received:', message);
  });

  ws.send(JSON.stringify({ message: 'Welcome to WebSocket server!' }));
});

const broadcast = (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.post('/api/products', (req, res) => {
  const product = req.body;
  products.push(product);
  res.status(201).json(product);
  broadcast({ type: 'NEW_PRODUCT', product });
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  products = products.map(product => product.id === parseInt(id) ? updatedProduct : product);
  res.json(updatedProduct);
  broadcast({ type: 'UPDATE_PRODUCT', product: updatedProduct });
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(product => product.id !== parseInt(id));
  res.status(204).end();
  broadcast({ type: 'DELETE_PRODUCT', id: parseInt(id) });
});

// API endpoints cho users
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
  broadcast({ type: 'NEW_USER', user });
});

// API endpoints cho orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const order = req.body;
  orders.push(order);
  res.status(201).json(order);
  broadcast({ type: 'NEW_ORDER', order });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
