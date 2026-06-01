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

//Convertir los datos el body a objetos

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));

//Cargar rutas

const Projectrouter = require("./routers/project");

app.use('/api/project', Projectrouter);

//Poner el servidor a escuchar

app.listen(port, ()=>{
    console.log("El servidor esta corriendo correctamente , en el puerto "+ port)
})
