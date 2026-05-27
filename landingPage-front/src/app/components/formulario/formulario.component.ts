import { NgIf } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import emailjs from '@emailjs/browser';

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
    mensaje : new FormControl('', [Validators.required, Validators.min(6)]),
  });

  onSubmit(){
      if(this.formulario.valid){
        const fechaActual = new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
        });

    // 2. Juntamos los datos del formulario Y la nueva variable 'time'
        const datosEnvio = {
        ...this.formulario.value, 
          time: fechaActual  
        };
        emailjs.send(
          'service_ojq8cdv',
          'template_deg8nhy',
          datosEnvio,
          'B1O6K2uG_xkIXIMjt'
        ).then((response)=> {
          // ¡ÉXITO! El correo ya está viajando
        console.log('¡Correo enviado con éxito!', response.status, response.text);
        alert('¡Presupuesto solicitado correctamente! Nos pondremos en contacto contigo.');
        
        //Limpiamos los inputs
        this.clear();
        
        //Mandamos el aviso al padre para que oculte el formulario y vuelva el botón
        this.cerrar.emit();

        }).catch((error) => {
        // Por si acaso falla algo (red, límites, etc.), para que no te quedes a ciegas
        console.error('Error al enviar el correo:', error);
        alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
        });
      }else {
        // Si el usuario intenta darle al botón con campos vacíos o incorrectos
        this.formulario.markAllAsTouched();
      }
  }

  clear(){
    this.formulario.reset();
  }

  @Output() cerrar = new EventEmitter();

}
