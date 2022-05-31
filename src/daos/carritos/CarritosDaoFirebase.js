//Importo Clase Contenedor para luego extender de ella
import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

// Importo Model del schema 'carritos' 
// import { carritosModel } from '../../models/carritos.js'

//DAO que extiende de clase Contenedor
class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos');
    }

    async existeProductoEnCarrito(idProd) {
        //Esta función sirve para detectar si cierto producto existe o no en algún carrito.
        //devuelve la qty de ocurrencias
        let count = 0
        try {
            let arrayCarr = await this.getAll()
            for (const carr of arrayCarr) {
                count += carr.productos.reduce((n, p) => n + (p.id == idProd), 0); //este método es muy interesante
            }
            return count
        } catch (error) {
            console.log(error);
            return count
        }
    }
}

export { CarritosDaoFirebase }