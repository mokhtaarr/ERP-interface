import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesServicesService {

  
  constructor(private http: HttpClient, public toastr: ToastrService) {
    
  }

  // السيرفسيس الخاصه بطلب الشراء 
  getAllBooks() {
    return this.http.get<any>(environment.apiUrl + 'MsPurchasOrderRequest/GetAllSysBooks');
  }

  getAllVendor(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasOrderRequest/getAllVendors');
  }

  GetAllCurrency(){
    return this.http.get<any>(environment.apiUrl+'Customers/GetAllCurrency')
  }

  GetAllSysAnalyticalCodes(){
    return this.http.get<any>(environment.apiUrl+'MsPurchasOrderRequest/GetAllSysAnalyticalCodes')
  }
}
