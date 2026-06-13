const fs = require("fs");
const path = require("path");
const Project = require("../models/project");

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
const list = (req, res) => {
    Project.find().then(projects => {
        if (!projects || projects.length === 0) {
            return res.status(404).send({ status: "error", message: "No hay proyectos" });
        }
        return res.status(200).send({ status: "success", projects });
    }).catch(error => res.status(500).send({ status: "error", message: "Error al listar", error }));
};

const item = (req, res) => {
    let id = req.params.id;
    Project.findById(id).then(project => {
        if (!project) return res.status(404).send({ status: "error", message: "No encontrado" });
        return res.status(200).send({ status: "success", project });
    }).catch(error => res.status(500).send({ status: "error", message: "Error al buscar", error }));
};

const deleteProject = (req, res) => {
    let id = req.params.id;
    Project.findByIdAndDelete(id).then(projectRemoved => {
        if (!projectRemoved) return res.status(404).send({ status: "error", message: "No eliminado" });
        return res.status(200).send({ status: "success", project: projectRemoved });
    }).catch(error => res.status(500).send({ status: "error", message: "Error al eliminar", error }));
};

const update = (req, res) => {
    let body = req.body;
    Project.findByIdAndUpdate(body.id, body, { new: true }).then(projectUpdated => {
        if (!projectUpdated) return res.status(404).send({ status: "error", message: "No encontrado" });
        return res.status(200).send({ status: "success", project: projectUpdated });
    }).catch(error => res.status(500).send({ status: "error", message: "Error al actualizar", error }));
};

const upload = (req, res) => {
    let id = req.params.id;
    if (!req.file) return res.status(404).send({ status: "error", message: "No se subió archivo" });

    const filepath = req.file.path;
    const extension = path.extname(req.file.originalname).toLowerCase().replace(".", "");
    if (!["png", "jpg", "jpeg", "gif"].includes(extension)) {
        fs.unlinkSync(filepath);
        return res.status(400).send({ status: "error", message: "Extensión inválida" });
    }

    Project.findByIdAndUpdate({ _id: id }, { imagen: req.file.filename }, { new: true }).then(projectUpdated => {
        if (!projectUpdated) {
            fs.unlinkSync(filepath);
            return res.status(404).send({ status: "error", message: "No encontrado" });
        }
        return res.status(200).send({ status: "success", project: projectUpdated });
    }).catch(error => {
        fs.unlinkSync(filepath);
        return res.status(500).send({ status: "error", message: "Error al subir", error });
    });
};

const getImage = (req, res) => {
    let file = req.params.file;
    let filePath = "./uploads/images/" + file;
    fs.stat(filePath, (error, exists) => {
        if (!error && exists) return res.sendFile(path.resolve(filePath));
        return res.status(404).send({ status: "error", message: "Imagen no existe" });
    });
};

module.exports = { save, list, item, deleteProject, update, upload, getImage };