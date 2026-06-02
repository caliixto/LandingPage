const Usuario = require("../models/admin");
const bcrypt = require("bcryptjs");


const registrarUsuario = async(req, res)=>{

    try{
        const {usuario, password} = req.body;

        const params = req.body;
        console.log("Datos recibidos en el controlador:", params); // <--- MIRA ESTO EN LA TERMINAL

        if (!params.password) {
            return res.status(400).send({ status: "error", message: "La contraseña es obligatoria" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(params.password, salt); // Asegúrate de usar params.password


        const nuevoUsuario = new Usuario({
            usuario,
            password:passwordHash
        });

        await nuevoUsuario.save();

        return res.status(201).send({
            status:"success",
            message:"todo correcto"
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
                status:"error",
                message:"error al guardar usuario"
        });
    }

}

module.exports={registrarUsuario

};