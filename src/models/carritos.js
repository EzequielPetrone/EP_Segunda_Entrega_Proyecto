import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    productos: []
},
    { strict: false },
    { timestamps: true }
)

const carritosModel = mongoose.model('carritos', carritoSchema)

export { carritosModel } 