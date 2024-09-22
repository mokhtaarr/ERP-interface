import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
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



  GetAllCurrency(){
    return this.http.get<any>(environment.apiUrl+'Customers/GetAllCurrency')
  }

  GetAllSysAnalyticalCodes(){
    return this.http.get<any>(environment.apiUrl+'MsPurchasOrderRequest/GetAllSysAnalyticalCodes')
  }

  GetAllMsPurchasOrderRequest(){
    return this.http.get<any>(environment.apiUrl+'MsPurchasOrderRequest/GetAllMsPurchasOrderRequest')
  }

  GetAllItemForPurchasOrderRequest(){
    return this.http.get<any>(environment.apiUrl+'MsPurchasOrderRequest/GetAllItemForPurchasOrderRequest')
   }

  AddMsPurchasOrderRequest(values:any){
    return this.http.post<any>(environment.apiUrl+'MsPurchasOrderRequest/AddMsPurchasOrderRequest',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  getBarCode(unitId:any){
    return this.http.get<any>(`${environment.apiUrl}MsPurchasOrderRequest/getUnitBarCode?unitId=${unitId}`)
    .pipe(map((res)=>{
      return res;
    }))
  }


  // السيرفسيس الخاصه بفاتوره المشتريات
  getAllBooksForPurchaseInvoice() {
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/GetAllSysBooks');
  }

  getAllVendor(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllVendors');
  }

  getAllCustomers(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllCustomer');
  }

  getAllHrEmployees(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllHrEmployees');
  }

  getAllJobOrder(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllJobOrder');
  }

  getAllSrVehicles(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllSrVehicles');
  }

  getAllSearchVehicleJobOrder(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/SearchVehicleJobOrder');
  }

  
  getAllMsLetterOfGuarantees(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllMsLetterOfGuarantees');
  }

  getAllSrJobOrderMotors(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllSrJobOrderMotors');
  }
  
  getAllRepairOrders(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllRepairOrders');
  }

  getAllAssetAssetCards(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllAssetAssetCards');
  }

  getAllProjProjects(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllProjProjects');
  }

  getAllCalAccountCharts(){
    return this.http.get<any>(environment.apiUrl + 'MsPurchasInvoice/getAllCalAccountCharts');
  }

  getAllMsTerms(bookId:any){
    return this.http.get<any>(`${environment.apiUrl}MsPurchasInvoice/getAllMsTerms?bookId=${bookId}`)
    .pipe(map((res)=>{
      return res;
    }))
  }

  AddMsPurchasInvoice(values:any){
    return this.http.post<any>(environment.apiUrl+'MsPurchasInvoice/AddMsPurchasOrderRequest',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }
  
   

}
