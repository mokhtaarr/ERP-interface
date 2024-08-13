import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { GUsersComponent } from './g-users/g-users.component';

const routes: Routes = [
  {path:'',component:AllComponent},
  {path:'users',component:GUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemToolsRoutingModule { }
