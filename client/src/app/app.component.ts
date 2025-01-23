import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './_services/account.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private AccountService = inject(AccountService);

  http = inject(HttpClient);
  title = 'DatingApp';
  users: any;

  currentComponent: string = 'home';

  showComponent(component: string) {
    this.currentComponent = component;
  }

  ngOnInit(): void
  {
    this.getUsers();
    this.setCurrentUser();
    }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user =JSON.parse(userString);
    this.AccountService.currentUser.next(user);
  }
  

  getUsers() {
      this.http.get('https://localhost:6001/api/users').subscribe({
      next: (response) => this.users = response,
      error: (error) => console.log(error),
      complete: () => console.log('Request has completed!')
  });


  }}
