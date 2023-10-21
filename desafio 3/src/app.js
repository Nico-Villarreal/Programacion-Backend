const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();

const PORT = 8080;
const path = "./data/product.json";
const products = []

async function ProductGenerator(){

    const productManager = new ProductsManager(path)
    const generator = await productManager.getProducts();
    products.push(...generator)
}

ProductGenerator()
