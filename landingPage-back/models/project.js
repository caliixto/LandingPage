//importat la libreria de mongoose

const { Schema, model } = require("mongoose");
const { trim } = require("validator");


//Crear un esquema (la estrucutra de cada docuemnto de tipo proyecto);

const projectSchema = new Schema({
    name:{
        type:String,
        required: true,
        trim:true
    },
    description: {
        type:String,
        required:true
    },
    state: {
        type:String,
        required:true
    },
    image: {
        type:String,
        default: "default.png",
    },
    created_at:{
        type:Date,
        default:Date.now
    }

})

//Crear el modelo, indicarle la coleccion en donde se van a guardar los docs

//Expotar modelos

module.exports = model("Project", projectSchema, "projects");