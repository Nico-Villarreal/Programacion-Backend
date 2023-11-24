import { MODEL_PRODUCTS } from "./models/product.js";

export default class ProductManager {

    async isCodeUnique(code) {
        try {
            const products = await this.getProducts();
            return products.some((product) => product.code === code);
        } catch (error) {
            console.log(error);
        }
    }
    
    validateFields(product) {
        return (
            product.title &&
            product.description &&
            typeof product.price === 'number' &&
            typeof product.status === 'boolean' &&
            product.code &&
            typeof product.stock === 'number' &&
            product.category &&
            typeof product.title === 'string' &&
            typeof product.description === 'string' &&
            typeof product.code === 'string' &&
            typeof product.category === 'string'
        );
    }

    async addProduct(product) {
        try {
            if(await this.isCodeUnique(product.code)) {
                return { code: 409, status: 'Este producto ya existe en el carrito' };
            }
            if(!this.validateFields(product)) {
                return { code: 400, status: 'Todos los campos del producto tienen que ser ingresados' };
            }
            let result = await MODEL_PRODUCTS.create(product);
            return { code: 200, status: 'El producto fue agregado correctamnte', product: result };
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            const products = await MODEL_PRODUCTS.find();
            return products.map(product => product.toObject());
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const product = await MODEL_PRODUCTS.findById(id);
            return product ? product : false;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(id) {
        try {
            const product = await this.getProductById(id);
            if(product) {
                await MODEL_PRODUCTS.deleteOne({ _id: id });
                return { code: 200, status: 'El producto fue eliminado' };
            } else {
                return { code: 404, status: 'El producto no existe' };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const product = await MODEL_PRODUCTS.findByIdAndUpdate(id, updatedFields, { new: true });
            if(product) {
                return { code: 200, status: 'El producto ha sido actualizado' };
            } else {
                return { code: 404, status: 'El producto no fue encontrado' };
            }
        } catch (error) {
            console.log(error);
        }
    }
}
