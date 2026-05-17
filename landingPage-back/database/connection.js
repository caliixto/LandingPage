const mongoose = require("mongoose");

const connection = async()=>{
    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/landingPage");

        console.log("Conectado a la base de datos: LandingPage");
        
    } catch (error) {
        console.log(error);

        throw new Error("No se ha podido establecer la coneccion a la bbdd")
    }
}

module.exports= connection;