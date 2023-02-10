const { Router } = require('express');
const axios = require('axios');
const cors = require('cors')
const routes = Router();

routes.use(cors())
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const URI = 'mongodb://localhost/products';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(error => console.error(error));

const productSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    imagem: { type: String, required: true },
    preco: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

routes.get('/products', async (req, res) => {
  const brazilianProducts = await axios.get(
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'
  );
  const europeanProducts = await axios.get(
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'
  );

  const allProducts = [...brazilianProducts.data, ...europeanProducts.data];

  res.json(allProducts);
  
});

routes.get('/products/:product_id', async (req, res) => {
    const brazilianProducts = await axios.get(
        'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'
      );
      const europeanProducts = await axios.get(
        'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'
      );
    
    const allProducts = [...brazilianProducts.data, ...europeanProducts.data];
    
    const filteredProducts = allProducts.map(product => ({
        name: product.nome,
        description: product.descricao,
        imagem: product.imagem,
        preco: product.preco
      }));

      res.json(filteredProducts);
});

routes.post('/cart/:product_id', async (req, res) => {
    const brazilianProducts = await axios.get(
        'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'
      );
      const europeanProducts = await axios.get(
        'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'
      );
    
    const allProducts = [...brazilianProducts.data, ...europeanProducts.data];
    
    const filteredProducts = allProducts.map(product => ({
        nome: product.nome,
        descricao: product.descricao,
        imagem: product.imagem,
        preco: product.preco
      }));

      const savePromises = filteredProducts.map(async product => {
        const savedProduct = await new Product(product).save();
        return savedProduct;
        });
        
        await Promise.all(savePromises);
        
        const selectedProduct = filteredProducts.find(product => product._id === req.params.product_id);
        
        if (!selectedProduct) {
            return res.status(400).json({ message: 'Product not found' });
        }
        
        if (!req.session.cart) {
            req.session.cart = [];
        }
        
        const cartProduct = req.session.cart.find(product => product._id === selectedProduct._id);
        
        if (cartProduct) {
            cartProduct.quantity++;
        }
});

module.exports = routes;