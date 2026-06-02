const bcrypt = require("bcryptjs");

const registrarUsuario = async(req, res)=>{

    const {usuario, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);


    const nuevoUsuario = new Usuario({
        usuario,
        password:passwordHash
    });

    await nuevoUsuario.save();
}