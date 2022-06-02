import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import { environment } from 'src/environments/environment';


export interface AuthenticationResposeData{
  code: number;
  message: string;
  verification:any[];
  
}

@Injectable({
  providedIn: 'root'
})
export class GetVerificationListService {

  constructor(private http: HttpClient) { 

    

  }

  GetList(){
        
    return this.http.get<AuthenticationResposeData>(environment.url_Api+'verification_get').pipe(catchError(this.errorHandler),tap(responseData =>{
        console.log(responseData);
    }))

    
}

private errorHandler(errRes: HttpErrorResponse){
  console.error(errRes.error.status_message)
  return throwError(errRes);
}

}
