import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class RouteActivate implements CanActivate {

    constructor(private loginService: LoginService){}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let activeUserEmail = this.loginService.getActiveUserDetails().email;
        if(activeUserEmail !== 'Undefined' && activeUserEmail.includes('@kiit.ac.in')){
            return true;
        } else {
            return false;
        }
    }
}