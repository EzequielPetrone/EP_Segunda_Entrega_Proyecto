//Importo Clase Contenedor para luego extender de ella
import ContenedorFile from '../../contenedores/ContenedorFile.js';

class ProductosDaoFile extends ContenedorFile {

    constructor() {
        super('./src/data/productos.json');
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

export { ProductosDaoFile }