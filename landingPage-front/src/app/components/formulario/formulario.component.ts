import { NgIf } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, NgIf, TranslateModule],
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

        const datosEnvio = {
  ...this.formulario.value,
  time: fechaActual
};

emailjs.send(
  'service_ojq8cdv',
  'template_deg8nhy',
  datosEnvio,
  'B1O6K2uG_xkIXIMjt'
).then((response) => {
  console.log('¡Correo enviado con éxito!', response.status, response.text);

  Swal.fire({
    title: '¡Mensaje enviado!',
    text: '¡Mensaje recibido! Gracias por confiar en mi trabajo. Revisaré los detalles de tu proyecto y te contactaré lo antes posible.',
    icon: 'success',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#00d1b2'
  });

  this.clear();
  this.desactivarFormulario();

}).catch((error) => {
  console.error('Error al enviar el correo:', error);

  Swal.fire({
    title: 'Oops...',
    text: 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo.',
    icon: 'error',
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#d33'
  });
});

} else {
  this.formulario.markAllAsTouched();
}
  }

  clear(){
    this.formulario.reset();
  }

  desactivarFormulario(){
    this.cerrar.emit()
  }


  @Output() cerrar = new EventEmitter();

}
