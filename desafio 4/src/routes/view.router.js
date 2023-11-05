import express from 'express';
import fs from 'fs';

const router = express.Router();
const products = [];
const path = './src/products/products.json';


const listProduct = await fs.promises.readFile(path,"utf-8");
const listProductParse = JSON.parse(listProduct);
products.push(...listProductParse);


router.get('/', (req, res) => { 
    res.render('home', {products});
});

router.get('/realtimeproducts',(req, res) => { 
    res.render('realtimeproducts');
});

export default router;