import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { LoginFormServicesService } from '../login-form-services.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  imports: [NgClass, NgIf, TranslateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  isNavbarFixed= window.scrollY > 120;

  constructor(public loginService: LoginFormServicesService, private translate:TranslateService) {}

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

changeLanguage(lang: string) {
  this.translate.use(lang);
}

//función de clic:
abrirLogin() {
  this.loginService.abrir();
}
}
