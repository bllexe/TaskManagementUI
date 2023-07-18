import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/security/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLoggedIn!:boolean;
  username:string ='';

  constructor(@Inject(DOCUMENT) private document:Document,
             private authService:AuthenticationService,private router:Router){}

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
     this.authService.username.subscribe((data: string) => this.username = data);
    
  }

  sidebarToggle(){

    this.document.body.classList.toggle('toggle-sidebar');
    const toggleButton = document.querySelector('.toggle-sidebar-btn');
    toggleButton?.classList.toggle('move-toggle');
  }

}
