const fs = require("fs");
const path = require("path");

const project = require("../models/project");

const deleteProject = (req, res) =>{
    let id = req.params.id;
        console.log("Prueba: Se ha recibido la orden de borrar el proyecto con ID:", id);

        return res.status(200).send({
        status: "success",
        message: "¡Simulación de borrado exitosa! El ID " + id + " ha sido procesado (pero no borrado)."
        });

        return res.status(500).send({
            status:"error",
            message:"Error al eliminar un proyecto", error
        });
}

const saveProject = (req, res) =>{
    const params = req.body;
    const file = req.file; // Multer pone el archivo aquí

    // LOG DE SEGURIDAD: Mira qué llega realmente
    console.log("PARAMS:", params); 
    console.log("FILE:", file);

    // Si params.titulo o params.tags llegan como undefined, aquí es donde falla
    if (!params.titulo || !params.tags || !file) {
        return res.status(400).send({ 
            status: 'error', 
            message: 'Faltan datos por enviar',
            debug: { titulo: !!params.titulo, tags: !!params.tags, file: !!file } // Esto te dirá qué falta exactamente
        });
    }

    // Guardado...
    let projectoToSave = new project({
        titulo: body.titulo,
        tags: body.tags,
        imagen: imageName
    });

    //Guardo el objeto en la bbdd

    projectoToSave.save().then(project =>{

        if (!project){
            return res.status(404).send({
            status:"error",
            message:"El projecto no se ha guardado correctamente"
        });
        }

        return res.status(200).send({
            status:"success",
            project
        });

    }).catch(error =>{
         return res.status(500).send({
            status:"error",
            message:"Error al guardar el projecto", error
        });
    });
};

module.exports={
    deleteProject,saveProject
}