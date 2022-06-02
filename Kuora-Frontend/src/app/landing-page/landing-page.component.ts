import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  gotologin: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleToLogin(data : boolean){
    this.gotologin = data;
  }

  toggleToregistration(data: boolean){
    this.gotologin = data;
  }
}
