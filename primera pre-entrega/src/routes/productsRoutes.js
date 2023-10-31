import { Router } from "express";
import fs from 'fs';

const router = Router();
const products = [];
const path = "./src/data/products.json";

 const generateId= async()=>{
    const counter = products.length;
    if(counter == 0){
        return 1
    }else{
        return (products[counter-1].id)+1
    }
}


router.get("/", async(req, res) => {
    const listProduct = await fs.promises.readFile(path, 'utf8');
    const listProductParse = await JSON.parse(listProduct);
    products.push(...listProductParse);

    let limit = req.query.limit;
    if(!limit){return res.send(products);}

    let productsWhitLimit = products.slice(0, parseInt(limit));
    res.send({products:productsWhitLimit});

});


router.get("/:pid", async(req, res) => {
    const listProduct = await fs.promises.readFile(path, 'utf8');
    const listProductParse = await JSON.parse(listProduct);
    products.push(...listProductParse);

    let id = parseInt(req.params.pid);
    let prod = products.find(p => p.id === id);

    if(!prod){return res.send({error:"no se pudo encontrar el producto seleccionado"})};
    res.send(prod)

});


router.post("/", async (req, res) => {
    let prod = req.body;

    if(!prod.title || !prod.description || !prod.price || !prod.code || !prod.stock || !prod.status || !prod.category || !prod.thumbnail){
        return res.status(400).send({ status: "error", msg: "valores incompletos, revisar datos de entrada nuevamente!!" });
        
    }else{
        const id = await generateId();
        prod.id = id;

        products.push(prod);
        await fs.promises.writeFile(path, JSON.stringify(products,null,2));
        res.send({ status: "success", msg: 'Producto Creado exitosamente!' })
        
    }

});


router.put("/:pid",  async(req, res) => {
    const listProduct = await fs.promises.readFile(path, 'utf8');
    const listProductParse= await JSON.parse(listProduct);
    
    let pid = parseInt(req.params.pid);
    let updatedProduct = req.body;

    const prodPosition = listProductParse.findIndex((p => p.id === pid));
    if (prodPosition < 0) {
        return res.status(400).send({ status: "info", error: "Producto no encontrado, revise nuevamente" });
    }
    listProductParse[prodPosition] = {
        ...listProductParse[prodPosition],
        ...updatedProduct
    };

    await fs.promises.writeFile(path, JSON.stringify(listProductParse,null,2));
    res.send({ status: "success", msg: 'Producto Actualizado correctamente!' })

});


router.delete("/:pid", async (req, res) => {
    const listProduct = await fs.promises.readFile(path,"utf-8");
    const listProductParse= JSON.parse(listProduct);

    let pid = parseInt(req.params.pid);
    const prodSize = listProductParse.length;
    const prodPosition = listProductParse.findIndex((p => p.id === pid));

    if (prodPosition < 0) {
        return res.status(202).send({ status: "info", error: "producto no encontrado, revise nuevamente" });
    }
    listProductParse.splice(prodPosition, 1);

    if (listProductParse.length === prodSize) {
        return res.status(500).send({ status: "error", error: "El producto no se pudo borrar, revise otra vez el producto." });
    }

    await fs.promises.writeFile(path, JSON.stringify(listProductParse, null, 2));
    return res.send({ status: "Success", message: "producto Eliminado correctamente." });

});

export default router;