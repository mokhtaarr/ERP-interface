import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient, public toastr: ToastrService) {
    
  }

  // السيرفسيس الخاصه بفاتوره المبيعات
  getAllBooksForSalesInvoice() {
    return this.http.get<any>(environment.apiUrl + 'MsSalesInvoice/GetAllSysBooks');
  }

  getCurrentTime(){
    return this.http.get<any>(environment.apiUrl + 'MsSalesInvoice/GetCurrentTime');
  }

  getSalesEmployees(){
    return this.http.get<any>(environment.apiUrl + 'MsSalesInvoice/GetSalesEmployees');
  }

  AddMsSalesInvoice(values:any){
    return this.http.post<any>(environment.apiUrl+'MsSalesInvoice/AddMsSalesInvoice',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  GetAllSalesInvoice(){
    return this.http.get<any>(environment.apiUrl+'MsSalesInvoice/GetAllSalesInvoice')
  }

  getMsSalesInvoiceItems(InvId:any){
    return this.http.get<any>(`${environment.apiUrl}MsSalesInvoice/getMsSalesInvoiceItems?InvId=${InvId}`)
  }

  GetUserStores(storeId : any){
    return this.http.get<any>(`${environment.apiUrl}MsSalesInvoice/getUserStores?storeId=${storeId}`)
  }

  GetUserPartition(storeId : any){
    return this.http.get<any>(`${environment.apiUrl}MsSalesInvoice/getUserPartition?storeId=${storeId}`)
  }

  updateMsSalesInvoice(values:any){
    return this.http.post<any>(environment.apiUrl+'MsSalesInvoice/updateMsSalesInvoiceItemCard',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }


  // السيرفسيس الخاصه بعرض السعر 
  getAllBooksForSalesOffer() {
    return this.http.get<any>(environment.apiUrl + 'MsSalesOffer/GetAllSysBooks');
  }

  getAllCustomers() {
    return this.http.get<any>(environment.apiUrl + 'MsSalesOffer/GetAllCustomers');
  }

  getAllSalesOffer() {
    return this.http.get<any>(environment.apiUrl + 'MsSalesOffer/GetAllSalesOffer');
  }

  getMsSalesOfferItems(salesOfferId:any){
    return this.http.get<any>(`${environment.apiUrl}MsSalesOffer/getMsSalesOfferItems?salesOfferId=${salesOfferId}`)
  }

  AddMsSalesOffer(values:any){
    return this.http.post<any>(environment.apiUrl+'MsSalesOffer/AddMsSalesOffer',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  updateMsSalesOffer(values:any){
    return this.http.post<any>(environment.apiUrl+'MsSalesOffer/updateMsSalesOfferItemCard',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }


  // امر بيع
  getAllBooksForSalesOrder() {
    return this.http.get<any>(environment.apiUrl + 'MsSalesOrder/GetAllSysBooks');
  }
  
  GetAllSalesOrder(){
    return this.http.get<any>(environment.apiUrl + 'MsSalesOrder/GetAllSalesOrders');
  }


  getMsSalesOrderItems(salesOrderId:any){
    return this.http.get<any>(`${environment.apiUrl}MsSalesOrder/getMsSalesOrderItems?salesOrderId=${salesOrderId}`)
  }


  AddMsSalesOrder(values:any){
    return this.http.post<any>(environment.apiUrl+'MsSalesOrder/AddMsSalesOrder',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  updateMsSalesOrder(values:any){
    return this.http.post<any>(environment.apiUrl+'MsSalesOrder/updateMsSalesOrderItemCard',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }


  // طلب تسعير 

  getAllBooksForSalesOfferRequest() {
    return this.http.get<any>(environment.apiUrl + 'MsSalesOfferRequest/GetAllSysBooks');
  }

  GetAllSalesOfferRequest(){
    return this.http.get<any>(environment.apiUrl + 'MsSalesOfferRequest/GetAllSalesOfferRequest');
  }

  AddMsSalesOfferRequest(values:any){
    return this.http.post<any>(environment.apiUrl+'MsSalesOfferRequest/AddMsSalesOfferRequest',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  getMsSalesOfferRequestItems(salesOfferReqId:any){
    return this.http.get<any>(`${environment.apiUrl}MsSalesOfferRequest/getMsSalesOfferRequestItems?salesOfferReqId=${salesOfferReqId}`)
  }

  
  updateMsSalesOfferRequest(values:any){
    return this.http.post<any>(environment.apiUrl+'MsSalesOfferRequest/updateMsSalesOfferItemRequest',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }


// سيرفسيس مرتجعات المبيعات
  
getAllBooksForReturnedSales() {
  return this.http.get<any>(environment.apiUrl + 'MsReturnSales/GetAllSysBooks');
}

getAllReturnedSalesInvoice() {
  return this.http.get<any>(environment.apiUrl + 'MsReturnSales/GetAllReturnedSalesInvoice')
}


AddMsReturnSales(values:any){
  return this.http.post<any>(environment.apiUrl+'MsReturnSales/AddMsReturnSales',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}


getMsReturnSalesItems(retSaleId:any){
  return this.http.get<any>(`${environment.apiUrl}MsReturnSales/getMsReturnSalesItems?retSaleId=${retSaleId}`)
}

updateMsReturnSalesItemCards(values:any){
  return this.http.post<any>(environment.apiUrl+'MsReturnSales/updateMsReturnSalesItemCards',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

GetInvoiceItems(trno:any,bookId:any){
  return this.http.get<any>(`${environment.apiUrl}MsReturnSales/GetInvoiceItems?trno=${trno}&bookId=${bookId}`)
  .pipe(
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
