import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormServicesService } from './components/login-form-services.service';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NgIf } from '@angular/common';


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

  constructor(public loginService:LoginFormServicesService){

  }


  ngOnInit(){
    this.getDark();
  }

  getDark(){
   this.isDarkMode = JSON.parse(localStorage.getItem("dark") || 'false');
 }

 
}
