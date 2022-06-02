import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import { environment } from 'src/environments/environment';



export interface AuthenticationResposeData{
  code: number;
  message: string;  
}

export interface ChangeUser{
  n: number,
  nModified: number,
  ok: number
}

@Injectable({
  providedIn: 'root'
})

export class VerifyRequestService {

  constructor(private http: HttpClient) {}

  ApproveRequest(verified : string , email : string){
    let body=[{"propName" : "verified","value":verified}];
    console.log("called");
    return this.http.post<ChangeUser>(environment.url_Api+"register_update/"+email,body).pipe(catchError(this.errorHandler),tap(responseData =>{
        console.log(responseData);
    }))
  }

  ChangeUserStatus(status : string , email : string){    
    let body=[{"propName" : "blocked","value":status}];
    // console.log("called");
    return this.http.post<ChangeUser>(environment.url_Api+"register_update/"+email,body).pipe(catchError(this.errorHandler),tap(responseData =>{
        console.log(responseData);
    }))
  }

  private errorHandler(errRes: HttpErrorResponse){
    console.error(errRes.error.status_message)
    return throwError(errRes);
  }

  sendVerificationRequest(verificationDetails: FormData){
     this.http.post<AuthenticationResposeData>(environment.url_Api+ "verification/", verificationDetails)
    .subscribe(responseData =>{
       console.log(responseData);
     });
  }

}
