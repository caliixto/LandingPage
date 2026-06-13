const express = require("express");
const router = express.Router();

const admin = require("../controllers/admin");



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

// La ruta es '/register' y el controlador es 'admin.registrarUsuario'
router.post("/register", admin.registrarUsuario);
router.post("/login",admin.login);

module.exports = router;