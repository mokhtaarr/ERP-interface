import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Items } from '../shared/models/items';
import { environment } from 'src/environments/environment.prod';
import { EMPTY, Observable, catchError, map, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Branches, partition } from './definition-models/Branches';

@Injectable({
  providedIn: 'root',
})
export class DefinitionService {
  private httpOptions = {};

  constructor(private http: HttpClient, public toastr: ToastrService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  // Items Services
  getAllItems() {
    return this.http.get<Items[]>(environment.apiUrl + 'Items');
  }

  addItem(formData: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http
      .post<Items>(environment.apiUrl + 'Items/AddItem', formData, { headers })
      .pipe(
        map(() => this.toastr.success('تم إضافة المنتج بنجاح')),
        catchError(() => {
          this.toastr.error('حدث خطأ أثناء إضافة المنتج');
          return EMPTY;
        })
      );
  }

  // Branches Servies
  getAllBranches() {
    return this.http.get<Branches[]>(environment.apiUrl + 'Branches');
  }

  getBranch(storeId: number) {
    return this.http.get<Branches>(
      environment.apiUrl + `Branches/storeId?storeId=${storeId}`
    );
  }

  getAllPartition_of_storeId(storeId: number) {
    return this.http.get<partition[]>(
      environment.apiUrl + `Branches/partation-of-StoreId?storeId=${storeId}`
    );
  }

  AddPartation(partition: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + 'Branches/AddPartition', partition)
      .pipe(
        map((res) => {
          var message = res.message;
          var messageEn = res.messageEn;

          if (res.status == true) {
            this.toastr.success(message);
          }

          if (res.status == false) this.toastr.error(message);

          return res;
        })
      );
  }

  UpdatePartition(partition: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + 'Branches/UpdatePartition', partition)
      .pipe(
        map((res) => {
          var message = res.message;
          var messageEn = res.messageEn;

          if (res.status == true) {
            this.toastr.success(message);
          }

          if (res.status == false) this.toastr.error(message);

          return res.storeId;
        })
      );
  }

  getParttion(partCode: string) {
    return this.http.get<partition>(
      environment.apiUrl + `Branches/GetPartition?partCode=${partCode}`
    );
  }

  AddBranch(values: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + 'Branches/AddStore', values)
      .pipe(
        map((res) => {
          var message = res.message;
          var messageEn = res.messageEn;

          if (res.status == true) {
            this.toastr.success(message);
          }

          if (res.status == false) this.toastr.error(message);

          return res.status;
        })
      );
  }

  UpdateBranch(values: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + 'Branches/UpdateStore', values)
      .pipe(
        map((res) => {
          var message = res.message;
          var messageEn = res.messageEn;

          if (res.status == true) {
            this.toastr.success(message);
          }

          if (res.status == false) this.toastr.error(message);

          return res;
        })
      );
  }

 


  DeleteBranch(storeId: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}Branches/DeleteStore/StoreId?storeId=${storeId}`)
      .pipe(
        map((res) => {
          var message = res.message;
          var messageEn = res.messageEn;

          if (res.status == true) {
            this.toastr.success(message);
          }

          if (res.status == false) this.toastr.error(message);

          return res;
        })
      );
  }


  DeletePartition(code: string) {
    return this.http
      .delete<any>(`${environment.apiUrl}Branches/DeletePartition/partitionCode?partitionCode=${code}`)
      .pipe(
        map((res) => {
          var message = res.message;
          var messageEn = res.messageEn;

          if (res.status == true) {
            this.toastr.success(message);
          }

          if (res.status == false) this.toastr.error(message);

          return res;
        })
      );
  }

  // السيرفسيس الخاصه بفئات الإصناف

  GetAllItemCategory(){
    return this.http.get<any>(environment.apiUrl +'ItemCategory/GetAllItemCategory')
  }

  AddItemCategory(values:any){
    return this.http.post<any>(environment.apiUrl+'ItemCategory/AddItemCategory',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;

        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);

        return res;
      })
    );
  }

  UpdateItemCategory(Values:any){
    return this.http.post<any>(environment.apiUrl+'ItemCategory/UpdateItemCategory',Values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;

        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);

        return res;
      })
    );
  }

  DeleteItemCategory(ItemCategoryId:any){
    return this.http.delete<any>(`${environment.apiUrl}ItemCategory/DeleteItemCategory?ItemCategoryId=${ItemCategoryId}`)
    .pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;

        if (res.status == true) this.toastr.success(message);

        if (res.status == false) this.toastr.error(message);

        return res.status;
      })
    );

}


// customer Category Services

 getAllCustomerCategory(){
  return this.http.get<any>(environment.apiUrl+'CustomerCategory/GetAllCustomerCategory')
 }

 AddCustomerCategory(values:any){
  return this.http.post<any>(environment.apiUrl+'CustomerCategory/AddCustomerCategory',values)
  .pipe(
    map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);

      if (res.status == false) this.toastr.error(message);

      return res.status;
    })
  )
 }

 DeleteCustomerCategory(customerCatId:any){
  return this.http.delete<any>(`${environment.apiUrl}CustomerCategory/DeleteCustomerCategory?CustomerCatId=${customerCatId}`)
  .pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);

      if (res.status == false) this.toastr.error(message);

      return res.status;
    })
  );
 }


 // Vendor Type  انواع الموردين

 GetAllVandorType(){
  return this.http.get<any>(environment.apiUrl + 'VendorType/GetAllVendorType');
 }

 AddVendorType(values:any){
  return this.http.post<any>(environment.apiUrl + 'VendorType/AddVendorType',values)
  .pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);

      if (res.status == false) this.toastr.error(message);

      return res.status;
    })
  );
 }
 
 DeleteVendorType(vendorTypeId:any){
  return this.http.delete<any>(`${environment.apiUrl}VendorType/DeleteVendorType?vendorTypeId=${vendorTypeId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
 }

 //customer type  انواع العملاء

 GetAllCustomerType(){
  return this.http.get<any>(environment.apiUrl+'CustomerType/GetAllCustomerType')
}

