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

const saveProject = (req, res) => {

   const params = req.body;
    const file = req.file;

   const saveProject = (req, res) => {
    // 1. Logs para depurar (esto aparecerá en la consola de Render cuando inicies)
    console.log("Cuerpo recibido:", req.body);
    console.log("Archivo recibido:", req.file);

    // 2. Respuesta temporal de seguridad
    return res.status(200).send({
        status: 'success',
        message: 'El controlador responde correctamente'
    });
};

    // Usamos params (que es req.body) y file.filename
    let projectoToSave = new Project({ // Asegúrate que el modelo sea 'Project'
        titulo: params.titulo,
        tags: params.tags,
        imagen: file.filename // Aquí está el nombre que generó Multer
    });

    projectoToSave.save().then(projectSaved => {
        if (!projectSaved) {
            return res.status(404).send({
                status: "error",
                message: "El proyecto no se ha guardado correctamente"
            });
        }

        return res.status(200).send({
            status: "success",
            project: projectSaved
        });

    }).catch(error => {
        return res.status(500).send({
            status: "error",
            message: "Error al guardar el proyecto", 
            error
        });
    });
};

module.exports={
    deleteProject,saveProject
}