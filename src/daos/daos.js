import 'dotenv/config' // Para poder usar las variables de entorno directamente.

//Importo clases Contenedoras (se pueden comentar los import que no se usen...)
import { ProductosDaoFile } from './productos/ProductosDaoFile.js';
import { CarritosDaoFile } from './carritos/CarritosDaoFile.js';
import { ProductosDaoMongo } from './productos/ProductosDaoMongo.js';
import { CarritosDaoMongo } from './carritos/CarritosDaoMongo.js';
import { ProductosDaoFirebase } from './productos/ProductosDaoFirebase.js';
import { CarritosDaoFirebase } from './carritos/CarritosDaoFirebase.js';

let ProductosDao = null
let CarritosDao = null

// CONTAINER SELECTOR ()
switch (process.env.CONTAINER_TYPE) {
    case 'FILE':
        ProductosDao = ProductosDaoFile
        CarritosDao = CarritosDaoFile
        break;
    case 'MONGO':
        ProductosDao = ProductosDaoMongo
        CarritosDao = CarritosDaoMongo
        break;
    case 'FIREBASE':
        ProductosDao = ProductosDaoFirebase
        CarritosDao = CarritosDaoFirebase
        break;
    default:
        console.log('Error con el Container Selector...');
}

export { ProductosDao, CarritosDao }