AddCustomerType(values:any){
  return this.http.post<any>(environment.apiUrl+'CustomerType/AddCustomerType',values)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res;
  }))
}

DeleteCustomerType(customerTypeId:any){
  return this.http.delete<any>(`${environment.apiUrl}CustomerType/DeleteCustomerType?customerTypeId=${customerTypeId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}


// hr jobs السيرفسيس الخاصه با ال hr jobs

GEtAllHrJobs(){
  return this.http.get<any>(environment.apiUrl +'HrJobs/GetAllHrJobs')
}

GEtAllHrJobsForJobs(){
  return this.http.get<any>(environment.apiUrl +'HrJobs/GetAllHrJobForSelect')
}



AddHrJob(values : any){
  return this.http.post<any>(environment.apiUrl +'HrJobs/AddHrJob',values)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;
  
    if (res.status == true) this.toastr.success(message);
  
    if (res.status == false) this.toastr.error(message);
  
    return res;
  }))
  
}

DeleteHrJob(jobId:any){
return this.http.delete<any>(`${environment.apiUrl}HrJobs/DeleteHrJob?JobId=${jobId}`)
.pipe(map((res)=>{
  var message = res.message;
  var messageEn = res.messageEn;

  if (res.status == true) this.toastr.success(message);

  if (res.status == false) this.toastr.error(message);

  return res.status;
}))
}




// HrDepartment  السيرفسيس الخاصه با

getAllHrDepartments(){
  return this.http.get<any>(environment.apiUrl + 'HrDepartments/GetAllHrDepartments')
}

AddHrDepartment(values:any){
  return this.http.post<any>(environment.apiUrl+'HrDepartments/AddHrDepartment',values)
  .pipe(map(res=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}


DeleteHrDepartment(departId : any){
  return this.http.delete<any>(`${environment.apiUrl}HrDepartments/DeleteHrDepartment?departMentId=${departId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}

// أشكال المركبات

GetAllVehicleShapes(){
  return this.http.get<any>(environment.apiUrl+'VehicleShapes/GetAllVehicleShapes')
}

AddVehicleShape(values : any){
  return this.http.post<any>(environment.apiUrl +'VehicleShapes/AddVehicleShapes',values)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;
  
    if (res.status == true) this.toastr.success(message);
  
    if (res.status == false) this.toastr.error(message);
  
    return res;
  }))
  
}

