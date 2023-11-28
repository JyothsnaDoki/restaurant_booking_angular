import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component'
import { ViewitemsComponent } from './viewitems/viewitems.component';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MenuComponent } from './menu/menu.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { AdditemComponent } from './additem/additem.component';
import { AddcartComponent } from './addcart/addcart.component';
import { CreateitemComponent } from './createitem/createitem.component';
import { BookComponent } from './book/book.component';
import { ShowfeedComponent } from './showfeed/showfeed.component';
import { CreatefeedComponent } from './createfeed/createfeed.component';
import { EdititemComponent } from './edititem/edititem.component';
import { BankcheckComponent } from './bankcheck/bankcheck.component';
import { DetailsComponent } from './details/details.component';
import { SendemailComponent } from './sendemail/sendemail.component';
import { MapComponent } from './map/map.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewitemsadComponent } from './viewitemsad/viewitemsad.component';
import { BookuserComponent } from './bookuser/bookuser.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [

  {path:"",component:IndexComponent},
  {path:"login",component:LoginComponent},
  {path:"profile/:userId",component:ProfileComponent},
   {path:"signup",component:SignupComponent},
   {path:"customerDashboard",component:CustomerDashboardComponent,canActivate:[AuthGuard]},
   {path:"adminDashboard",component:AdminDashboardComponent,canActivate:[AuthGuard]},
   {path:"viewitems",component:ViewitemsComponent,canActivate:[AuthGuard]},
   {path:"about",component:AboutComponent},
   {path:"contactus",component:ContactusComponent},
   {path:"menu",component:MenuComponent},
   {path:"editProfile/:userId",component:EditProfileComponent,canActivate:[AuthGuard]},
   {path:"viewProfile",component:ViewprofileComponent,canActivate:[AuthGuard]},
   {path:"additem",component:AdditemComponent,canActivate:[AuthGuard]},
   {path:"addcart",component:AddcartComponent},
   {path:"createitem",component:CreateitemComponent},
   {path:"book/:itemId",component:BookComponent,canActivate:[AuthGuard]},
   {path:"bankcheck",component:BankcheckComponent,canActivate:[AuthGuard]},
   {path:"edititem",component:EdititemComponent,canActivate:[AuthGuard]},
   {path:"createfeed",component:CreatefeedComponent},
   {path:"showfeed",component:ShowfeedComponent},
   {path:"details",component:DetailsComponent},
   {path:"sendemail",component:SendemailComponent},
   {path:"map",component:MapComponent},
   {path:"Viewitemsad",component:ViewitemsadComponent},
   {path:"viewCart",component:ViewCartComponent},
   {path:"bookuser/:userId",component:BookuserComponent},
   {path:'**',component:NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
