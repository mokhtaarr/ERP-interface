import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchComponent } from './branch/branch.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    BranchComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    BranchComponent,
    LoginComponent
  ]
})
export class AccountModule { }
