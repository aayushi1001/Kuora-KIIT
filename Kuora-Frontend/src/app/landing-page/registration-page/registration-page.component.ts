import { Component, Output, OnInit, Injectable, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError , tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {environment} from 'src/environments/environment';
import {userDetails } from '../../resources/user-details.model';
import { LoginService } from '../../resources/login.service';

interface RegistrationResponseData{
  code: number;
  message: string;
  user: userDetails[];
}

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  genders = ['male', 'female'];
  userProfiles = ['Professor', 'Non-teaching Staff', 'Student'];
  signupForm!: FormGroup;
  emailInputType: string = 'text';
  otpInput: string = 'number';
  errorResponse: string = '';
  @Output() isLogin = new EventEmitter<boolean>();

  constructor(private http : HttpClient,
              private router : Router,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'profile': new FormControl('Professor', [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'otp':  new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), this.PasswordValidation]),
      'confirm-password': new FormControl(null, [Validators.required, this.ConfirmPasswordValidation]),
      'description': new FormControl(null)
    })
  }

  onSubmit(){
    const signUpformData = new FormData();
    const userEmail = (this.signupForm.controls['email'].value).toString() + '@kiit.ac.in';
    signUpformData.append('name', this.signupForm.controls['username'].value);
    signUpformData.append('password', this.signupForm.controls['password'].value);
    signUpformData.append('signupas', this.signupForm.controls['profile'].value);
    signUpformData.append('email', userEmail);
    signUpformData.append('otp', this.signupForm.controls['otp'].value)
    signUpformData.append('bio', this.signupForm.controls['description'].value);
    signUpformData.append('verified', 'false');
    signUpformData.append('blocked', 'false');

    this.http.post<RegistrationResponseData>(environment.url_Api + 'register', signUpformData)
    .subscribe(responseData => {
      if(responseData.code === 200){
        const LoginData = {
          email: userEmail,
          password: this.signupForm.controls['password'].value
        };
        console.log(responseData);
        this.loginService.userLogin(LoginData);
      } else {
        this.errorResponse = responseData.message;
      }
    })
  }
 sendOtp()
 {
   const userEmail = (this.signupForm.controls['email'].value).toString() + '@kiit.ac.in';
   const body ={
     "email": userEmail
   }
   this.http.post<RegistrationResponseData>(environment.url_Api + 'register/send', body)
     .subscribe(responseData => {
       if(responseData.code === 200){
         console.log(responseData);
       } else {
         this.errorResponse = responseData.message;
       }
     })
 }
  updateEmailInputType(data: any){
    (data.signupForm.value.profile === 'Student') ? this.emailInputType = 'number' : this.emailInputType = 'text';
  }

  PasswordValidation(control: FormControl){
    let specialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if((control.value !== null) && (!specialCharacter.test(control.value.toString()) || !/\d/.test(control.value.toString()))){
        return ({
          'InvalidPassword' : true
        });
      } else{
        return (null);
      }
  }

  ConfirmPasswordValidation(control: FormControl){
    if(control.value !== null && control.root.value.password !== control.value){
      return ({
        'PasswordMismatch' : true
      });
    }
    return null;
  }

  GoToLogin(){
    this.isLogin.emit(true);
  }

  onRegister(){
    this.router.navigate(['/main-page']);
  }
}
