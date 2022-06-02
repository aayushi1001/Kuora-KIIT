import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'
import { Post } from "./post.model";

export interface AuthenticationResposeData{
    code: number;
    message: string;
    post:Post[];
}
export interface AuthenticationUserResposeData{
  code: number;
  message: string;
  user:{email:string ,pic:string, verified:boolean }[];
}

export interface AuthenticationReport {
  code: number;
  message:string;
}

@Injectable()
export class PostCallService {

   constructor(private http: HttpClient) { }
    postSession(){
        return this.http.get<AuthenticationResposeData>(environment.url_Api+'post_get').pipe(catchError(this.errorHandler),tap(responseData =>{

        }))
    }
    postImg(email:string){
      return this.http.get<AuthenticationUserResposeData>(environment.url_Api+'register_get_email/'+email).pipe(catchError(this.errorHandler),tap(responseData =>{

      }))
    }
    reportPost(postid:string , title:string, reason:string, reporter:string, post_email:string){
     let body = {
       "postid":postid,
       "title":title,
       "post_email":post_email,
       "reason":reason,
       "reporter":reporter
     }
     console.log(body);
      return this.http.post<AuthenticationReport>(environment.url_Api+'report',body).pipe(catchError(this.errorHandler),tap(responseData =>{
      }))
    }
    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }
}
