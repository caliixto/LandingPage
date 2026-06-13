const fs = require("fs");
const path = require("path");
const Project = require("../models/project");

const save = (req, res) => {
    let body = req.body;
    if (!body.titulo || !body.tags || !body.imagen) {
        return res.status(400).send({ status: "error", message: "Faltan datos" });
    }
    let projectoToSave = new Project(body);
    projectoToSave.save().then(projectSaved => {
        if (!projectSaved) return res.status(404).send({ status: "error", message: "No guardado" });
        return res.status(200).send({ status: "success", project: projectSaved });
    }).catch(error => res.status(500).send({ status: "error", message: "Error al guardar", error }));
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