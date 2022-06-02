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

@Injectable()
export class PostSearchService {

  constructor(private http: HttpClient) { }
  postSession(title: string){
    return this.http.get<AuthenticationResposeData>(environment.url_Api+'search_bar/'+title).pipe(catchError(this.errorHandler),tap(responseData =>{

    }))
  }
  private errorHandler(errRes: HttpErrorResponse){
    console.error(errRes.error.status_message)
    return throwError(errRes);
  }
}
