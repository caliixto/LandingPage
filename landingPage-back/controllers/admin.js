const bcrypt = require("bcryptjs");
const admin = require("../models/admin");


const registrarUsuario = async(req, res)=>{

    try{
        const {usuario, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);


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
        return res.status(500).send({
                status:"error",
                message:"erroe al guardar usuario"
        });
    }

}

module.exports={registrarUsuario

};