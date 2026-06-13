//cargar express que es modulo HTTP

const express = require("express");
const router = express.Router();

//cargar controlador
const ProjectController = require("../controllers/project");



//Configurar Multer
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads/images");
    },
    filename: (req, file, cb)=>{
        cb(null, "project-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({storage})


//Definir las Rutas
router.post("/save",ProjectController.save);
router.get("/list", ProjectController.list);
router.get("/item/:id",ProjectController.item);
router.delete("/deleteProject/:id",ProjectController.deleteProject);
router.put("/update",ProjectController.update);
router.put("/upload/:id",upload.single("file0"), ProjectController.upload);
router.get("/image/:file",ProjectController.getImage);


//Exportar Rutas
module.exports = router;