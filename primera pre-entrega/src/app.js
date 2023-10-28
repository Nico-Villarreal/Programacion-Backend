//EN ESTE DESAFIO, SI BIEN SE NOS MOSTRO EN CLASE COMO SE UTILIZA LA IMPORTACION Y EXPORTACION DE MODULOS, ME SIENTO MAS COMODO USANDO CONST Y LET
//EN CASO DE QUE SEA NECESARIO LO ANTERIOR CAMBIARE EL CODIGO MAS ADELANTE SOBRE LA CURSADA Y LO IRE OPTIMIZANDO PARA QUE QUEDE MAS LEGIBLE
//LOS TEST FUERON REALIZADOS CON THUNDER CLIENT


const express = require('express');
const ProductManager = require('./ProductManager.js');
const app = express();

const PORT = 8080;
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


//GET PARA VER TODOS LOS PRODUCTOS O UNA CANTIDAD DEFINIDA CON EL COMANDO "products?limit=5"

app.get('/products', (req, res) => {

  let limit= req.query.limit;

  if(!limit){return res.send(products);}

  let productLimit = products.slice(0, parseInt(limit));
  res.send({products:productLimit});

});

//GET PARA VER LOS PRODUCTOS POR ID INDIVIDUAL

app.get('/products/:pid', (req, res) => {

  let pId = parseInt(req.params.pid);
  let prod = products.find(prodId => prodId.id === pId);

  if(!prod) res.status(404).json({message: 'no se pudo encontrar el producto en el listado'}) 
  else res.status(200).json(prod)

});
