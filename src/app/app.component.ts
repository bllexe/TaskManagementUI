import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TaskManagement';

  constructor(private elementRef: ElementRef,public _router:Router) {
    
  }

  ngOnInit(): void {
    
    var s=document.createElement("script");
    s.type="text/javascript";
    s.src="../assets/js/main.js"
    this.elementRef.nativeElement.appendChild(s);
  }

}
