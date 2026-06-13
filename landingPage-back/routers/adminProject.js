//cargar express que es modulo HTTP

const express = require("express");
const router = express.Router();

//cargar controlador
const adminProject = require("../controllers/adminProject");



//Configurar Multer
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads/images");
    },
    filename: (req, file, cb)=>{
        cb(null, "adminProject-" + Date.now() + "-" + file.originalname)
    }
});

const upload = multer({storage})


//Definir las Rutas
router.post("/save", upload.single('imagen'), adminProject.saveProject);
//router.get("/item/:id",adminProject.item);
router.delete("/deleteProject/:id",adminProject.deleteProject);
//router.put("/update",adminProject.update);
//router.put("/upload/:id",upload.single("file0"), adminProject.upload);
//router.get("/image/:file",adminProject.getImage);


//Exportar Rutas
module.exports = router;