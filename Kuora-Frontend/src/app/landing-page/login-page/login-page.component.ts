import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { LoginService } from '../../resources/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  signinForm!: FormGroup;
  errorResponse: string = '';
  constructor(private http : HttpClient,
              private router : Router, 
              private loginService: LoginService) { }
    
  @Output() isRegistration = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){
    const userData = {
      email: this.signinForm.controls['email'].value + "@kiit.ac.in",
      password: this.signinForm.controls['password'].value
    }
    this.loginService.userLogin(userData);
    this.errorResponse = this.loginService.errorResponse;
  }
  
  GoToRegistration(){
    this.isRegistration.emit(false);
  }

}
