import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormServicesService } from '../login-form-services.service';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})

export class AdminPanelComponent {
  
  constructor(private authService: LoginFormServicesService, private router: Router ){

  }

cerrarSesion() {
  this.authService.cerrarSesion();
  this.router.navigate(['/']);
}
}
