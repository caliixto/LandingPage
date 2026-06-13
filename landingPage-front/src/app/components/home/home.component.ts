import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { ProjectsProjectComponent } from '../projects-project/projects-project.component';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { NoticiasComponent } from '../noticias/noticias.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { FooterComponent } from '../footer/footer.component';
import { ServicesComponent } from '../services/services.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { MenuComponent } from '../menu/menu.component';
import { SwitcherComponent } from '../switcher/switcher.component';

@Component({
  selector: 'app-home',
  imports: [
    BannerComponent,
    ServicesComponent, 
    ProjectsProjectComponent, 
    EstadisticasComponent,
    ReviewsComponent,
    ClientesComponent,
    NoticiasComponent,
    ContactoComponent,
    FooterComponent,
    MobileMenuComponent,
    MenuComponent,
    SwitcherComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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


  menuAbierto = false;

  toggleMenu(){
    this.menuAbierto = !this.menuAbierto;
  }
}
