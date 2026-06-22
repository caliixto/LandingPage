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
  private ultimaActividad: number = Date.now();

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
      this.iniciarTemporizadorInactividad();

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          const tiempoRealPasado = Date.now() - this.ultimaActividad;
          
          // Si al volver ya pasaron los 2.5 min, forzamos el aviso inmediatamente
          if (tiempoRealPasado >= 150000 && !this.mostrarAviso) {
            this.mostrarAviso = true;
            this.verificarAlDespertar();
          }
        }
      });
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
    localStorage.removeItem('adminToken');
    this.router.navigate(['/']).then(() => {});
  }

  iniciarTemporizadorInactividad() {
    clearTimeout(this.logoutTimer);
    this.ultimaActividad = Date.now(); // Guardamos el momento de inicio (Fecha Acual)

    this.logoutTimer = setTimeout(() => {
        // Cuando el timer "despierta", verificamos si realmente pasaron 2.5 min
        const tiempoRealPasado = Date.now() - this.ultimaActividad;
        
        if (tiempoRealPasado >= 150000) {
          this.mostrarAviso = true;
          this.iniciarCuentaAtras();
        } else {
          const tiempoRestante = 150000 - tiempoRealPasado;
          this.logoutTimer = setTimeout(() => this.iniciarTemporizadorInactividad(), tiempoRestante);
        }
    }, 150000); 
  }

  verificarAlDespertar() {
  const tiempoRealPasado = Date.now() - this.ultimaActividad;

  // Si han pasado más de 2.5 minutos (150,000ms), salta el aviso YA
  if (tiempoRealPasado >= 150000 && !this.mostrarAviso) {
    this.mostrarAviso = true;
    this.iniciarCuentaAtras();
  }
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
