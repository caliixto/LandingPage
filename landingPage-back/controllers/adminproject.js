const fs = require("fs");
const path = require("path");

const Project = require("../models/project");

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

    // Validación básica: Si no hay archivo, Multer no lo subió
    if (!file) {
        return res.status(400).send({ status: "error", message: "La imagen es obligatoria" });
    }

    // Instanciamos el modelo usando la variable 'Project' que importamos arriba
    let projectoToSave = new Project({
        titulo: params.titulo,
        tags: params.tags,
        imagen: file.filename
    });

    // Guardamos en la base de datos
    projectoToSave.save().then(projectSaved => {
        if (!projectSaved) {
            return res.status(404).send({
                status: "error",
                message: "El proyecto no se ha podido guardar"
            });
        }
        return res.status(200).send({
            status: "success",
            project: projectSaved
        });
    }).catch(error => {
        return res.status(500).send({
            status: "error",
            message: "Error al guardar el proyecto en la base de datos",
            error
        });
    });
};

module.exports={
    deleteProject,saveProject
}

// actualizando el archivo para forzar commit.