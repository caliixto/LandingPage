import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormServicesService } from './components/login-form-services.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NgIf } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingPage';
  isDarkMode = false
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem("dark", JSON.stringify(this.isDarkMode));
  }

  constructor(public loginService:LoginFormServicesService,private translate: TranslateService,
     public authService: LoginFormServicesService){

    this.translate.addLangs(['es', 'en', 'fr']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }


  ngOnInit(){
    this.getDark();
  }

  getDark(){
   this.isDarkMode = JSON.parse(localStorage.getItem("dark") || 'false');
 }

 @HostListener('document:click')
  @HostListener('document:keydown')
  resetTimer() {
    if (this.authService.estarLogueado()) {
      this.authService.continuarSesion();
    }
  }
 
}
