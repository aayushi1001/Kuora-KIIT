import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import {Injectable, OnInit} from '@angular/core';
import { userDetails } from './user-details.model';
import jwt_decode from "jwt-decode";

interface LoginResponseData{
  code: number;
  message: string;
  token: string;
}

@Injectable()
export class LoginService implements OnInit{

  private activeUserDetails: userDetails = {
    name: 'Undefined',
    email: 'Undefined',
    signupas: 'Undefined',
    bio: 'Undefined',
    verified: 'Undefined',
    blocked: false,
    pic: 'Undefined',
  };

  private localStorageKey = 'my_details';
  errorResponse: string = '';

  constructor(private http : HttpClient,
    private router : Router) {
    let userDetails = this.getLocalStorage();
    if(userDetails && this.activeUserDetails.email === 'Undefined'){
    this.activeUserDetails = userDetails;
    }
  }

  ngOnInit(){
    let userDetails = this.getLocalStorage();
    if(userDetails && !this.activeUserDetails){
    this.activeUserDetails = userDetails;
    }
  }

  userLogin(userData: {email: string, password: string}){
    this.http.post<LoginResponseData>(environment.url_Api + 'login', userData)
    .subscribe(responseData => {
      if(responseData.code === 200){
      this.activeUserDetails = jwt_decode(responseData.token);
      this.unsetLocalStorage();
      this.setLocalStorage();
      this.router.navigate(['/main-page/display-area/all']);
      } else {
      this.errorResponse = responseData.message;
      this.unsetLocalStorage();
    }
    })
  }

  getActiveUserDetails(){
    return this.activeUserDetails;
  }

  private setLocalStorage(){
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.activeUserDetails));
  }

  private getLocalStorage(){
    let storedDetails = localStorage.getItem(this.localStorageKey);
    let userDetails;
    if(storedDetails) {
    userDetails = JSON.parse(storedDetails);
    }
    return userDetails;
  }

  private unsetLocalStorage(){
    localStorage.removeItem(this.localStorageKey);
  }

  setActiveUserDetails(data: userDetails){
    this.activeUserDetails.name = data.name;
    this.activeUserDetails.email = data.email;
    this.activeUserDetails.signupas = data.signupas;
    this.activeUserDetails.bio = data.bio;
    this.activeUserDetails.verified = data.verified;
    this.activeUserDetails.blocked = data.blocked;
    this.activeUserDetails.pic = data.pic;
    this.unsetLocalStorage();
    this.setLocalStorage();
  }

  unsetActiveUserDetails(){
    this.activeUserDetails.name = 'Undefined';
    this.activeUserDetails.email = 'Undefined';
    this.activeUserDetails.signupas = 'Undefined';
    this.activeUserDetails.bio = 'Undefined';
    this.activeUserDetails.verified = 'Undefined';
    this.activeUserDetails.blocked = false;
    this.activeUserDetails.pic = 'Undefined';
    this.unsetLocalStorage();
  }
}
