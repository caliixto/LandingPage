const fs = require("fs");
const path = require("path");

const project = require("../models/project");

const save = (req, res) =>{

    //Recibo datos
    let body = req.body;

    //Validar datos

    if(!body.titulo || !body.tags || !body.imagen){
        return res.status(400).send({
            status:"error",
            message:"Faltan datos por enviar"
        });
    }

    //Crear objetos

        let projectoToSave = new project(body);

    //Guardo el objeto en la bbdd

    projectoToSave.save().then(project =>{

        if (!project){
            return res.status(404).send({
            status:"error",
            message:"El projecto no se ha guardado correctamente"
        });
        }

        return res.status(200).send({
            status:"success",
            project
        });

    }).catch(error =>{
         return res.status(500).send({
            status:"error",
            message:"Error al guardar el projecto", error
        });
    });
};


const list = (req, res) =>{
    project.find()
        .then(projects =>{
            if (projects.length===0){
                return res.status(404).send({
                status:"error",
                message:"No hay proyectos para mostrar"
            });
            }

            return res.status(200).send({
                status:"success",
                projects
            });

        }).catch(error =>{
            return res.status(500).send({
                status:"error",
                message:"Error al listar los projectos", error
            });
        });
}


const item = (req, res) =>{
    let id = req.params.id;

    project.findById(id)
        .then(project =>{
            if (!project){
            return res.status(404).send({
            status:"error",
            message:"No hay proyectos para mostrar"
        });
        }

        return res.status(200).send({
            status:"success",
            project
        });
        }).catch(error =>{
         return res.status(500).send({
            status:"error",
            message:"Error al conseguir el projecto", error
        });
    });
    
}

const deleteProject = (req, res) =>{
    let id = req.params.id;

    project.findByIdAndDelete(id)
        .deleteOne()
        .then(project =>{
            if (!project){
            return res.status(404).send({
            status:"error",
            message:"El proyecto no se ha eliminado correctamente"
        });
        }

        return res.status(200).send({
            status:"success",
            project
        });
        }).catch(error =>{
         return res.status(500).send({
            status:"error",
            message:"Error al eliminar un documento", error
        });
    });
    
}

const update = (req, res) =>{

    let body = req.body;

    if(!body || !body.id){
        return res.status(404).send({
            status:"error",
            message:"No has enviado nada"
        });
        }

        project.findByIdAndUpdate(body.id, body, {new:true})
        .then(projectUpdate =>{

            if (!project){
                return res.status(404).send({
                status:"error",
                message:"No se ha encontrado el projecto"
            });
            }

            return res.status(200).send({
            status:"success",
            project: projectUpdate

        });
        }).catch(error =>{
         return res.status(500).send({
            status:"error",
            message:"Error al actualizar el documento", error
        });
    });
    }

const upload = (req, res) =>{
        let id = req.params.id;

        if(!req.file){
            return res.status(404).json({
                status:"error",
                message:"No se ha subido nada", 
            })
        }

        const filepath = req.file.path;
        const extension = path.extname(req.file.originalname).toLocaleLowerCase().replace(".", "");

        const validExtensions = ["png", "jpg", "jpeg", "gif"];

        if(!validExtensions.includes(extension)){
            fs.unlinkSync(filepath);

             return res.status(404).json({
                status:"error",
                message:"La extension del archivo es invalida", 
            })
        }


        project.findByIdAndUpdate({_id: id}, {image: req.file.filename}, {new: false})
            .then(projectUpdate =>{

                if (!project){

                    fs.unlinkSync(filepath);

                    return res.status(404).send({
                    status:"error",
                    message:"No se ha encontrado el projecto"
                });
                }

                if (projectUpdate.image && projectUpdate.image != "default.png"){
                    const oldImgPath = "./uploads/images/"+projectUpdate.image;

                    if(fs.existsSync(oldImgPath)){
                        fs.unlinkSync(oldImgPath);
                    }
                }

                return res.status(200).send({
                status:"success",
                project: projectUpdate,
                newFile: req.file.filename

                });

            }).catch(error =>{

            fs.unlinkSync(filepath);

            return res.status(500).send({
                status:"error",
                message:"Error al actualizar el documento", error
            });
        });
} 


const getImage = (req, res) =>{
    //sacar el nombre del archivo

    let file = req.params.file;

    //construir ruta del fichero

    let filePath = "./uploads/images/" + file;
    //comprobar si existe el archivo

    fs.stat(filePath, (error, exist) => {

      if(!error && exist){
        //devolver respuesta positiva
        return res.sendFile(path.resolve(filePath));
      }else{
        //devolver respuesta negativa
        return res.status(404).json({
            status: "error",
            message: "La imagen no existe"
        })
      } 
    })
}



module.exports = {
    save,
    list,
    item,
    deleteProject,
    update,
    upload,
    getImage
};