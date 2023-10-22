//EN ESTE DESAFIO SI BIEN SE UTILIZA LA IMPORTACION Y EXPORTACION DE MODULOS, ME SIENTO MAS COMODO USANDO CONSTANTES 
//EN CASO DE QUE SEA NECESARIO LO ANTERIOR CAMBIARE EL CODIGO MAS ADELANTE SOBRE LA CURSADA


const express = require('express');
const ProductManager = require('./ProductManager.js');
const app = express();

const PORT = 8081;
const productJson = './src/data/product.json';
const products = [];

app.listen(PORT, () => console.log("esuchando puerto " + PORT))

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/home', (req, res) => {
    res.send("Bienvenido al servidor del Desafio 3")
})


async function ProductGenerator(){
  
  const productManager = new ProductManager(productJson);

  let generator = await productManager.getProducts();
  products.push(...generator);
}

ProductGenerator();


app.get('/products', (req, res) => {

  let limit= req.query.limit;

  if(!limit){return res.send(products);}

  let productLimit = products.slice(0, parseInt(limit));
  res.send({products:productLimit});

});


app.get('/products/:idProduct', (req, res) => {
  let idProduct = parseInt(req.params.idProduct);
  let prod = products.find(p => p.id === idProduct);

  if(!prod){return res.send({error:"no se pudo encontrar el producto en el listado"})};
  res.send(prod);
});
