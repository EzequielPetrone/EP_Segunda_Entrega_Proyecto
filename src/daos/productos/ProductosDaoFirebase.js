//Importo Clase Contenedor para luego extender de ella
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

// Importo Model del schema 'productos' 
// import { productosModel } from '../../models/productos.js'

//DAO que extiende de clase Contenedor
class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('productos');
    }

    async actualizarStock(id, qty) {
        let prod = await this.getById(id)
        //Fundamental validar que no se intente restar más cantidad del stock disponible!
        if (prod && prod.stock + qty >= 0) {
            prod.stock += qty
            return await this.editById(id, prod) //Esto retorna true cuando se edita correctamente
        } else {
            console.log('No es posible actualizar stock del producto con id', id)
            return false
        }
    }
}

export { ProductosDaoFirebase }