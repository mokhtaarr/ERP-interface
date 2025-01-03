import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BanksService {


  constructor(private http: HttpClient, public toastr: ToastrService) {
    
  }

  // السيرفسيس الخاصه با انواع الخطابات

  GetAllLetter(){
    return this.http.get<any>(environment.apiUrl +'MsLetterOfGuaranteeTypes/GetAllLetter')
  }

  AddLetter(values:any){
    return this.http.post<any>(environment.apiUrl+'MsLetterOfGuaranteeTypes/AddLetter',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  DeleteLetter(letOfGrnteeTypeId:any){
    return this.http.delete<any>(`${environment.apiUrl}MsLetterOfGuaranteeTypes/DeleteLetter?LetOfGrnteeTypeId=${letOfGrnteeTypeId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }


  // السيرفسيس الخاصه با فئات الخطابات

  GetAllLetterCategory(){
    return this.http.get<any>(environment.apiUrl +'MsLetterOfGuaranteeCategory/GetAllLetterCategory')
  }

  AddLetterCategory(values:any){
    return this.http.post<any>(environment.apiUrl+'MsLetterOfGuaranteeCategory/AddLetter',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  DeleteLetterCategory(letOfGrnteeCatId:any){
    return this.http.delete<any>(`${environment.apiUrl}MsLetterOfGuaranteeCategory/DeleteLetterCategory?LetOfGrnteeCatId=${letOfGrnteeCatId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }

    // السيرفسيس الخاصه بحالات  الخطابات

    GetAllLetterStatus(){
      return this.http.get<any>(environment.apiUrl +'MsLetterOfGuaranteeStatus/GetAllLetterStatus')
    }
  
    AddLetterStatus(values:any){
      return this.http.post<any>(environment.apiUrl+'MsLetterOfGuaranteeStatus/AddLetterStatus',values).pipe(
        map((res) => {
          var message = res.message;
          var messageEn = res.messageEn;
    
          if (res.status == true) this.toastr.success(message);
          
          if (res.status == false) this.toastr.error(message);
    
          return res;
        })
      );
    }
  
    DeleteLetterStatus(letOfGrnteeCatId:any){
      return this.http.delete<any>(`${environment.apiUrl}MsLetterOfGuaranteeStatus/DeleteLetterStatus?LetOfGrnteeStatusId=${letOfGrnteeCatId}`)
      .pipe(map((res)=>{
        var message = res.message;
        var messageEn = res.messageEn;
    
        if (res.status == true) this.toastr.success(message);
    
        if (res.status == false) this.toastr.error(message);
    
        return res.status;
      }))
    }
  

    // السيرفسيس الخاصه با البنوك

    GetAllBanks(){
      return this.http.get<any>(environment.apiUrl +'Bank/GetAllBanks')
    }

    AddBank(values:any){
      return this.http.post<any>(environment.apiUrl+'Bank/AddBank',values).pipe(
        map((res) => {
          var message = res.message;
          var messageEn = res.messageEn;
    
          if (res.status == true) this.toastr.success(message);
          
          if (res.status == false) this.toastr.error(message);
    
          return res;
        })
      );
    }

    GetAllAccounts(){
      return this.http.get<any>(environment.apiUrl +'Bank/GetAllAccounts')
    }

    GetAllCurrency(){
      return this.http.get<any>(environment.apiUrl+'Customers/GetAllCurrency')
    }

    AddBankAccount(values:any){
      return this.http.post<any>(environment.apiUrl+'Bank/AddAccount',values).pipe(
        map((res) => {
          var message = res.message;
          var messageEn = res.messageEn;
    
          if (res.status == true) this.toastr.success(message);
          
          if (res.status == false) this.toastr.error(message);
    
          return res;
        })
      );
    }
    
    GetBankAccounts(boxId : any){
      return this.http.get<any>(`${environment.apiUrl}Bank/GetBankData?boxId=${boxId}`)
    }
  
    DeleteAccount(boxCurrencyId:any){
      return this.http.delete<any>(`${environment.apiUrl}Bank/DeleteAccount?boxCurrencyId=${boxCurrencyId}`)
      .pipe(map((res)=>{
        var message = res.message;
        var messageEn = res.messageEn;
    
        if (res.status == true) this.toastr.success(message);
    
        if (res.status == false) this.toastr.error(message);
    
        return res.status;
      }))
    }

    DeleteBank(boxId:any){
      return this.http.delete<any>(`${environment.apiUrl}Bank/DeleteBank?boxId=${boxId}`)
      .pipe(map((res)=>{
        var message = res.message;
        var messageEn = res.messageEn;
    
        if (res.status == true) this.toastr.success(message);
    
        if (res.status == false) this.toastr.error(message);
    
        return res.status;
      }))
    }
 
}
