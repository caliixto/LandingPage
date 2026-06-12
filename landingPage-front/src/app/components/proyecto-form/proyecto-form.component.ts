import { Component } from '@angular/core';
import { ProyectoService} from '../services/proyecto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proyecto-form',
  imports: [FormsModule],
  templateUrl: './proyecto-form.component.html',
  styleUrl: './proyecto-form.component.css'
})
export class ProyectoFormComponent {
  esModoEdicion: boolean = false;

  proyecto = {
    titulo: '',
    tags: '',
    imagen: ''
  };

    constructor(private formProyecto:ProyectoService){}

  guardarOActualizar() {
    const formData = new FormData();
    
    // Añadimos los datos al "sobre"
    formData.append('titulo', this.proyecto.titulo);
    formData.append('tags', this.proyecto.tags);
    
    // Si hay un archivo, lo añadimos también
    if (this.archivoSeleccionado) {
      formData.append('imagen', this.archivoSeleccionado);
    }

    // Llamamos al servicio pasando el formData en lugar del objeto proyecto
    this.formProyecto.saveProject(formData).subscribe({
      next: (res) => alert('¡Guardado con éxito!'),
      error: (err) => {
    console.log("--- DETALLE DEL ERROR ---");
    console.log("Status:", err.status);
    console.log("Cuerpo del error (err.error):", err.error); // Aquí está la clave
    console.log("Mensaje:", err.error.message); // Si tu API envía un campo 'message'
  }
    });
}

// Variable para guardar el archivo seleccionado
archivoSeleccionado: File | null = null;

// Esta función se ejecuta cuando el usuario elige una imagen
subirArchivo(event: any) {
  this.archivoSeleccionado = event.target.files[0];
  console.log('Archivo seleccionado:', this.archivoSeleccionado);
}
}
