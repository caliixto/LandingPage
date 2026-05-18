import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      edad: new FormControl('', [Validators.required, Validators.min(18)]),
      password : new FormControl('', [Validators.required, Validators.min(6)])
    });
  
    onSubmit(){
      if(this.formulario.valid){
        console.info("El forulario esta enviado" , this.formulario.value)
      }else{
        console.warn(" El formulario no es valido");
      }
    }
}
