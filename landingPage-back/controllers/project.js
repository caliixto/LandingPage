const fs = require("fs");
const path = require("path");
const Project = require("../models/project");

//GUARDAR PROYECTOS
const save = (req, res) => {
    let body = req.body;
    
    // Cloudinary 
    let urlImagen = req.file ? req.file.path : null;
    console.log("Archivo subido a Cloudinary:", urlImagen);

    // Validación
    if (!body.titulo || !body.tags || !body.linkEnVivo || !urlImagen) {
        return res.status(400).send({ status: "error", message: "Faltan datos o la imagen no se subió" });
    }

    // Guardamos la URL directamente en el campo 'imagen'
    let projectoToSave = new Project({
        titulo: body.titulo,
        tags: body.tags,
        linkEnVivo: body.linkEnVivo,
        imagen: urlImagen
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
            titulo: "Landing",
            tags: "Crud, Admin",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1782387785/landing-page-proyectos/jhnaqr8reqx1e05za8kd.jpg" // URL real de Cloudinary
        },
        {
            titulo: "GifApp",
            tags: "Buscador, Gif",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1782385462/landing-page-proyectos/be7nfz3gmlwwjmjzobtn.jpg"
        },
         {
            titulo: "GamePage",
            tags: "Juegos, Gameplay, Noticias",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1782388137/landing-page-proyectos/gi3hq97srzjjs2aaaacs.jpg" // URL real de Cloudinary
        },
        {
            titulo: "Plantilla Porfolio",
            tags: "Diseño, Estetica",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1782388401/landing-page-proyectos/sv5z7aqkf27dxyybw7u3.jpg"
        },
         {
            titulo: "Todo-List",
            tags: "Login, Tareas, Calendario",
            imagen: "https://res.cloudinary.com/dejf1siaf/image/upload/v1782388539/landing-page-proyectos/nhj5kigjxxjlcfwktuul.jpg" // URL real de Cloudinary
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

//Actualizar Proyecto
const updateProject = (req, res) => {
    const id = req.body.id; 
    
    const updateData = { ...req.body };
    if (req.file) {
        updateData.imagen = req.file.path;
    }

    // 3. Eliminamos el ID del objeto
    delete updateData.id;

    Project.findByIdAndUpdate(id, updateData, { new: true })
        .then(projectUpdated => {
            if (!projectUpdated) {
                return res.status(404).send({ status: "error", message: "Proyecto no encontrado" });
            }
            return res.status(200).send({ status: "success", project: projectUpdated });
        })
        .catch(error => {
            console.error("Error en updateProject:", error);
            return res.status(500).send({ status: "error", message: "Error al actualizar", error });
        });
};


module.exports = { save, list, deleteProject, updateProject, restoreProjects };