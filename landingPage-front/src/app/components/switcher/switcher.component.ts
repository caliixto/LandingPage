import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-switcher',
  imports: [NgIf],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.css'
})
export class SwitcherComponent {
@Output() DarkModeToggle = new EventEmitter();
@Input() activo = false;

onButtonClick() {
  this.DarkModeToggle.emit()
}

}
