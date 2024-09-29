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

  // السيرفسيس الخاصه ب امر شراء

  getAllBooksForPurchaseOrder() {
    return this.http.get<any>(environment.apiUrl + 'MsPurchasOrder/GetAllSysBooks');
  }

  GetAllMsPurchasOrder(){
    return this.http.get<any>(environment.apiUrl+'MsPurchasOrder/GetAllMsPurchasOrder')
  }

  AddMsPurchasOrder(values:any){
    return this.http.post<any>(environment.apiUrl+'MsPurchasOrder/AddMsPurchasOrder',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }
  
  getMsPurchOrderDetail(purOrderId:any){
    return this.http.get<any>(`${environment.apiUrl}MsPurchasOrder/getMsPurchOrderDetail?PurOrderId=${purOrderId}`)
  }


  updatePurchasOrderDetail(values:any){
    return this.http.post<any>(environment.apiUrl+'MsPurchasOrder/updateOrderDetail',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  getPurchasOrder(trno:any , bookId:any){
    return this.http.get<any>(`${environment.apiUrl}MsPurchasOrder/getPurchasOrder?trno=${trno}&bookId=${bookId}`)
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

  GetAllStores(){
    return this.http.get<any>(environment.apiUrl+'MsPurchasInvoice/getAllStores')
  }

  GetAllVendorForPurchaseInvoice(){
    return this.http.get<any>(environment.apiUrl+'MsPurchasOrderRequest/getAllVendors')
  }

  GetAllPartition(){
    return this.http.get<any>(environment.apiUrl+'MsPurchasInvoice/getAllMsPartitions')
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

  getUnitPrice(unitId:any){
    return this.http.get<any>(`${environment.apiUrl}MsPurchasOrderRequest/getUnitPrice?unitId=${unitId}`)
    .pipe(map((res)=>{
      return res;
    }))
  }

  getMsPurchOrderReqDetail(PurOrderReqId:any){
    return this.http.get<any>(`${environment.apiUrl}MsPurchasOrderRequest/getMsPurchOrderReqDetail?PurOrderReqId=${PurOrderReqId}`)
  }

  updateOrderDetail(values:any){
    return this.http.post<any>(environment.apiUrl+'MsPurchasOrderRequest/updateOrderDetail',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
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
    return this.http.post<any>(environment.apiUrl+'MsPurchasInvoice/AddMsPurchasInvoice',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }
  
  GetAllPurchaseInvoice(){
    return this.http.get<any>(environment.apiUrl+'MsPurchasInvoice/GetAllPurchaseInvoice')
  }
   
  getPurchaseInvoiceItemCard(PurInvId:any){
    return this.http.get<any>(`${environment.apiUrl}MsPurchasInvoice/MsPurchaseInvoiceItemCard?PurInvId=${PurInvId}`)
  }

  updateMsPurchaseInvoice(values:any){
    return this.http.post<any>(environment.apiUrl+'MsPurchasInvoice/updateMsPurchaseInvoiceItemCard',values).pipe(
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
