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
router.post("/save", upload.single("file0"), ProjectController.save);
router.get("/list", ProjectController.list);
router.get("/item/:id",ProjectController.item);
router.delete("/deleteProject/:id",ProjectController.deleteProject);
router.put("/update",ProjectController.update);
router.put("/upload/:id",upload.single("file0"), ProjectController.upload);
router.get("/image/:file",ProjectController.getImage);


//Exportar Rutas
module.exports = router;