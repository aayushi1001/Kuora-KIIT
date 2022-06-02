import { Component, Input, OnInit } from '@angular/core';
import {TagsService} from "../../resources/tags.service";

@Component({
  selector: 'app-sidenav-page',
  templateUrl: './sidenav-page.component.html',
  styleUrls: ['./sidenav-page.component.css']
})
export class SidenavPageComponent implements OnInit {
  @Input()
  status: boolean = true;
  Tags:  {label:string , icon:string} [] | undefined;
  constructor(private tags: TagsService) { }

  ngOnInit(): void {
    this.Tags = this.tags.getTagNames();
  }

}
