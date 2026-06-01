import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services-Project/project.service';

@Component({
  selector: 'app-projects-project',
  imports: [],
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
        // CORRECCIÓN: Apuntamos directamente a la propiedad que tiene el array en tu JSON
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

}
