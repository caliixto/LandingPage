import { Component } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-contacto',
  imports: [FormularioComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  verFormulario = false;

  activarForumulario() {
    this.verFormulario = true;
  }

}
