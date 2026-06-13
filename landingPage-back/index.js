//Importar dependencias

const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");


//Conexion a la base de datos

connection();




//Crear el servidor

const app = express()


const port= process.env.PORT || 3977;

//Configurar el cors
app.use(cors());


//Creacion carpeta

const fs = require('fs');
const path = './uploads/images';
if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
}
//Cargar rutas
const Projectrouter = require("./routers/project");
const Adminrouter = require("./routers/admin");
const adminProject = require("./routers/adminProject");

app.use("/api/admin",Adminrouter);
app.use('/api/project', Projectrouter);
app.use('/api/adminProject', adminProject);

//Convertir los datos el body a objetos

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('¡API de la Landing Page funcionando en la nube, fiera! 🚀');
});

//Poner el servidor a escuchar

app.listen(port, ()=>{
    console.log("El servidor esta corriendo correctamente , en el puerto "+ port)
})
