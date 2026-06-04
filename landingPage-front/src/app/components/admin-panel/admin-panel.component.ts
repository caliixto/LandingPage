import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormServicesService } from '../login-form-services.service';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})

export class AdminPanelComponent {
  
  constructor(private authService: LoginFormServicesService, private router: Router ){

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
    this.fotoPerfil = 'assets/imagen-por-defecto.png';
  }
}
  
}
