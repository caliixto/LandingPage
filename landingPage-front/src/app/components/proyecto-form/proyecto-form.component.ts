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
  // Elimina 'public formData: FormData = new FormData();' de aquí arriba
  public archivoSeleccionado: File | null = null;
  esModoEdicion: boolean = false;

  proyecto = { titulo: '', tags: '', imagen: '' };

  constructor(private formProyecto: ProyectoService) {}

  guardarOActualizar() {
    // Creamos un formulario nuevo cada vez que guardamos
    const formData = new FormData();
    
    formData.append('titulo', this.proyecto.titulo);
    formData.append('tags', this.proyecto.tags);
    
    if (this.archivoSeleccionado) {
      formData.append('imagen', this.archivoSeleccionado);
    } else {
      alert("Por favor, selecciona una imagen.");
      return;
    }

    this.formProyecto.saveProject(formData).subscribe({
      next: (res) => alert('¡Guardado con éxito!'),
      error: (err) => {
    console.error("--- DETALLE DEL ERROR ---");
    console.error("Status:", err.status);
    console.error("Cuerpo del error (err.error):", err.error); // <--- ESTO ES LO MÁS IMPORTANTE
  }
    });
  }

  subirArchivo(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.archivoSeleccionado = target.files[0];
      console.log('Archivo seleccionado:', this.archivoSeleccionado);
    }
  }
}
