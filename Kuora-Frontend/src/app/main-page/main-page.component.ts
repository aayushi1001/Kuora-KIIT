import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PostCallService} from "../resources/post-call.service";
import {Router} from "@angular/router";
import {PostStoreService} from "../resources/post-store.service";
import {Post} from "../resources/post.model";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  status: boolean = true;
  constructor(private router: Router ,private postCallService:PostCallService, private poststoreService:PostStoreService) { }

  ngOnInit(): void {
    this.postCallService.postSession().subscribe(responseData => {
        if(responseData.code===200 && responseData.message==='Post Successfully found')
        {
          this.poststoreService.setEmpty();
          if(responseData.post!=null )
          {
            let postArray:Post[]=responseData.post;
            for(let eachpost of postArray){

              let creator_email='';
              let title = '';
              let tag = '';
              let article='';
              let postid='';
              let verified=false;


              creator_email= eachpost.creator_email===undefined ?'':eachpost.creator_email;
              title = eachpost.title ===undefined ?'':eachpost.title;
              tag =  eachpost.tag===undefined ?'': eachpost.tag;
              article = eachpost.article===undefined ?'':eachpost.article;
              postid =eachpost.postid===undefined ?'':eachpost.postid;
              verified = eachpost.verified === undefined? false : eachpost.verified;


              this.poststoreService.setPosts(creator_email,title,tag,article,postid,verified);

            }
          }
        }
        else{
          console.log("Post Not Found !!!");
        }
      },
      errorMessage=>{
        console.log(errorMessage);
      })
    this.router.navigate(['/main-page/display-area/all']);
  }



  changeStatusHandler(status: boolean): void {
    this.status= status;
  }
}
