const fs = require("fs");
const path = require("path");
const Project = require("../models/project");

//GUARDAR PROYECTOS
const save = (req, res) => {
    let body = req.body;
    
    // Cloudinary nos devuelve la URL pública en 'req.file.path'
    let urlImagen = req.file ? req.file.path : null;
    console.log("Archivo subido a Cloudinary:", urlImagen);

    // Validación
    if (!body.titulo || !body.tags || !urlImagen) {
        return res.status(400).send({ status: "error", message: "Faltan datos o la imagen no se subió" });
    }

    // Guardamos la URL directamente en el campo 'imagen'
    let projectoToSave = new Project({
        titulo: body.titulo,
        tags: body.tags,
        imagen: urlImagen // Aquí va la URL de Cloudinary
    });

    projectoToSave.save().then(projectSaved => {
        return res.status(200).send({ status: "success", project: projectSaved });
    }).catch(error => {
        console.error("Error Mongoose:", error);
        return res.status(500).send({ status: "error", message: "Error al guardar en BD" });
    });
};

//RESTAURAR PROYECTOS
const restoreProjects= async (req, res) => {
    const defaultProjects = [
        {
            titulo: "Agencia Creativa",
            tags: "Marca, Web, Aplicacion",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1781429610/landing-page-proyectos/cdqpnkjh6bnohdjun350.jpg" // URL real de Cloudinary
        },
        {
            titulo: "Gestion de Tareas",
            tags: "Marca, Web, Aplicacion",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1781429635/landing-page-proyectos/uyvzehxlxnu1fccn4rxg.jpg"
        },
         {
            titulo: "Agencial Digital",
            tags: "Web, UI/UX",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1781429662/landing-page-proyectos/ialzz1ncq4ehgs4jvydd.jpg" // URL real de Cloudinary
        },
        {
            titulo: "Potafolio Personal",
            tags: "Logo, Web, Movil",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1781429687/landing-page-proyectos/dkvvh3vy1qtlhxrdgokr.jpg"
        },
         {
            titulo: "Red Social",
            tags: "Diseño, Desarrollo",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1781429715/landing-page-proyectos/ijuff3t5kmfep0lz2pqb.jpg" // URL real de Cloudinary
        },
        {
            titulo: "Aplicacion Web",
            tags: "Logo, Web, Aplicacion",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1781429741/landing-page-proyectos/nliasionbjycmwnfkokd.jpg"
        }
    ];

    try {
        // Insertamos los proyectos por defecto
        const projects = await Project.insertMany(defaultProjects);
        return res.status(200).send({ status: "success", projects });
    } catch (error) {
        return res.status(500).send({ status: "error", message: "No se pudieron restaurar" });
    }
}


//LISTAR PROYECTOS
const list = (req, res) => {
    Project.find().then(projects => {
        if (!projects || projects.length === 0) {
            return res.status(404).send({ status: "error", message: "No hay proyectos" });
        }
        return res.status(200).send({ status: "success", projects });
    }).catch(error => res.status(500).send({ status: "error", message: "Error al listar", error }));
};

//Eliminar Projecto
const deleteProject = (req, res) => {
    let id = req.params.id;
    Project.findByIdAndDelete(id).then(projectRemoved => {
        if (!projectRemoved) return res.status(404).send({ status: "error", message: "No eliminado" });
        return res.status(200).send({ status: "success", project: projectRemoved });
    }).catch(error => res.status(500).send({ status: "error", message: "Error al eliminar", error }));
};

//Actualizar Poyecto
const updateProject = (req, res) => {
    let body = req.body;
    Project.findByIdAndUpdate(body.id, body, { new: true }).then(projectUpdated => {
        if (!projectUpdated) return res.status(404).send({ status: "error", message: "No encontrado" });
        return res.status(200).send({ status: "success", project: projectUpdated });
    }).catch(error => res.status(500).send({ status: "error", message: "Error al actualizar", error }));
};


module.exports = { save, list, deleteProject, updateProject, restoreProjects };