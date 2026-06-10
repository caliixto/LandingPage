import { Component, EventEmitter, Output } from '@angular/core';
import { FormularioComponent } from '../formulario/formulario.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contacto',
  imports: [FormularioComponent, TranslateModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

 verFormulario = false;

  activarForumulario() {
    this.verFormulario = true;
  }

  desactivarFormulario(){
    this.verFormulario = false;
  }

}
