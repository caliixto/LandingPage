import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminProjectServiceService {

  private urlBase = window.location.hostname === 'localhost' 
    ? 'http://localhost:3977/api/' 
    : 'https://landingpage-ezzw.onrender.com/api/';

  // Ahora puedes construir tus rutas basándote en esta URL
  public url = this.urlBase;

  constructor(private http:HttpClient) { }

  getAdminProject(){
    return this.http.get(this.url + "list")
  }
}
