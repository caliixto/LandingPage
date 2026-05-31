const mongoose = require("mongoose");

const connection = async()=>{
    try {

        await mongoose.connect("mongodb+srv://calixto:tqjg7Bb01wzm8YVn@cluster0.dgehy2a.mongodb.net/landingPage");

        console.log("Conectado a la base de datos: LandingPage");
        
    } catch (error) {
        console.log(error);

        throw new Error("No se ha podido establecer la coneccion a la bbdd")
    }
}

module.exports= connection;