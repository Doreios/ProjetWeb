import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  nbArticles:number = 12;
  prixTotal:number = 11.2;
  ngOnInit() {
  }

}
