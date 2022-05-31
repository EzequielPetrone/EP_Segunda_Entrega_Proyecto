import 'dotenv/config' // Para poder usar las variables de entorno directamente.

//Importo administrador de Firebase
import admin from "firebase-admin";

//console.log(admin.firestore.FieldValue.serverTimestamp());


//Por cuestiones prácticas me guardé el contenido del json de Firebase como variable de entorno
const serviceAccount = JSON.parse(process.env.FIREBASE_JSON)

//Inicializo conexión a mi Firebase App
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Function que me sirve para customizar la salida de los get
const formatDoc = (doc) => {
    if (doc.data()) {
        return { id: doc.id, ...doc.data() }
    } else {
        return null
    }
}

class ContenedorFirebase {

    constructor(collName) {
        //Instancio Colección en mi Firestore DB
        const db = admin.firestore()
        this.coll = db.collection(collName)
    }

    async getAll() { //return Object[] - Devuelve un array con los objetos presentes en el archivo.
        try {
            const result = await this.coll.get()
            return result.docs.map(doc => formatDoc(doc))

        } catch (error) {
            console.log(`Error al querer leer el contenido de la colección ${this.coll}.`, error)
            return null
        }
    }

    async save(obj) { //return Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        try {
            const result = await this.coll.add({ timeStamp: Date.now(), ...obj })
            return result.id

        } catch (error) {
            console.log(`Pasaron cosas al guardar nuevo objeto en la colección ${this.coll}.`, error);
            return null
        }
    }

    async getById(id) { //return Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            const result = await this.coll.doc(id).get();
            return formatDoc(result)

        } catch (error) {
            console.log(`Error al obtener objeto con id ${id} de la colección ${this.coll}.`, error);
            return null
        }
    }

    async deleteById(id) { //: void - Elimina del archivo el objeto con el id buscado.
        try {
            if (await this.getById(id)) {
                await this.coll.doc(id).delete()
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(`Error al eliminar objeto con id ${id} de la colección ${this.coll}.`, error);
            return null
        }
    }

    /*
    async deleteAll() { //: void - Elimina todos los objetos presentes en el archivo.
        try {
            // return await this.db(this.table).del()
            const result = await this.model.deleteMany({})
            return result.deletedCount
            //Esto devuelve la qty de registros eliminados

        } catch (error) {
            console.log(`Error al eliminar la colección ${this.model.modelName}.`, error);
            return null
        }
    }
    */

    async editById(id, obj) {
        try {
            if (await this.getById(id)) {
                await this.coll.doc(id).set(obj)
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(`Error al editar objeto con id ${id} de la colección ${this.coll}.`, error);
            return null
        }
    }
}

export default ContenedorFirebase