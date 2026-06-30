import { Component, HostListener } from '@angular/core';
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
  proyectosEliminados: any[] = [];
  
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

  fotoPerfil: string = ''; 

 ngOnInit() {
  const urlGuardada = localStorage.getItem('fotoPerfil');
  const papeleraGuardada = localStorage.getItem('papelera');
  if (papeleraGuardada) {
    this.proyectosEliminados = JSON.parse(papeleraGuardada);
  }

  if (urlGuardada) {
    this.fotoPerfil = urlGuardada;
  } else {
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
      const urlBorrado = `${this.proyectoService.url}deleteProject/${id}`;
      this.http.delete(urlBorrado).subscribe(
        (res:any) => {
        const proyectoGuardado = this.proyectos.find((p: any) => p._id === id);
        if (proyectoGuardado) {
          this.proyectosEliminados.push(proyectoGuardado);
          localStorage.setItem('papelera', JSON.stringify(this.proyectosEliminados));
        }
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
  if (this.proyectosEliminados.length === 0) {
    Swal.fire('Info', 'No hay nada en la papelera para restaurar.', 'info');
    return;
  }
  Swal.fire({
    title: '¿Restaurar Proyectos eliminados?',
    text: `Vas a recuperar ${this.proyectosEliminados.length} proyectos.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#f39c12',
    cancelButtonColor: '#7f8c8d',
    confirmButtonText: 'Sí, recuperar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.proyectos = [...this.proyectos, ...this.proyectosEliminados];
      
      this.proyectosEliminados = [];
      
      Swal.fire('¡Hecho!', 'Proyectos recuperados.', 'success');
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

  @HostListener('document:click', ['$event'])
  @HostListener('document:keydown', ['$event'])
onUserActivity() {
  // cuando el usuario toca cualquier parte de la la pantalla el contador, se vuelve a reiniciar
  this.authService.continuarSesion(); 
}

  
}
