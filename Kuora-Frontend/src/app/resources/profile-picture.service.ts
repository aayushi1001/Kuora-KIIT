import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { userDetails } from './user-details.model';
import jwt_decode from "jwt-decode";
import {catchError, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
// import {Post} from "./post.model";

interface LoginResponseData{
  code: number;
  message: string;
  token: string;
}

@Injectable()
export class ProfilePictureService{

  public ProfilePic :string = 'https://t4.ftcdn.net/jpg/01/07/85/89/360_F_107858989_SJogeLthvc6WZ6lP6EsuLlxIRNtsz4JH.jpg';
  public ProfilePicUpdated =new Subject<string>();
  public ProfileInfo = new Subject<userDetails>();

  constructor(private http: HttpClient) {}

  public changeProfilePicture(email: string, data: FormData){
    return this.http.post<LoginResponseData>(environment.url_Api + 'update_user_img/' + email, data)
      .pipe(catchError(this.errorHandler),tap(responseData =>{}
      ));
  }

  private errorHandler(errRes: HttpErrorResponse){
    console.error(errRes.error.status_message)
    return throwError(errRes);
  }

  resetPic(){
    this.ProfilePic = 'https://t4.ftcdn.net/jpg/01/07/85/89/360_F_107858989_SJogeLthvc6WZ6lP6EsuLlxIRNtsz4JH.jpg';
  }

  setProfileInfo(picPath: string){
    this.ProfilePic =  picPath;
    this.ProfilePicUpdated.next(this.ProfilePic);
  }

  getProfileInfo():string{
    return this.ProfilePic;
  }

  pictureUpdateListner(){
    return this.ProfilePicUpdated.asObservable();
  }

  profileInfoUpdateListner(){
    return this.ProfileInfo.asObservable();
  }

  setFullProfileInfo(data: userDetails){
    this.ProfileInfo.next(data);
  }
}
