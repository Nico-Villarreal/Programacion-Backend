class ProductManager{
    constructor(){
        this.products = []
    }


   addProduct(title, description, price, thumbnail, code, stock){
    const product = {
        id: this.#getMaxId()+1,
        title, 
        description,
        price,
        thumbnail,
        code,
        stock,
    }

    this.products.push(product) 


   }

   #getMaxId(){
    let maxId = 0;
    this.products.map((product)=>{
        if(product.id > maxId) maxId = product.id;
    })
        return maxId
   };
  
   getProducts(){
    return this.products
   }

};

const ProductsFinaly = new ProductManager()

ProductsFinaly.addProduct("producto prueba", "este producto es una prueba", 200, "sin imagen", "abc123", 250)
ProductsFinaly.addProduct("producto prueba 2", "esta es otra prueba", 300, "sigue sin imagen", "abc246", 100)
ProductsFinaly.addProduct("producto prueba 2", "esta es otra prueba", 300, "sigue sin imagen", "abc246", 100)
ProductsFinaly.getProducts()
console.log(ProductsFinaly)