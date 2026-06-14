import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = 'https://landingpage-ezzw.onrender.com/api/project/';
  
  constructor(private http: HttpClient) { }

  getProject(){
    //  variable dinámica:
    return this.http.get(this.url + 'list'); 
  }

  restoreProjects(): Observable<any> {
    // Nota: Al ser una acción administrativa, asegúrate de enviar el token si tienes seguridad
    return this.http.post(this.url + 'restoreProjects', {});
  }
}

