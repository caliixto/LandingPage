import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf} from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {LoginFormServicesService, Usuario } from '../login-form-services.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, NgIf, TranslateModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  mensaje = '';
  formulario = new FormGroup({
  usuario: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
  password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

    constructor(private loginService: LoginFormServicesService, 
    private router: Router) {
  }


  Onsubmit() {
  if (this.formulario.valid) {
    this.mensaje = '';
    // Aquí enviamos el formulario (que ya es el objeto {usuario, password})
    this.loginService.eviarDatos(this.formulario.value as Usuario).subscribe({
      next: (res: any) => {
        // Suponiendo que 'res' contiene el token y el objeto usuario
        if (res.status === 'success') {
          
          // 1. Guardar token
          this.loginService.iniciarSesion(res.token); 

          // 2. Guardar foto (aquí usamos el campo que viene del servidor)
          if (res.usuario && res.usuario.imagenUrl) { // Ajustado a tu nombre en DB
            const apiBaseUrl = window.location.hostname === 'localhost' 
              ? 'http://localhost:3977' 
              : 'https://landingpage-ezzw.onrender.com';
            
            const urlCompleta = apiBaseUrl + res.usuario.imagenUrl;
            localStorage.setItem('fotoPerfil', urlCompleta);
          }

          // 3. Limpiar y redirigir
          this.clear();
          this.loginService.cerrar();
          this.router.navigate(['/adminPanel']); // Asegúrate de que esta ruta existe
        }
      },
      error: () => {
        this.mensaje = 'LOGIN.ERROR_INVALID_CREDENTIALS';
      }
    });
  }
}

clear(){
  this.formulario.reset();
}

cerrarModal(){
  this.loginService.cerrar();
}

@Output() cerrar = new EventEmitter();

  //Formulario login

   verFormularioLogin = false;

  activarForumularioLogin() {
    this.verFormularioLogin = true;
  }


}