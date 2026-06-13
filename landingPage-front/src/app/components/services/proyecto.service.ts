import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private url = 'https://landingpage-ezzw.onrender.com/api/adminProject/';

    constructor(private http: HttpClient) { }

    saveProject(formData: FormData) {
    return this.http.post(this.url + 'save', formData);
  }
}
