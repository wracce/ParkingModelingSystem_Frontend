import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() view: string ="";

  constructor() { }

  ngOnInit(): void {
  }


  setView(view:string): void {
    this.view = view;
  }
}

