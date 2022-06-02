import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import { environment } from 'src/environments/environment';



export interface AuthenticationResposeData{
  code: number;
  message: string;
  
}
@Injectable({
  providedIn: 'root'
})
export class RemoveFromVerificationListService {

  constructor(private http: HttpClient) { 

  }

  RemoveRequest(id : string){
    
    
    console.log("called");
    return this.http.delete<AuthenticationResposeData>(environment.url_Api+"verification/"+id).pipe(catchError(this.errorHandler),tap(responseData =>{
        console.log(responseData);
    }))

  
}


private errorHandler(errRes: HttpErrorResponse){
  console.error(errRes.error.status_message)
  return throwError(errRes);
}


}