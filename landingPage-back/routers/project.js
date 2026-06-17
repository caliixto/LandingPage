const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const ProjectController = require("../controllers/project");

// Definir el almacenamiento
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'landing-page-proyectos',
    format: async (req, file) => 'jpg',
    quality: 'auto:good'
  },
});

const upload = multer({ storage: storage });


//Definir las Rutas
router.post("/save", upload.single("file0"), ProjectController.save); //guardar proyectos
router.post("/restoreProjects", ProjectController.restoreProjects); //Restaurar proyectos
router.get("/list", ProjectController.list);//Listar
router.delete("/deleteProject/:id",ProjectController.deleteProject);//eliminar
router.put("/updateProject", upload.single("file0"), ProjectController.updateProject);//Actualizar


//Exportar Rutas
module.exports = router;