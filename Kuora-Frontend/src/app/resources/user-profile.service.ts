import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { userDetails } from './user-details.model';
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import { ProfilePictureService } from './profile-picture.service';
import { LoginService } from "./login.service";

interface UserFullDetails{
    code: number,
    message: string,
    user: userDetails[]
}

export interface UpdateProfile{
    n: number,
    nModified: number,
    ok: number
}

@Injectable()
export class UserProfile {
  baseImgUrl:string=environment.url_Api;
    constructor(private http : HttpClient,
                private router : Router,
                private profilePic: ProfilePictureService,
                private loginService: LoginService) { }

        private userDetails: userDetails = {
            name: 'Undefined',
            email: 'Undefined',
            signupas: 'Undefined',
            bio: 'Undefined',
            verified: 'Undefined',
            blocked: false,
            pic: 'Undefined',
        };

    // getUserProfileDetails(email: string){
    //     this.getProfileByEmail(email);
    //     return this.userDetails;
    // }

    // updateUserProfile(email: string, userData: any){
    //     this.updateUserProfileByEmail(email, userData).subscribe( res => {
    //         this.getProfileByEmail(email);
    //       }
    //     );
    // }

    getProfileByEmail(email: string) {
            return this.http.get<UserFullDetails>(environment.url_Api + 'register_get_email/'+ email)
              .pipe(catchError(this.errorHandler),tap(responseData => {
                this.userDetails.name = responseData.user[0].name;
                this.userDetails.email = responseData.user[0].email;
                this.userDetails.bio = responseData.user[0].bio;
                this.userDetails.signupas = responseData.user[0].signupas;
                if(responseData.user[0].pic)
                {
                  this.userDetails.pic = this.baseImgUrl+responseData.user[0].pic;
                  this.profilePic.setProfileInfo(this.userDetails.pic);
                }
                else
                {
                  this.userDetails.pic = 'https://t4.ftcdn.net/jpg/01/07/85/89/360_F_107858989_SJogeLthvc6WZ6lP6EsuLlxIRNtsz4JH.jpg';
                }
                this.userDetails.verified = responseData.user[0].verified;
                this.userDetails.blocked = responseData.user[0].blocked;
                this.profilePic.setFullProfileInfo(this.userDetails);
                this.loginService.setActiveUserDetails(this.userDetails);
            }));
    }

    public updateUserProfileByEmail(email: string, userData: any){
        // if(email != 'Undefined'){
            return this.http.post<UpdateProfile>(environment.url_Api + 'register_update/'+ email, userData)
              .pipe(catchError(this.errorHandler),tap(responseData => {
                console.log(responseData);
            }));
        // }
    }

  private errorHandler(errRes: HttpErrorResponse){
    console.error(errRes.error.status_message)
    return throwError(errRes);
  }
}
