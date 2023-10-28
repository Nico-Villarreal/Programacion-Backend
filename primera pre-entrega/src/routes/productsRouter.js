import { Router } from "express";
import fs from 'fs';

const router = Router();
const products=[];
const path= "./data/products.json";

 const genId = async () => {
    const counter = products.length;
    if(counter==0){
        return 1
    }else{
        return (this.products[counter-1].id)+1
    }
}


router.get("/", async(req, res) => {

    const Product = await fs.promises.readFile(path, 'utf8');
    const ProductParse = await JSON.parse(Product);
    products.push(...ProductParse);

    let limit= req.query.limit;
    if(!limit){return res.send(products);}

    let productsLimit = products.slice(0, parseInt(limit));
    res.send({products:productsLimit});
});


router.get("/:pid", async(req, res) => {

    const Product = await fs.promises.readFile(path, 'utf8');
    const ProductParse = await JSON.parse(Product);
    products.push(...ProductParse);

    let id = parseInt(req.params.id);
    let prod = products.find(p => p.id === id);

    if(!prod){return res.send({error:"no se pudo encontrar el producto"})};
    res.send(prod)
});


router.post("/", async (req, res) => {
    let prod = req.body;

    if(!prod.title || !prod.description || !prod.price || !prod.code || !prod.stock || !prod.status || !prod.category && !prod.thumbnail){
        return res.status(400).send({ status: "error", msg: "valores incompletos, revisar datos de entrada!!" });  

    }else{
        const id = await genId();
        prod.id = id;

        products.push(prod);
        await fs.promises.writeFile(path, JSON.stringify(products,null,2));
        res.send({ status: "success", msg: 'Producto Creado Correctamente!' })
    }
});


router.put("/:pid", async(req, res) => {

    const Product = await fs.promises.readFile(path, 'utf8');
    const ProductParse = await JSON.parse(Product);
    
    let prodId = parseInt(req.params.prodId);
    let updatedProduct = req.body;

    const prodPosition = ProductParse.findIndex((p => p.id === prodId));
    if (prodPosition < 0) {
        return res.status(400).send({ status: "info", error: "Producto no encontrado" });
    }

    ProductParse[prodPosition]={
        ...ProductParse[prodPosition],
        ...updatedProduct
    };

    await fs.promises.writeFile(path, JSON.stringify(ProductParse,null,2));
    res.send({ status: "success", msg: 'Producto Actualizado Exitosamente!' })

});


router.delete("/:pid", async (req, res) => {

    const Product = await fs.promises.readFile(path, 'utf8');
    const ProductParse = await JSON.parse(Product);

    let prodId = parseInt(req.params.prodId);
    const prodSize = ProductParse.length;
    const prodPosition = ProductParse.findIndex((p => p.id === prodId));

    if (prodPosition < 0) {
        return res.status(202).send({ status: "info", error: "producto no encontrado en la lista" });
    }
    ProductParse.splice(prodPosition, 1);

    if (ProductParse.length === prodSize) {
        return res.status(500).send({ status: "error", error: "El producto no se pudo borrar revise nuevamente." });
    }

    await fs.promises.writeFile(path, JSON.stringify(ProductParse, null, 2));

    return res.send({ status: "Success", message: "producto Eliminado Correctamente." });

});

export default router;