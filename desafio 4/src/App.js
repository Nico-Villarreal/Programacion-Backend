import fs from 'fs';
import { Server } from 'socket.io';
import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './Utils.js';
import productsRoutes from '../src/routes/view.router.js';

const products =[];
const path= './src/products/products.json';

const listProduct = await fs.promises.readFile(path,"utf-8");
const listProductParse= JSON.parse(listProduct);
products.push(...listProductParse);


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views/');
app.set('view engine', 'handlebars');

app.use('/', productsRoutes);


const httpServer =app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: ${PORT}`);
})

//traigo la información para guardar el producto.
const socketServer = new Server(httpServer);

socketServer.on('connection', socket =>{

    socket.on('prod', async data =>{
        if(products && products.length != 0){
            products.push(data);
            await fs.promises.writeFile(path, JSON.stringify(products,null,2));

        }else {
            //mando la lista actualizada
            socketServer.emit('listUpdate', products);
            alert("No hay productos existentes, no se agrega nada.")
         }

    })

});