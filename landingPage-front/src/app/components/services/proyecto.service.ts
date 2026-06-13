import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';       // <--- 1. Importa Subject
import { tap } from 'rxjs/operators'; // <--- 2. Importa tap

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private url = 'https://landingpage-ezzw.onrender.com/api/project/';
  
  // 3. Crea el canal de comunicación
  private proyectoGuardadoSubject = new Subject<void>();
  public proyectoGuardado$ = this.proyectoGuardadoSubject.asObservable();

  constructor(private http: HttpClient) { }

  saveProject(formData: FormData) {
    // 4. Usamos pipe y tap para avisar automáticamente tras el post
    return this.http.post(this.url + 'save', formData).pipe(
      tap(() => {
        this.proyectoGuardadoSubject.next();
      })
    );
  }
}