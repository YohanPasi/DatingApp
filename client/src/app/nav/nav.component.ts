import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

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
