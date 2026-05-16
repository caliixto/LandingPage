import { Component, Input } from '@angular/core';
import {MenuComponent} from '../app/components/menu/menu.component';
import { BannerComponent } from "../app/components/banner/banner.component";
import { ServicesComponent } from "./components/services/services.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { EstadisticasComponent } from "./components/estadisticas/estadisticas.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { ClientesComponent } from "./components/clientes/clientes.component";
import { NoticiasComponent } from "./components/noticias/noticias.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SwitcherComponent } from "./components/switcher/switcher.component";
import { MobileMenuComponent } from "./components/mobile-menu/mobile-menu.component";

@Component({
  selector: 'app-root',
  imports: [MenuComponent, BannerComponent, ServicesComponent, ProjectsComponent,
    EstadisticasComponent, ReviewsComponent, ClientesComponent, NoticiasComponent,
    ContactoComponent, FooterComponent, SwitcherComponent, MobileMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'landingPage';
  @Input() isDarkMode = false
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  menuAbierto = false;

  toggleMenu(){
    this.menuAbierto = !this.menuAbierto;
  }
}
