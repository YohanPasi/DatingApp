import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  http = inject(HttpClient);
  title = 'DatingApp';
  users: any;

  ngOnInit(): void
  {
    this.http.get('https://localhost:6001/api/users').subscribe({
      next: (response) => this.users = response,
      error: (error) => console.log(error),
      complete: () => console.log('Request has completed!')
    })
  }

}
