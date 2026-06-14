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
    this.cargarVoiceflowChat();
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

   cargarVoiceflowChat(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
    script.async = true;
    
    script.onload = () => {
      // Usamos (window as any) para saltarnos el tipado estricto de TypeScript
      const globalWindow = window as any;
      if (globalWindow.voiceflow && globalWindow.voiceflow.chat) {
        globalWindow.voiceflow.chat.load({
          verify: { projectID: '6a2e87ce143a2331ddf6151f' },
          url: 'https://general-runtime.voiceflow.com',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }
    };

    // Buscamos el primer script de la página para inyectarlo justo al lado (igual que hacía el código original)
    const primerScript = document.getElementsByTagName('script')[0];
    if (primerScript && primerScript.parentNode) {
      primerScript.parentNode.insertBefore(script, primerScript);
    } else {
      document.body.appendChild(script);
    }
  }
 
}
