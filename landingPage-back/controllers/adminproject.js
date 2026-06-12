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

module.exports={
    deleteProject
}