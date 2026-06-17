import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormServicesService } from '../login-form-services.service';
import { AdminProjectServiceService } from '../services/admin-project-service.service';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProyectoFormComponent } from '../proyecto-form/proyecto-form.component';
import { ProyectoService } from '../services/proyecto.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-admin-panel',
  imports: [NgFor, ProyectoFormComponent, NgIf],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})

export class AdminPanelComponent {
  mostrarFormulario: boolean = false;
  public proyectos:any;
  proyectoAEditar: any = null;
  
  constructor(public authService: LoginFormServicesService, 
    private router: Router, private _adminProjectService:AdminProjectServiceService,
    private http: HttpClient,
    private proyectoService: ProyectoService,
  private _projectService:ProjectService){

  }


cerrarSesion() {
  this.authService.cerrarSesion();
  this.router.navigate(['/']);
}

// Aquí declaras la "caja" (la variable)
  fotoPerfil: string = ''; 

 ngOnInit() {
  // 1. Recuperamos la URL que guardamos en el login
  const urlGuardada = localStorage.getItem('fotoPerfil');

  // 2. Si existe algo guardado, se lo asignamos a nuestra variable
  if (urlGuardada) {
    this.fotoPerfil = urlGuardada;
  } else {
    // Opcional: Pon una imagen por defecto si no hay nada guardado
    this.fotoPerfil = './img/perfil.jpg';

  }
  this.getprojectsAdmin();
  this.proyectoService.proyectoGuardado$.subscribe(() => {
      this.getprojectsAdmin();
    });
}

getprojectsAdmin(){
  this._adminProjectService.getAdminProject().subscribe({
    next: (data:any)=>{
      this.proyectos = data.projects;
      console.log("Ahora sí, array de proyectos:", this.proyectos);
    },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("peticion de lista de proyectos completada");
      }
  });
}

borrarProyecto(id:string) {
  Swal.fire({
    title: '¿Seguro que desea eliminar el proyecto?',
    text: "No podrás revertir esta accion.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrarlo'
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí va tu llamada al servicio

      const urlBorrado = `${this.proyectoService.url}deleteProject/${id}`;
      this.http.delete(urlBorrado).subscribe(
        (res:any) => {
          this.proyectos = this.proyectos.filter((p:any) => p._id !== id);
          Swal.fire('¡Eliminado!', 'El proyecto ha sido borrado.', 'success');
        },
        error => Swal.fire('Error', 'No se pudo eliminar el proyecto.', 'error')
      );
    }
  });
}


//Restaurar proyectos
cargando: boolean = false;

restaurar() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esto cargará los proyectos iniciales en la base de datos.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f39c12',
    cancelButtonColor: '#7f8c8d',
    confirmButtonText: 'Sí, restaurar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.cargando = true;
      this._projectService.restoreProjects().subscribe({
        next: () => {
          this.cargando = false;
          this.getprojectsAdmin();
          Swal.fire('¡Hecho!', 'Base de datos restaurada.', 'success');
        },
        error: () => {
          this.cargando = false;
          Swal.fire('Error', 'No se pudo completar la restauración.', 'error');
        }
      });
    }
  });
}

// Para la imagen
obtenerUrlImagen(rutaEnBD: string): string {
  if (rutaEnBD.startsWith('http')) {
    return rutaEnBD;
  }
  // 2. Si es una ruta antigua local (sin http), añádele el dominio de Render.
  return 'https://landingpage-ezzw.onrender.com' + rutaEnBD;
}


abrirFormulario(p:any) {
  console.log("¡Lápiz pulsado! Proyecto:", p);
  this.proyectoAEditar = p;
  this.mostrarFormulario = true;
  console.log("Estado de mostrarFormulario:", this.mostrarFormulario);
  }

  // Llama a esto cuando el formulario termine de guardar
cerrarFormulario() {
    this.mostrarFormulario = false;
    this.proyectoAEditar = null;
  }

  
}
