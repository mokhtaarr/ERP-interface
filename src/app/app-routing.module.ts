import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { BranchComponent } from './account/branch/branch.component';
import { LoginComponent } from './account/login/login.component';
import { MainComponent } from './component/main/main.component';
import { DialogComponent } from './home/dialog/dialog.component';

// const routes: Routes = [
//   {path:'',component : BranchComponent},
//   {path:'home',component : HomeComponent},
//   {path:'branch',component : BranchComponent},
//   {path:'login',component : LoginComponent}
// ];

const routes: Routes = [
  {path:'main',component:MainComponent,children:[
    //  {path:'home',component : HomeComponent},
     {path:'home',loadChildren:()=>import('./home/home.module').then(h=>h.HomeModule)},
     {path:'definition',loadChildren:()=>import('./definition/definition.module').then(d=>d.DefinitionModule)},
     {path:'accountsModule',loadChildren:()=>import('./accounts-module/accounts-module.module').then(a=>a.AccountsModuleModule)},
     {path:'purchases',loadChildren:()=>import('./purchases/purchases.module').then(p=>p.PurchasesModule)},
     {path:'banks',loadChildren:()=>import('./banks/banks.module').then(b=>b.BanksModule)},
     {path:'system-tools',loadChildren:()=>import('./system-tools/system-tools.module').then(s=>s.SystemToolsModule)},
     {path:'stores',loadChildren:()=>import('./stores/stores.module').then(s=>s.StoresModule)},
     {path:'sales',loadChildren:()=>import('./sales/sales.module').then(s=>s.SalesModule)},
     
  ]},
  {path:'',redirectTo:'branch',pathMatch:'full'},
  {path:'branch',component : BranchComponent},
  {path:'login',component : LoginComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
