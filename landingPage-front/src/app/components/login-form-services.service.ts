import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


export interface Usuario{
  usuario:string,
  password:string
}


@Injectable({
  providedIn: 'root'
})
export class LoginFormServicesService {

  private url = window.location.hostname === 'localhost' 
  ? 'http://localhost:3977/api/admin/login' 
  : 'https://landingpage-ezzw.onrender.com/api/admin/login';
  

  abierto: boolean = false; // La variable maestra

  abrir() { 
    this.abierto = true; 
  }

  cerrar(){ 
    this.abierto = false; 
  }

  constructor(private http: HttpClient) { }

  eviarDatos(usuario:Usuario){
    return this.http.post(this.url, usuario);
  }

  iniciarSesion(token:string){
    localStorage.setItem("adminToken", token)
  }

  estarLogueado():boolean{
    return !!localStorage.getItem("adminToken");
  }

  cerrarSesion(){
    localStorage.removeItem("adminToken");
  }
}
