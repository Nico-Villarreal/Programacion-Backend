const fs = require('fs')

class ProductManager{
    constructor(){
        this.path = './product.json',
        this.products = [];
    }


    generateId = async () => {
        const counter = this.products.length;
        if(counter == 0){
            return 1
        }else{
            return (this.products[counter-1].id) +1
        }
    }

    getProducts = async () => {
            const ListProductsJSON = await fs.promises.readFile(this.path, 'utf-8');
            const ProductsJS = JSON.parse(ListProductsJSON);
            return ProductsJS;
        }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
    
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return
        }else{
            const CodeRepeat = this.products.find(product => product.code === code);
            if (CodeRepeat) {
                console.log("El código de producto ya existe");
                return;
            }else{
                const id = await this.generateId();
                const product={
                    id,
                    title, 
                    description, 
                    price, 
                    thumbnail, 
                    code, 
                    stock
                }

                this.products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,2));
            }
        }
    }
    
    updateProduct = async(id,title, description, price, thumbnail, code, stock) => {
        if( !id, !title || !description || !price || !thumbnail || !code || !stock){
            console.error("ingrese todos los datos para actualizar el producto");
            return
        }else{
            const ProducList = await this.getProducts();
            const newProductlist = ProducList.map(element => {
            if(element.id === id){
                const updateProduct = {
                    ...element,
                    title, description, price, thumbnail, code, stock
                }
                console.log("el producto a sido actualizado.");
                return updateProduct
            }else{
                console.log("error al actualizar el producto.");
                return element
            }
        })
        await fs.promises.writeFile(this.path, JSON.stringify(newProductlist,null,2));    
        }
    }

    deleteProduct = async (id) => {
        const allProducts= await this.getProducts()
        const productsNotFound= allProducts.filter(element => element.id !== id);
        await fs.promises.writeFile(this.path,JSON.stringify(productsNotFound,null,2));  
    }


    getProductbyId = async (id) => {
        const allproducts = await this.getProducts();
        const found = allproducts.find(element=>element.id===id);
        await fs.promises.readFile(this.path,"utf-8");
        return found;
    }

};


//----FUNCION PARA EJECUTAR LOS TEST (ELIMINAR LAS BARRAS)

async function ProductGenerator(){
    
    const pm = new ProductManager("./product.json");

    //SE COMIENZA A AGREGAR PRODUCTOS
    await pm.addProduct("Perro", "pastor aleman", 5000, "imagen", "001", 15);
    console.log('PRIMER PRODUCTO AGREGADO', await pm.getProducts());

    await pm.addProduct("Gato", "siames cazador", 7000, "imagen", "002", 10);
    console.log('SEGUNDO PRODUCTO AGREGADO', await pm.getProducts());

    await pm.addProduct("Iguana", "de las Islas Galapagos", 2500, "imagen", "003", 5);
    console.log('TERCER PRODUCTO AGREGADO', await pm.getProducts());

    //SE MODIFICA EL PRODUCTO N° 3
    //await pm.updateProduct(3, "Castor", "de los bellos lagos", 4550, "imagen", "003", 6);
    //console.log('PRIMER PRODUCTO MODIFICADO', await pm.getProducts());

    //SE AGREGA UN PRODUCTO NUEVO
    //await pm.addProduct("Loro", "De la selva misionera", 5500, "imagen", "004", 7);
    //console.log('AGREGANDO NUEVO PRODUCTO', await pm.getProducts());

    //SE ELIMINA EL PRIMER PRODUCTO
    //await pm.deleteProduct(1);
    //console.log('PRODUCTO BORRADO EXITOSAMENTE', await pm.getProducts());

    //SE ELIMINAN TODOS LOS PRODUCTOS
    //await pm.deleteProduct(2);
    //await pm.deleteProduct(3);
    //await pm.deleteProduct(4);
    //console.log('SE ELIMNARON LOS PRODUCTOS', await pm.getProducts());

}    
    

ProductGenerator()
