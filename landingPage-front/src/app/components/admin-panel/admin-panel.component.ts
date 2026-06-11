import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormServicesService } from '../login-form-services.service';
import { AdminProjectServiceService } from '../services/admin-project-service.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  imports: [NgFor],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})

export class AdminPanelComponent {

  public proyectos:any;
  
  constructor(private authService: LoginFormServicesService, private router: Router, private _adminProjectService:AdminProjectServiceService){

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
  
}
