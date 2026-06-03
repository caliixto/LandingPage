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

  private url = 'http://localhost:3977/api/admin/login';

  constructor(private http: HttpClient) { }

  eviarDatos(usuario:Usuario){
    return this.http.post(this.url, usuario);
  }
}
