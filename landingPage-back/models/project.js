//importat la libreria de mongoose

const { Schema, model } = require("mongoose");
const { trim } = require("validator");


//Crear un esquema (la estrucutra de cada docuemnto de tipo proyecto);

const projectSchema = new Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  tags: {
    type: String, // Aquí guardaremos "Marca, Web, movil"
    required: [true, 'Los tags son obligatorios'],
    trim: true
  },
  imagen: {
    type: String, // Aquí guardaremos la ruta: "/img/project-2.jpg"
    required: [true, 'La ruta de la imagen es obligatoria']
  },
  linkEnVivo: {
    type: String, // Para el enlace <a href="#"> del título y la foto
    default: '#'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

//Crear el modelo, indicarle la coleccion en donde se van a guardar los docs

//Expotar modelos

module.exports = model('Project', projectSchema);