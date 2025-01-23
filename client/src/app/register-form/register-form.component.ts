import { Component } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  
})
export class RegisterFormComponent {

  model: any = {};

  register(){
    console.log(this.model);
  }

  cancel(){
    console.log('cancelled');
  }
}
