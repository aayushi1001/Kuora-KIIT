import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/resources/login.service';
import { VerifyRequestService } from 'src/app/resources/verify-request.service';
import {GetVerificationListService} from "../../resources/get-verification-list.service";

@Component({
  selector: 'app-verification-portal',
  templateUrl: './verification-portal.component.html',
  styleUrls: ['./verification-portal.component.css']
})
export class VerificationPortalComponent implements OnInit {

  verificationForm!: FormGroup;
  canApplyforVerification: boolean = true;
  reason: string = '';
  constructor(private sendRequest: VerifyRequestService,
              private loginService: LoginService,
              private verificationList: GetVerificationListService) { }

  ngOnInit(): void {

    this.verificationList.GetList().subscribe(
      (res) => {
        for(let req in res.verification){
          let email = this.loginService.getActiveUserDetails().email;
          if(res.verification[req].email === email) {
            this.canApplyforVerification = false;
            this.verificationForm.disable();
            this.reason = res.verification[req].request;
            console.log(res.verification[req].request);
            break;
          }
        }
      }
    );
    this.verificationForm = new FormGroup({
      'reason': new FormControl({value: this.reason, disabled: !this.canApplyforVerification}, [Validators.required]),
      'verificationDocument': new FormControl({value: null, disabled: !this.canApplyforVerification}, [Validators.required]),
    });
  }

  ngAfterViewInit(){

  }

  onFileChange(event: any) {
    try{
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        this.verificationForm.patchValue({
          'verificationDocument': file
        });
      }
    }
    catch{}
  }

  onSubmit(){
    let currenctDate = new Date();
    let date = currenctDate.getFullYear()+'-'+(currenctDate.getMonth()+1)+'-'+currenctDate.getDate();  //YYYY-MM-DD
    console.log(date);

    const verificationDetails = new FormData();
    verificationDetails.append('request', this.verificationForm.controls['reason'].value);
    verificationDetails.append('email', this.loginService.getActiveUserDetails().email);
    verificationDetails.append('date', date);
    verificationDetails.append('documentPic', this.verificationForm.controls['verificationDocument'].value);

    this.sendRequest.sendVerificationRequest(verificationDetails);
    this.verificationForm.disable();
  }
}
