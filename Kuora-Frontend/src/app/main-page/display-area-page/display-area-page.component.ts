import {Component, Input, OnInit} from '@angular/core';
import {PostStoreService} from "../../resources/post-store.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { Subscription } from 'rxjs';
import {Post} from "../../resources/post.model";
import {PostCallService} from "../../resources/post-call.service";

@Component({
  selector: 'app-display-area-page',
  templateUrl: './display-area-page.component.html',
  styleUrls: ['./display-area-page.component.css']
})
export class DisplayAreaPageComponent implements OnInit {
  @Input()
  status: boolean = true;
  constructor(private route:ActivatedRoute,private postCallService:PostCallService,private poststoreService:PostStoreService, private router: Router) { }

  paramsSubscription: Subscription =new Subscription;
  category:string='';
  post:Post[] = [];
  private postsSub:Subscription= new Subscription();
  ngOnInit(): void {
    this.paramsSubscription =this.route.params.subscribe((params:Params) =>{
    this.post=[];
    this.category = params['category'];
    if(this.category === "all")
    {
      this.post=this.poststoreService.getPosts();
    }
    else {
      this.post = this.poststoreService.getPostCategory(this.category);
    }
  })

    this.postsSub = this.poststoreService.getPostUpdateListner().subscribe((posts:Post[])=>{
      // this.post=posts;
      if(this.category === "all")
      {
        this.post=this.poststoreService.getPosts();
      }
      else {
        this.post = this.poststoreService.getPostCategory(this.category);
      }
    })


  }


  checkUnverified(post:Post) {
      return !post.verified;
  }
  checkVerified(post:Post) {
    return post.verified;
  }

  onfilter(tag:string)
  {
    if( tag=== 'verified')
    {
      if(this.category === 'all')
      {
        this.post=this.poststoreService.getPosts().filter(this.checkVerified);
      }
      else {
        this.post = this.poststoreService.getPostCategory(this.category).filter(this.checkVerified);
      }
    }
    else if(tag === 'unverified'){
      if(this.category === 'all')
      {
        this.post=this.poststoreService.getPosts().filter(this.checkUnverified);
      }
      else {
        this.post = this.poststoreService.getPostCategory(this.category).filter(this.checkUnverified);
      }
    }
    else {
      if(this.category === 'all')
      {
        this.post=this.poststoreService.getPosts();
      }
      else {
        this.post = this.poststoreService.getPostCategory(this.category);
      }

  }

  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }



}
