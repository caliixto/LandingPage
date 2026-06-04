import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf} from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {LoginFormServicesService, Usuario } from '../login-form-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  mensaje = '';
  formulario = new FormGroup({
  usuario: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
  password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

    constructor(private __formService: LoginFormServicesService, private router: Router, private modalservices:LoginFormServicesService) {
  }


  Onsubmit(){
    if(this.formulario.valid){
    console.log("Lo que estoy enviando:", this.formulario.value);
    }
    this.__formService.eviarDatos(this.formulario.value as Usuario).subscribe({
    next: (res:any) => {
    this.mensaje = res.mensaje;
    //Limpiamos los input
    this.clear();
    this.modalservices.cerrar();
    // 3. Redireccionar
    if (res.status === 'success') {
        this.router.navigate(['/adminPanel']);
    }
  },
    error: (err) => {
      // 3. Si hay error (401 o 404), el servidor entra aquí
      this.mensaje = 'Error: ' + (err.error.mensaje || 'Credenciales incorrectas');
    }
  })
}

clear(){
  this.formulario.reset();
}

@Output() cerrar = new EventEmitter();

  //Formulario login

   verFormularioLogin = false;

  activarForumularioLogin() {
    this.verFormularioLogin = true;
  }


}