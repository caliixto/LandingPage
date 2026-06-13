import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-project',
  imports: [TranslateModule],
  templateUrl: './projects-project.component.html',
  styleUrl: './projects-project.component.css'
})
export class ProjectsProjectComponent {

  public listaproyectos:any;
  public cargando: boolean = true;

  constructor(private _ProjectService:ProjectService){


  }

ngOnInit(): void { 
    this._ProjectService.getProject().subscribe({
      next: (data:any) => {
        // Apuntamos directamente a la propiedad que tiene el array en el JSON
        this.listaproyectos = data.projects; 
        this.cargando = false;
        console.log("Ahora sí, array de proyectos:", this.listaproyectos);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("peticion de lista de proyectos completada");
      }
    });
  }

  //Para la imagen
obtenerUrlImagen(rutaEnBD: string): string {
  // 1. Si la ruta ya tiene '/uploads/', solo le pegamos el dominio
  if (rutaEnBD.includes('/uploads/')) {
    return 'https://landingpage-ezzw.onrender.com' + rutaEnBD;
  }
  
  // 2. Si solo tiene el nombre del archivo, le añadimos la carpeta
  return 'https://landingpage-ezzw.onrender.com/uploads/images/' + rutaEnBD;
}

}
