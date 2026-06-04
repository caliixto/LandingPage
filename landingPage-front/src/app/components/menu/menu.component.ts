import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { LoginFormServicesService } from '../login-form-services.service';

@Component({
  selector: 'app-menu',
  imports: [NgClass, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  isNavbarFixed= window.scrollY > 120;

  constructor(public loginService: LoginFormServicesService) {}

  ngOnInit(){
    this.metodoQueEscuchaScroll();
  }

  @Input() isDarkMode = false;
  @Output() isPulse = new EventEmitter();

  @HostListener('window:scroll')
  metodoQueEscuchaScroll() {

    this.isNavbarFixed= window.scrollY > 120;
  }

  metodoPulse(){
    this.isPulse.emit();
  }



// En tu función de clic:
abrirLogin() {
  this.loginService.abrir();
}
}
