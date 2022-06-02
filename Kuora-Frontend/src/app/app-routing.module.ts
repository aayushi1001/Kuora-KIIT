import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './landing-page/login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegistrationPageComponent } from './landing-page/registration-page/registration-page.component'
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DisplayAreaPageComponent } from "./main-page/display-area-page/display-area-page.component";
import { PostQuestionComponent } from './main-page/display-area-page/post-question/post-question.component';
import { ProfilePageComponent } from './main-page/profile-page/profile-page.component';
import { VerificationPortalComponent } from './main-page/verification-portal/verification-portal.component';
import {SearchPageComponent} from "./main-page/search-page/search-page.component";
import { AccountVerificationListComponent } from './admin-panel/account-verification-list/account-verification-list.component';
import { UserListComponent } from './admin-panel/user-list/user-list.component';
import { ReportedPostsComponent } from './admin-panel/reported-posts/reported-posts.component';
import { RouteActivate } from './resources/route-activate.service';
import { WildRouteComponent } from './wild-route-component/wild-route.component';
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";

const routes: Routes = [
  {
    path : '' ,
    redirectTo : '/landing-page' ,
    pathMatch : 'full',
  },
  {
    path : 'landing-page' ,
    component : LandingPageComponent,
    children: [
      {path : 'login' , component : LoginPageComponent},
      {path : 'registration' , component : RegistrationPageComponent}
    ]
  },
  {
    path : 'main-page' ,
    component : MainPageComponent,
    canActivate: [RouteActivate],
    children:[
      {path : 'display-area/:category', component: DisplayAreaPageComponent},
      {path : 'search-page/:value', component: SearchPageComponent},
      {path : 'post-question', component: PostQuestionComponent},
      {path : 'profile-page', component: ProfilePageComponent},
      {path : 'verification-portal', component: VerificationPortalComponent}
    ]
  },
  {
    path: 'admin-panel', component:AdminPanelComponent,
    canActivate: [RouteActivate],
    children: [
      {path: 'verify', component: AccountVerificationListComponent},
      {path: 'users-list', component:UserListComponent},
      {path: 'reported-posts', component:ReportedPostsComponent},
    ]
  },

  { path: 'not-found', component: WildRouteComponent },
  { path : '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
