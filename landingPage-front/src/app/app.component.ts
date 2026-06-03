import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, LoginFormComponent],
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


  ngOnInit(){
    this.getDark();
  }

  getDark(){
   this.isDarkMode = JSON.parse(localStorage.getItem("dark") || 'false');
 }
}
