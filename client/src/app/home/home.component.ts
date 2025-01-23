import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Output() switchComponent = new EventEmitter<string>();

  navigateToSignup() {
    this.switchComponent.emit('signup');
  }

  navigateToRegister() {
    this.switchComponent.emit('register');
  }


  
  registerMode = false;

  registerToggle(){
    this.registerMode = !this.registerMode;
  }
}
