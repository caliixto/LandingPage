import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private urlBase = window.location.hostname === 'localhost' 
    ? 'http://localhost:3977/api/' 
    : 'https://landingpage-ezzw.onrender.com/api/';

  // Ahora puedes construir tus rutas basándote en esta URL
  public url = this.urlBase;
  
  constructor(private http: HttpClient) { }

  getProject(){
    //  variable dinámica:
    return this.http.get(this.url + 'list'); 
  }

  restoreProjects(): Observable<any> {
    // Para Restuarar los proyectos
    return this.http.post(this.url + 'restoreProjects', {});
  }
}

