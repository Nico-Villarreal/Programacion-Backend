class ProductManager{
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
       }

   addProduct(title, description, price, thumbnail, code, stock){
    
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
    }
 
    const CodeRepeat = this.products.find(product => product.code === code);
    if (CodeRepeat) {
        console.log("El código de producto ya existe");
        return;
    }

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

   getProductById(id) {
    const ProductId = this.products.find((product) => product.id === id);

      if (ProductId) {
       return console.log("PRODUCTO EN LA LISTA");
      } else {
      console.error("NOT FOUND"); 
        return null; 
      }
  }

};


const ProductsFinaly = new ProductManager()

ProductsFinaly.addProduct("producto prueba", "este producto es una prueba", 200, "sin imagen", "abc123", 250)
ProductsFinaly.addProduct("producto prueba 2", "esta es otra prueba", 300, "sigue sin imagen", "abc246", 100)
ProductsFinaly.addProduct("producto prueba 2", "esta es otra prueba", 300, "sigue sin imagen", "abc246", 100)
ProductsFinaly.getProductById(6)
console.log(ProductsFinaly)

