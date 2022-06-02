import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

export interface AuthenticationResposeData{
  code: number;
  message: string;
  comment:{comment_email: string, post_id: string, commenttxt: string}[];
}
export interface AuthenticationResposeDataPost{
  code: number;
  message: string;
  comment:{comment_email: string, post_id: string, commenttxt: string}[];
}
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {

  }
  commentSession(postid: string){
    return this.http.get<AuthenticationResposeData>(environment.url_Api+'comment_get_postid/'+postid).pipe(catchError(this.errorHandler),tap(responseData =>{
    }))
  }
  commentPostSession(comment_email:string,post_id:string, commenttxt:string){
    const commentData = {
      comment_email: comment_email,
      post_id:post_id,
      commenttxt:commenttxt
    }
    return this.http.post<AuthenticationResposeDataPost>(environment.url_Api + 'comment', commentData).pipe(catchError(this.errorHandler),tap(responseData =>{
    }))

  }
  private errorHandler(errRes: HttpErrorResponse){
    console.error(errRes.error.status_message)
    return throwError(errRes);
  }
}
