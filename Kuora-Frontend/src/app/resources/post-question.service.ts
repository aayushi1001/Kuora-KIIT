import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Post } from "./post.model";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

interface PostQuestionResponseData{
    code: number;
    error : string;
    Post : Post |null;
}

@Injectable()
export class PostQuestion {

    constructor(private http : HttpClient) {}

    postQuestion(postData: any){
        return this.http.post<PostQuestionResponseData>(environment.url_Api + 'post', postData).pipe(catchError(this.errorHandler),tap(responseData =>{
        }))
    }
    private errorHandler(errRes: HttpErrorResponse){
      console.error(errRes.error.status_message)
      return throwError(errRes);
    }
}
