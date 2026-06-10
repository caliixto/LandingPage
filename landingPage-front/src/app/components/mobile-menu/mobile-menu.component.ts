import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginFormServicesService } from '../login-form-services.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mobile-menu',
  imports: [TranslateModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {
  @Input() isActive = false;
  @Output() cerrarMenu = new EventEmitter();

  constructor(public loginService:LoginFormServicesService){

  }
  cerrar(){
    this.cerrarMenu.emit()
  }

  submenuActivo:string = "";

  subMenu(nombre:string, event:Event){

    event.preventDefault();

    if(this.submenuActivo==nombre){
      this.submenuActivo = ""
    }else{
      this.submenuActivo = nombre
    }
  }

}
