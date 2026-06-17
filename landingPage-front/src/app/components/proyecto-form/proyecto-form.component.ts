import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ProyectoService} from '../services/proyecto.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {Subject } from 'rxjs';

@Component({
  selector: 'app-proyecto-form',
  imports: [FormsModule,ReactiveFormsModule, NgIf],
  templateUrl: './proyecto-form.component.html',
  styleUrl: './proyecto-form.component.css'
})
export class ProyectoFormComponent {
  mensajeExito: boolean = false;
  @Input() proyectoAEditar: any = null;

  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
    tags: new FormControl('', [Validators.required])
  });

  private proyectoGuardadoSubject = new Subject<void>();
  proyectoGuardado$ = this.proyectoGuardadoSubject.asObservable();

  // Elimina 'public formData: FormData = new FormData();' de aquí arriba
  public archivoSeleccionado: File | null = null;
  esModoEdicion: boolean = false;

  ngOnInit() {
  if (this.proyectoAEditar) {
    // Si recibimos un proyecto, rellenamos el formulario
    this.formulario.patchValue({
      titulo: this.proyectoAEditar.titulo,
      tags: this.proyectoAEditar.tags
    });
  }
}

  proyecto = { titulo: '', tags: '', imagen: '' };

  constructor(private formProyecto: ProyectoService) {}

  guardarOActualizar() {
    // 1. Extraemos los valores con seguridad
    const titulo = this.formulario.get('titulo')?.value || '';
    const tags = this.formulario.get('tags')?.value || '';

    // 2. Creamos el FormData
    const formData = new FormData();
    
    // 3. Añadimos los datos (ahora garantizamos que son strings)
    formData.append('titulo', titulo);
    formData.append('tags', tags);
    
    if (this.archivoSeleccionado) {
    formData.append('file0', this.archivoSeleccionado);
  }

  if (this.proyectoAEditar) {
    // CASO ACTUALIZAR: Llamamos al servicio de actualizar
    this.formProyecto.updateProject(this.proyectoAEditar._id, formData).subscribe({
      next: (res) => {
        this.mensajeExito = true;
        // ... (tu lógica de timeout y cerrar)
      }
    });
  } else {

    // 4. Enviamos al servicio
    this.formProyecto.saveProject(formData).subscribe({
        next: (res) => {
            this.mensajeExito = true;
            // Al hacer el next() en el servicio, la lista se actualizará sola
            setTimeout(() => {
                this.mensajeExito = false;
                this.clear();
                this.cerrar.emit(); 
            }, 2000);
        }
    });
  }
}

  subirArchivo(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.archivoSeleccionado = target.files[0];
      console.log('Archivo seleccionado:', this.archivoSeleccionado);
    }
  }

  clear(){
    this.formulario.reset();
  }


  @Output() cerrar = new EventEmitter();
}
