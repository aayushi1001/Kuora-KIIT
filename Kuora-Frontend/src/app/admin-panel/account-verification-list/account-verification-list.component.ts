import { Component, OnInit } from '@angular/core';
import { GetVerificationListService } from 'src/app/resources/get-verification-list.service';
import { VerifyRequestService } from 'src/app/resources/verify-request.service';
import { RemoveFromVerificationListService } from 'src/app/resources/remove-from-verification-list.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-account-verification-list',
  templateUrl: './account-verification-list.component.html',
  styleUrls: ['./account-verification-list.component.css']
})
export class AccountVerificationListComponent implements OnInit {

  constructor(private getVerificationList : GetVerificationListService , private verifyService : VerifyRequestService , private RemoveVerification: RemoveFromVerificationListService) { }

  current_user_email="";
  current_user_name="";
  current_user_message="";
  current_user_id="";
  current_user_docLink="";

  //http_link_prefix="http://localhost:3001/";

  http_link_prefix=environment.url_Api;

  Requests:any[]=[];
 ngOnInit(): void {
  this.getVerificationList.GetList().subscribe(responseData => {this.Requests=responseData.verification});
}

  // Requests=[
  //   {
     
  //     user_name:"Raj",
  //     user_email:"abc@xy.com",
  //     request_reason:"Just for fun",
  //     document:"doc_link"
  //   },
  //   {
      
  //     user_name:"Sonu Nigam",
  //     user_email:"stp@xy.com",
  //     request_reason:"Just for Sonu",
  //     document:"doc_link Sonu"
  //   }



  // ];

  createDocLink(request:any){
    this.current_user_docLink=request.documentPic;
  }

  ApproveRequest(request:any ){
    
    this.verifyService.ApproveRequest("true",request.email).subscribe(responseData => {
      if(responseData.ok===1){
      console.log("Posted : "+responseData)
      this.Requests = this.Requests.filter(function( obj ) {
        return obj.email !== request.email;
    });
      }
      else{
        console.log("Error in api");
      }
    
    });
    
  this.RemoveVerification.RemoveRequest(request._id).subscribe(responseData => {console.log("Posted : "+responseData)});
  }

  DeclineRequest(user_email:any ){
    
    this.verifyService.ApproveRequest("false",user_email).subscribe(responseData => {

      if(responseData.ok===1){
        console.log("Posted : "+responseData)
        this.Requests = this.Requests.filter(function( obj ) {
          return obj.email !== user_email;
      });
        }
        else{
          console.log("Error in api");
        }
      

    });

    this.current_user_message="";
    this.Requests = this.Requests.filter(function( obj ) {
      return obj.user_email !== user_email;
  });

  this.RemoveVerification.RemoveRequest(this.current_user_id).subscribe(responseData => {console.log("Posted : "+responseData)});

  

  }

  OpenDeclineRequestModal(request:any){
      this.current_user_email=request.email;
      this.current_user_name=request.name;
      this.current_user_id=request._id;
      
  }

}
