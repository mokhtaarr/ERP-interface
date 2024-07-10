import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsModuleServicesService {

  constructor(private http: HttpClient, public toastr: ToastrService) {
    
  }

  // السرفسيس الخاصه با دليل الحسابات

  GEtAllAccountsGuide(){
    return this.http.get<any>(environment.apiUrl +'AccountsGuide/GetAllAccounts')
  }

  GEtAllAccountsGuideForSelect(){
    return this.http.get<any>(environment.apiUrl +'AccountsGuide/GetAllAccountsForSelect')
  }
  
  GetAllCurrency(){
    return this.http.get<any>(environment.apiUrl+'Customers/GetAllCurrency')
  }

  AddCalAccountChart(values:any){
    return this.http.post<any>(environment.apiUrl+'AccountsGuide/AddCalAccountChart',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  DeleteAccountChart(accountId:any){
    return this.http.delete<any>(`${environment.apiUrl}AccountsGuide/DeleteAccountChart?accountId=${accountId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }

  GetAllUsers(){
    return this.http.get<any>(environment.apiUrl+'AccountsGuide/GetAllUsers')
  }

  AddCalAccountUser(values:any){
    return this.http.post<any>(environment.apiUrl+'AccountsGuide/AddCalAccountChartUser',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  
  GetAllAccountUsers(){
    return this.http.get<any>(environment.apiUrl+'AccountsGuide/GetAllCalAccountUsers')
  }

  DeleteAccountUser(accuserId:any){
    return this.http.delete<any>(`${environment.apiUrl}AccountsGuide/DeleteAccountUser?accUserId=${accuserId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }


  // السيرفسيس الخاصه بمركز التكلفه 
  GEtAllCostCenter(){
    return this.http.get<any>(environment.apiUrl +'ColCostCenter/GetAllCostCenter')
  }

  GetAllCostCenterForSelect(){
    return this.http.get<any>(environment.apiUrl +'ColCostCenter/GetAllCostCenterForSelect')
  }

  GetAllSys_AnalyticalCodes(){
    return this.http.get<any>(environment.apiUrl +'ColCostCenter/GetAllSys_AnalyticalCodes')
  }
  
  AddCalCostCenter(values:any){
    return this.http.post<any>(environment.apiUrl+'ColCostCenter/AddCalCostCenter',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }


  DeleteCostCenter(costCenterId:any){
    return this.http.delete<any>(`${environment.apiUrl}ColCostCenter/DeleteCostCenter?costCenterId=${costCenterId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }


  // السيرفسيس الخاصه بالاكواد التحليلية
  GetAllSysAnalyticalCode(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllSysAnalyticalCode')
  }

  GetAllSysAnalyticalCodeForSelect(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllSysAnalyticalCodeForSelect')
  }

  GetAllAccountsForSelect(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllAccountChartForSelect')
  }

  GetAll_CostCenterForSelect(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllCostCenterForSelect')
  }

  GetAllCustomer(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllCustomer')
  }

  GetAllHrEmployees(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllHrEmployees')
  }

  GetAllAssets(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllAssets')
  }


  GetAllVendors(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllVendors')
  }

  AddSysAnalyticalCode(values:any){
    return this.http.post<any>(environment.apiUrl+'SysAnalyticalCodes/AddSysAnalyticalCode',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  
  DeleteSysAnalyticalCode(aid:any){
    return this.http.delete<any>(`${environment.apiUrl}SysAnalyticalCodes/DeleteSysAnalyticalCode?aid=${aid}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }
}
