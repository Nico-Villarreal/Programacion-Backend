import { Router } from "express";
import fs from 'fs';

const router = Router();
const products=[];
const path= "./data/products.json";

 const generateId = async () => {
    const counter = products.length;
    if(counter==0){
        return 1
    }else{
        return (this.products[counter-1].id)+1
    }
}


router.get("/", async(req, res) => {

    const listProduct = await fs.promises.readFile(path, 'utf8');
    const listProductParse= await JSON.parse(listProduct);
    products.push(...listProductParse);

    let limit= req.query.limit;
    if(!limit){return res.send(products);}

    let productsWhitLimit = products.slice(0, parseInt(limit));
    res.send({products:productsWhitLimit});

});

router.get("/:id", async(req, res) => {
    const listProduct = await fs.promises.readFile(path, 'utf8');
    const listProductParse= await JSON.parse(listProduct);
    products.push(...listProductParse);

    let id = parseInt(req.params.id);
    let prod= products.find(p=>p.id===id);

    if(!prod){return res.send({error:"no se pudo encontrar el producto"})};
    res.send(prod)

});


router.post("/", async (req, res) => {

    let prod = req.body;

    if(!prod.title || !prod.description || !prod.price || !prod.code || !prod.stock){
        
        return res.status(400).send({ status: "error", msg: "valores incompletos, revisar datos de entrada!!" });
        
    }else{
        
        const id= await generateId();
        prod.id = id;

        products.push(prod);
        await fs.promises.writeFile(path, JSON.stringify(products,null,2));
        res.send({ status: "success", msg: 'Producto Creado!' })
        
    }

});

router.put("/:prodId",  async(req, res) => {

    const listProduct = await fs.promises.readFile(path, 'utf8');
    const listProductParse= await JSON.parse(listProduct);
    
    
    let prodId = parseInt(req.params.prodId);
    let updatedProduct = req.body;

    const prodPosition = listProductParse.findIndex((p => p.id === prodId));
    if (prodPosition < 0) {
        return res.status(400).send({ status: "info", error: "Producto no encontrado" });
    }

    //esto lo tube que buscar porque no sabia como se hacia.
    listProductParse[prodPosition]={
        ...listProductParse[prodPosition],
        ...updatedProduct
    };

    await fs.promises.writeFile(path, JSON.stringify(listProductParse,null,2));
    res.send({ status: "success", msg: 'Producto Actualizado!' })



});

router.delete("/:prodId", async (req, res) => {

    const listProduct = await fs.promises.readFile(path,"utf-8");
    const listProductParse= JSON.parse(listProduct);

    let prodId = parseInt(req.params.prodId);
    const prodSize = listProductParse.length;
    const prodPosition = listProductParse.findIndex((p => p.id === prodId));

    if (prodPosition < 0) {
        return res.status(202).send({ status: "info", error: "producto no encontrado" });
    }
    listProductParse.splice(prodPosition, 1);

    if (listProductParse.length === prodSize) {
        return res.status(500).send({ status: "error", error: "El producto no se pudo borrar revise." });
    }

    await fs.promises.writeFile(path, JSON.stringify(listProductParse, null, 2));

    return res.send({ status: "Success", message: "producto Eliminado." });

});

export default router;