DeleteVehicleShapes(VehicleShapeId : any){
  return this.http.delete<any>(`${environment.apiUrl}VehicleShapes/DeleteVehicleShape?VehicleShapeId=${VehicleShapeId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}


// Cities services
GetAllCities(){
  return this.http.get<any>(environment.apiUrl +'City/GetAllCities')
}

AddCity(Values:any){
  return this.http.post<any>(environment.apiUrl+'City/AddCity',Values)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res;
  }))
}

DeleteCity(cityId : any){
  return this.http.delete<any>(`${environment.apiUrl}City/DeleteCity?CityId=${cityId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}


//vehicle Type  أنواع المركبات 
GetAllVehicleTypes(){
  return this.http.get<any>(environment.apiUrl+'VehicleTypes/GetAllVehicleType')
}

AddVehicleType(Values:any){
  return this.http.post<any>(environment.apiUrl+'VehicleTypes/AddVehicleType',Values)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res;
  }))
}

DeleteVehicleType(VehicleTypId : any){
  return this.http.delete<any>(`${environment.apiUrl}VehicleTypes/DeleteVehicleType?VehicleTypId=${VehicleTypId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}


// الماكينات و المعدات 
GetAllProdEquipments(){
  return this.http.get<any>(environment.apiUrl+'ProdEquipments/GetAllProdEquipments')
}

AddProdEquipment(values:any){
  return this.http.post<any>(environment.apiUrl+'ProdEquipments/AddProdEquipment',values).pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res;
  }))
}

DeleteProdEquipment(EquipId : any){
  return this.http.delete<any>(`${environment.apiUrl}ProdEquipments/DeleteProdEquipment?EquipId=${EquipId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}


// SysBooks   دفتر الحركات
GetAllSysBooks(){
  return this.http.get<any>(environment.apiUrl+'SysBooks/GetAllSysBooks')
}

GetAllTermType(){
  return this.http.get<any>(environment.apiUrl+'SysBooks/GetAllSysTermType')
}

GetAllUsers(){
  return this.http.get<any>(environment.apiUrl+'SysBooks/GetAllUsers')
}


GetAllBranches(){
  return this.http.get<any>(environment.apiUrl+'SysBooks/GetAllBranch')
}

AddSysBooks(values:any){
  return this.http.post<any>(environment.apiUrl+'SysBooks/AddSysBook',values).pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res;
  })) 
}

DeleteSysBook(BookId:any){
  return this.http.delete<any>(`${environment.apiUrl}SysBooks/DeleteCity?BookId=${BookId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}

//Basics Unit وحدات الاصناف

GetAlBasicUnits(){
return this.http.get<any>(environment.apiUrl+'BasicUnits/GetAlBasicUnits')
}


AddBasicUnit(values:any){
  return this.http.post<any>(environment.apiUrl+'BasicUnits/AddBasicUnit',values).pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res;
  })) 
}

DeleteBasicUnit(unitId:any){
  return this.http.delete<any>(`${environment.apiUrl}BasicUnits/DeleteBasicUnit?BasUnitId=${unitId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}


// customers  العملاء
GetAllCustomers(){
  return this.http.get<any>(environment.apiUrl+'Customers/GetAllCustomers')
}

GetCustomersType(){
  return this.http.get<any>(environment.apiUrl+'Customers/GetAllCustomersTypes')
}

GetAllCalCostCenter(){
  return this.http.get<any>(environment.apiUrl+'Customers/GetAllCostCenter')
}

GetAllHrEmployees(){
  return this.http.get<any>(environment.apiUrl+'Customers/GetAllHrEmployees')
}

GetAll_CustomerCategory(){
  return this.http.get<any>(environment.apiUrl+'Customers/GetAllCustomerCategory')
}

GetAllCurrency(){
  return this.http.get<any>(environment.apiUrl+'Customers/GetAllCurrency')
}

GetAllCalAccountChart(){
  return this.http.get<any>(environment.apiUrl+'Customers/GetAllCalAccountChart')
}

GetCustomerCities(){
  return this.http.get<any>(environment.apiUrl+'Customers/GetAllCities')
}


AddCustomer(values:any){
  return this.http.post<any>(environment.apiUrl+'Customers/AddCustomer',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

DeleteCustomer(customerId:any){
  return this.http.delete<any>(`${environment.apiUrl}Customers/DeleteCustomer?customerId=${customerId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}

 
AddCustomerBranch(values:any){
  return this.http.post<any>(environment.apiUrl+'Customers/AddCustomerBranch',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

GetCustomerBranches(customerId : any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAllCustomerBranches?customerId=${customerId}`)
}

DeleteCustomerBranch(custBranchId : any){
  return this.http.delete<any>(`${environment.apiUrl}Customers/DeleteCustomerBranch?custBranchId=${custBranchId}`).pipe(
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
