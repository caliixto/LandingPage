//importat la libreria de mongoose

const { Schema, model } = require("mongoose");
const { trim } = require("validator");

//Crear un esquema (la estrucutra de cada docuemnto de tipo proyecto);

const userSchema = new Schema({
  usuario: {
    type: String,
    required: [true, 'El Usuario es obligatorio'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatorio'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

//Crear el modelo, indicarle la coleccion en donde se van a guardar los docs

//Expotar modelos

module.exports = model('usuario', userSchema);