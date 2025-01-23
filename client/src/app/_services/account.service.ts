import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../_models/users';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient);
  baseUrl = 'https://localhost:6001/api/';

  currentUser = new BehaviorSubject <User | null>(null);

  login(model:any){
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      tap((user: User) =>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.next(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }

}
