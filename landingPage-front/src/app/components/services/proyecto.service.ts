import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private urlBase = window.location.hostname === 'localhost' 
    ? 'http://localhost:3977/api/' 
    : 'https://landingpage-ezzw.onrender.com/api/';

  // Ahora puedes construir tus rutas basándote en esta URL
  public url = this.urlBase;
  
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

  updateProject(id: string, data: FormData): Observable<any> {
  return this.http.put(this.url + 'updateProject' + id, data);
  }
}