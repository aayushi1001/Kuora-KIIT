import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../resources/user-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { userDetails } from 'src/app/resources/user-details.model';
import { LoginService } from 'src/app/resources/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfilePictureService } from '../../resources/profile-picture.service'
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  isEditableMode: boolean = false;
  canEdit: boolean = false;
  userEmail!: string;
  editProfileForm!: FormGroup;

  constructor(private userProfile: UserProfile,
              private route: ActivatedRoute,
              private activeUser: LoginService,
              private router : Router,
              private profilePic: ProfilePictureService) { }

  ngOnInit(): void {
    this.userEmail = this.route.snapshot.queryParams['email'];
    this.getUserProfileDetails(this.userEmail);
    this.profilePic.profileInfoUpdateListner().subscribe(
      a => {
        this.userDetails = a;
      }
    )


      this.editProfileForm = new FormGroup({
        'name': new FormControl({value: this.userDetails.name, disabled: !this.isEditableMode}, [Validators.required]),
        'password': new FormControl({value: "*******", disabled: !this.isEditableMode}, [Validators.required, Validators.minLength(8), this.PasswordValidation]),
        'bio': new FormControl({value: this.userDetails.bio, disabled: !this.isEditableMode}, [Validators.required]),
        'pic': new FormControl(null)
      });
    if( this.userEmail === this.activeUser.getActiveUserDetails().email){
      this.canEdit = true;
    }
      this.profilePic.pictureUpdateListner().subscribe( picPath =>{
        this.userDetails.pic = picPath;
      });
  }

  userDetails: userDetails = {
    name: 'Undefined',
    email: 'Undefined',
    signupas: 'Undefined',
    bio: 'Undefined',
    verified: 'Undefined',
    blocked: false,
    pic: 'Undefined',
  };

  editableMode(){
    this.isEditableMode = true;
    this.editProfileForm.enable();
  }

  onSubmit(){
    this.isEditableMode = false;
    let password = this.editProfileForm?.controls['password'].value;
    let userData:any = [
      {"propName": "name", "value": this.editProfileForm?.controls['name'].value},
      {"propName": "bio", "value": this.editProfileForm?.controls['bio'].value}
    ]
    if(password !== "*******") {
      userData.append({
        "propName": "password", "value": password
      });
    }
    this.userProfile.updateUserProfileByEmail(this.userEmail, userData).subscribe(res => {
      this.getUserProfileDetails(this.userEmail);
    })

    const profilePicData = new FormData();
    profilePicData.append('pic', this.editProfileForm.controls['pic'].value);
    this.profilePic.changeProfilePicture(this.userEmail, profilePicData).subscribe(res => {
      this.getUserProfileDetails(this.userEmail);
    });
    this.editProfileForm.disable();
  }

  getUserProfileDetails(email: any){
    this.userProfile.getProfileByEmail(email).subscribe( res => {
      this.userDetails = res.user[0];
    });
  }

  // goToMainPage(){
  //   this.router.navigate(['/main-page/display-area/all']);
  // }

  onFileChange(event: any) {
    try{
      if (event.target.files && event.target.files.length) {
        const file = event.target.files[0];
        this.editProfileForm.patchValue({
          'pic': file
        });
      }
    }
    catch{}
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
}

