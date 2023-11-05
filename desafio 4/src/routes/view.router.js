import express from 'express';
import fs from 'fs';

const router = express.Router();
const products =[];
const path= './products/products.json';

//me traigo los productos como siempre.
const listProduct = await fs.promises.readFile(path,"utf-8");
const listProductParse= JSON.parse(listProduct);
products.push(...listProductParse);

router.get('/', (req, res) => { 
    res.render('home', {products});
});

router.get('/realtimeproducts',(req, res) => { 
    res.render('realtimeproducts');
});


export default router;