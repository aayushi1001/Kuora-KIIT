import { Component, OnInit } from '@angular/core';
import { GetUserListService } from 'src/app/resources/get-user-list.service';
import { VerifyRequestService } from 'src/app/resources/verify-request.service';
import {environment} from 'src/environments/environment'

// kuorateam@gmail.com
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private getUsersService : GetUserListService, private verifyService : VerifyRequestService ) { }
  current_user:any;

  http_link_prefix=environment.url_Api;

  UsersList:any[]=[];
 ngOnInit(): void {
  this.getUsersService.GetList().subscribe(responseData => {this.UsersList=responseData.user});
}

BlockUser(user:any ){
    
  this.verifyService.ChangeUserStatus("true",user.email).subscribe(responseData => {console.log("Blocked : "+responseData)
  if(responseData.ok===1){
      user.blocked=!user.blocked;
  }
  else{
    console.log("Error in api");
  }
});

  //this.getUsersService.GetList().subscribe(responseData => {this.UsersList=responseData.user});

}

UnblockUser(user:any ){
    
  this.verifyService.ChangeUserStatus("false",user.email).subscribe(responseData => {
    
    if(responseData.ok===1){
      user.blocked=!user.blocked;
  }
  else{
    console.log("Error in api");
  }
    console.log("Unblocked : "+responseData)
  
  
  });
  //this.getUsersService.GetList().subscribe(responseData => {this.UsersList=responseData.user});

}

OpenUserModal(user:any){
  this.current_user=user;
  
}
  

}
