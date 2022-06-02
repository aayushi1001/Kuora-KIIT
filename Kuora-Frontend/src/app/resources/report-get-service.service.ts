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
@Injectable({
  providedIn: 'root'
})
export class ReportGetServiceService {

  constructor(private http: HttpClient) { 

    

  }

  GetReportedPostsList(){
        
    return this.http.get<AuthenticationResposeData>(environment.url_Api+'report_get').pipe(catchError(this.errorHandler),tap(responseData =>{
        console.log(responseData);
    }))

    
}

private errorHandler(errRes: HttpErrorResponse){
  console.error(errRes.error.status_message)
  return throwError(errRes);
}

}
