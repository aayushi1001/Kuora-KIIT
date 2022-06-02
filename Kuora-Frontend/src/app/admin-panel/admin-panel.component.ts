import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.navigate(['/admin-panel/verify']);
  }
  back()
  {
    this.router.navigate(['/main-page/display-area/all']);
  }
}
