import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../resources/post.model";
import {environment} from 'src/environments/environment'
import {PostCallService} from "../../../resources/post-call.service";
import {LoginService} from "../../../resources/login.service";
import {VoteService} from "../../../resources/vote.service";
import {CommentService} from "../../../resources/comment.service";
@Component({
  selector: 'app-post-card-page',
  templateUrl: './post-card-page.component.html',
  styleUrls: ['./post-card-page.component.css']
})
export class PostCardPageComponent implements OnInit {
  @Input()
  element:Post=new Post('','','','','',false);

  baseImgUrl:string=environment.url_Api;
  reason:string="";
  commenttxt:string="";
  modalId:string="#reportModal";
  voteCount:number=0;
  vote:{voter_email: string, post_id: string, rating: number}[]=[];
  myVote:{voter_email: string, post_id: string, rating: number}[]=[];
  checkVote = false;
  checkComment = false;
  commentCount:number=0;
  comment:{comment_email: string, post_id: string, commenttxt: string}[]=[];
  constructor(private postCallService: PostCallService, private loginService: LoginService, private voteService: VoteService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.postCallService.postImg(this.element.creator_email).subscribe(responseData => {
        if(responseData.code===200 && responseData.message==='User Successfully found')
        {
          if(responseData.user!=null )
          {
            let imgUrl:string =responseData.user[0].pic;
            this.baseImgUrl+=imgUrl;

          }
        }
        else{
          console.log("Post Not Found !!!");
        }
      },
      errorMessage=>{
        console.log(errorMessage);
      })

    this.commentService.commentSession(this.element.postid).subscribe(responseData => {
        if(responseData.code===200){
          this.comment= responseData.comment;
          this.commentCount=this.comment.length;
        }
      }
    )

    this.voteService.voteSession(this.element.postid).subscribe(responseData => {
        if(responseData.code===200){
          this.vote= responseData.vote;
          this.voteCount=this.vote.length;
        }
      }
    )

    this.voteService.voteSessionId(this.element.postid,this.loginService.getActiveUserDetails().email).subscribe(responseData =>{
      if(responseData.code===200){
        this.myVote = responseData.vote;
        if(this.myVote.length>0)
        {
          this.checkVote = true;
        }
      }
    })
  }

  report(ele:Post)
  {
    let reporter = this.loginService.getActiveUserDetails().email;
    this.postCallService.reportPost(ele.postid,ele.title,this.reason,reporter,ele.creator_email)
      .subscribe(responseData => {
          console.log(responseData);
          this.handleSignup(responseData.code,responseData.message);
        },
        errorMessage=>{

          console.log(errorMessage);
        })
  }
  handleSignup(code: number, message: string){
    if(code===200)
    {
      console.log(message);
    }
    else{
      console.log("Fail Report");
    }
  }
  commentCall()
  {
    this.commentService.commentPostSession(this.loginService.getActiveUserDetails().email,this.element.postid,this.commenttxt).subscribe(responseData =>{
      if(responseData.code===200){
        console.log("Comment Success");
        this.comment.push({comment_email: this.loginService.getActiveUserDetails().email,post_id: this.element.postid,commenttxt:this.commenttxt});
        this.commenttxt = "";
        this.commentCount++;
        console.log(this.comment);
      }
    })
  }
  voteCall()
  {
    if(!this.checkVote) {
      this.voteService.votePostSession(this.loginService.getActiveUserDetails().email, this.element.postid).subscribe(responseData => {
        if (responseData.code === 200) {
          this.checkVote = true;
          this.voteCount++;
        }
      })
    }
  }

  commentToggle(){
    this.checkComment = !this.checkComment;
  }

}
