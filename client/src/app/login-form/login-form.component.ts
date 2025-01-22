import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

   private accountService = inject(AccountService);
    loggedIn = false;
  
    model: any = {};
  
    login() {
      this.accountService.login(this.model).subscribe({
        next: Response => {
          console.log(Response);
          this.loggedIn = true;
          
        },
        error: error => console.log(error)
        
      })
    }
  
    logout(){
      this.loggedIn = false;
    }

}
