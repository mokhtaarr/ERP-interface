import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemToolsRoutingModule } from './system-tools-routing.module';
import { GUsersComponent } from './g-users/g-users.component';
import { AllComponent } from './all/all.component';
import { ImportModule } from '../import/import.module';


@NgModule({
  declarations: [
    GUsersComponent,
    AllComponent
  ],
  imports: [
    CommonModule,
    SystemToolsRoutingModule,
    ImportModule
  ]
})
export class SystemToolsModule { }
