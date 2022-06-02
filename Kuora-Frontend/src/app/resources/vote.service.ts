import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {AuthenticationResposeDataPost} from "./comment.service";

export interface AuthenticationResposeData{
  code: number;
  message: string;
  vote:{voter_email: string, post_id: string, rating: number}[];
}

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) {

  }
  voteSession(postid: string){
    return this.http.get<AuthenticationResposeData>(environment.url_Api+'vote_get_postid/'+postid).pipe(catchError(this.errorHandler),tap(responseData =>{
    }))
  }
  voteSessionId(postid: string, voter:string){
    return this.http.get<AuthenticationResposeData>(environment.url_Api+'vote_get_postid_voter/'+postid+'/'+voter).pipe(catchError(this.errorHandler),tap(responseData =>{
    }))
  }
  votePostSession(voter_email:string,post_id:string){
    const voteData = {
      voter_email: voter_email,
      post_id:post_id,
      rating: 5
    }
    return this.http.post<AuthenticationResposeDataPost>(environment.url_Api + 'vote', voteData).pipe(catchError(this.errorHandler),tap(responseData =>{
    }))

  }
  private errorHandler(errRes: HttpErrorResponse){
    console.error(errRes.error.status_message)
    return throwError(errRes);
  }
}
