import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { ProyectoService } from '../services/proyecto.service';
import { ReactiveFormsModule, Validators, FormGroup, FormControl, FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-proyecto-form',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './proyecto-form.component.html',
  styleUrl: './proyecto-form.component.css'
})
export class ProyectoFormComponent implements OnInit {
  mensajeExito: boolean = false;
  proyectoAEditar: any = null;
  esModoEdicion: boolean = false;
  public archivoSeleccionado: File | null = null;
  idProyectoActual: string | null = null;

  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    tags: new FormControl('', [Validators.required]),
    linkEnVivo: new FormControl('',[Validators.required])
  });

  @Output() cerrar = new EventEmitter();

  constructor(private formProyecto: ProyectoService) {}

  ngOnInit() {}

  // Este es el setter que recibe el proyecto desde el AdminPanel
  @Input() set proyecto(data: any) {
    if (data) {
      this.proyectoAEditar = data;
      this.idProyectoActual = data._id;
      this.esModoEdicion = true;
      this.formulario.patchValue({
        titulo: data.titulo,
        tags: data.tags
      });
      } else {
      this.proyectoAEditar = null;
      this.esModoEdicion = false;
      this.formulario.reset();
    }
  }

  guardarOActualizar() {
    const formData = new FormData();
    formData.append('titulo', this.formulario.get('titulo')?.value || '');
    formData.append('tags', this.formulario.get('tags')?.value || '');
    formData.append('linkEnVivo', this.formulario.get('linkEnVivo')?.value || '');

    if (this.archivoSeleccionado) {
      formData.append('file0', this.archivoSeleccionado);
    }

    // Llamamos al servicio
    const call = this.esModoEdicion 
      ? this.formProyecto.updateProject(this.idProyectoActual!, formData)
      : this.formProyecto.saveProject(formData);

    call.subscribe({
      next: (res) => {
        this.mensajeExito = true;
        setTimeout(() => {
          this.mensajeExito = false;
          this.clear();
          this.cerrar.emit(); 
        }, 2000);
      },
      error: (err) => {
        console.error("Error en la operación:", err);
      }
    });
  }

  subirArchivo(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.archivoSeleccionado = target.files[0];
    }
  }

  obtenerUrlImagen(rutaEnBD: string): string {
  if (rutaEnBD.startsWith('http')) {
    return rutaEnBD;
  }
  return 'https://landingpage-ezzw.onrender.com' + rutaEnBD;
}

  clear() {
    this.formulario.reset();
    this.archivoSeleccionado = null;
    this.esModoEdicion = false;
    this.proyectoAEditar = null;
  }
}