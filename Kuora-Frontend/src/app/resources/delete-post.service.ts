import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import { environment } from 'src/environments/environment';


export interface AuthenticationResposeData{
  code: number;
  message: string;
  user:any[];
  
}

export interface ChangeUser{
  n: number,
  nModified: number,
  ok: number
}
@Injectable({
  providedIn: 'root'
})
export class DeletePostService {

  constructor(private http: HttpClient) { 

    

  }

  DeletePost(postId:any){
        
    return this.http.delete<AuthenticationResposeData>(environment.url_Api+'post/'+postId).pipe(catchError(this.errorHandler),tap(responseData =>{
        console.log(responseData);
    }))

    
}

private errorHandler(errRes: HttpErrorResponse){
  console.error(errRes.error.status_message)
  return throwError(errRes);
}

}