import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export interface Usuario{
  usuario:string,
  password:string
}


@Injectable({
  providedIn: 'root'
})
export class LoginFormServicesService {
  private router = inject(Router);
    private logoutTimer: any;
    mostrarAviso: boolean = false; 
    segundosRestantes: number = 30;
    private intervaloCuentaAtras: any;

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

    constructor(private http: HttpClient) {
      this.iniciarTemporizadorInactividad()
    }

    eviarDatos(usuario:Usuario){
      return this.http.post(this.url, usuario);
    }

    iniciarSesion(token:string){
      localStorage.setItem("adminToken", token)
    }

    estarLogueado():boolean{
      return !!localStorage.getItem("adminToken");
    }

    cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/']).then(() => {});
  }

    iniciarTemporizadorInactividad() {
      clearTimeout(this.logoutTimer);
      
      // El aviso salta a los 2 minutos y medio (150,000ms)
      this.logoutTimer = setTimeout(() => {
          this.mostrarAviso = true;
          this.iniciarCuentaAtras();
      }, 20000); 
    }

    iniciarCuentaAtras() {
    // 1. Limpiamos por seguridad antes de crear uno nuevo
    if (this.intervaloCuentaAtras) {
        clearInterval(this.intervaloCuentaAtras);
    }
    // 2. Usamos 'this.intervaloCuentaAtras' en lugar de 'const intervalo'
    this.intervaloCuentaAtras = setInterval(() => {
        this.segundosRestantes--;
        
        if (this.segundosRestantes <= 0) {
            clearInterval(this.intervaloCuentaAtras);
            this.cerrarSesion();
        }
    }, 1000);
}

    continuarSesion() {
      // 1. Ocultar el modal
      this.mostrarAviso = false;
      // 2. Limpiar RELOJ DEL AVISO (El que resta los segundos en pantalla)
      if (this.intervaloCuentaAtras) {
          clearInterval(this.intervaloCuentaAtras);
      }
      // 3. Limpiar EL TEMPORIZADOR PRINCIPAL (El que espera los 2.5 minutos)
      if (this.logoutTimer) {
          clearTimeout(this.logoutTimer);
      }
      // 4. Resetear los segundos a 30 (o el tiempo que quieras de aviso)
      this.segundosRestantes = 30; 
      // 5. ¡VOLVER A EMPEZAR DE CERO!
      this.iniciarTemporizadorInactividad();
    }
  }
