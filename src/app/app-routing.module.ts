import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { BranchComponent } from './account/branch/branch.component';
import { LoginComponent } from './account/login/login.component';
import { MainComponent } from './component/main/main.component';
import { DialogComponent } from './home/dialog/dialog.component';
import { AuthGuard } from './import/guards/auth.guard';

// const routes: Routes = [
//   {path:'',component : BranchComponent},
//   {path:'home',component : HomeComponent},
//   {path:'branch',component : BranchComponent},
//   {path:'login',component : LoginComponent}
// ];

const routes: Routes = [
  {path:'main',canActivate:[AuthGuard],component:MainComponent,children:[
    //  {path:'home',component : HomeComponent},
     {path:'home', canActivate:[AuthGuard],loadChildren:()=>import('./home/home.module').then(h=>h.HomeModule)},
     {path:'definition',canActivate:[AuthGuard],loadChildren:()=>import('./definition/definition.module').then(d=>d.DefinitionModule)},
     {path:'accountsModule',canActivate:[AuthGuard],loadChildren:()=>import('./accounts-module/accounts-module.module').then(a=>a.AccountsModuleModule)},
     {path:'purchases',canActivate:[AuthGuard],loadChildren:()=>import('./purchases/purchases.module').then(p=>p.PurchasesModule)},
     {path:'banks',canActivate:[AuthGuard],loadChildren:()=>import('./banks/banks.module').then(b=>b.BanksModule)},
     {path:'system-tools',canActivate:[AuthGuard],loadChildren:()=>import('./system-tools/system-tools.module').then(s=>s.SystemToolsModule)},
     {path:'stores',canActivate:[AuthGuard],loadChildren:()=>import('./stores/stores.module').then(s=>s.StoresModule)},
     {path:'sales',canActivate:[AuthGuard],loadChildren:()=>import('./sales/sales.module').then(s=>s.SalesModule)},
     
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
