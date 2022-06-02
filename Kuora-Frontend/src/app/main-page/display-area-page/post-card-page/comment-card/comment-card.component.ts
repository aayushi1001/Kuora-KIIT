import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {PostCallService} from "../../../../resources/post-call.service";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {
  @Input()
  comment:{comment_email: string, post_id: string, commenttxt: string} = {comment_email:'',post_id:'',commenttxt:''};
  baseImgUrl:string=environment.url_Api;
  verified:boolean = false;
  constructor(private postCallService: PostCallService) { }

  ngOnInit(): void {
    this.postCallService.postImg(this.comment.comment_email).subscribe(responseData => {
        if(responseData.code===200 && responseData.message==='User Successfully found')
        {
          if(responseData.user!=null )
          {
            let imgUrl:string =responseData.user[0].pic;
            this.baseImgUrl+=imgUrl;
            this.verified = responseData.user[0].verified;
          }
        }
        else{
          console.log("Comment Not Found !!!");
        }
      },
      errorMessage=>{
        console.log(errorMessage);
      })
  }

}
