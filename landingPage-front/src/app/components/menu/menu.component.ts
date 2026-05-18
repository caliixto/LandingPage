import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [NgClass, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  isNavbarFixed= window.scrollY > 120;

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

}
