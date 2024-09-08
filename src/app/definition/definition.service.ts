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

  DeleteItem(itemCardId : any){
    return this.http
        .delete<any>(`${environment.apiUrl}Items/DeleteItemCard?itemCardId=${itemCardId}`)
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

  GetAllItemForItemCollections(){
    return this.http.get<any>(environment.apiUrl+'Items/GetAllItemForItemCollections')
   }

  getAllProdBasicUnits() {
    return this.http.get<any>(environment.apiUrl + 'Items/GetAllProdBsicUnits')
  }

  AddItemWitImage(formData: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<Items>(environment.apiUrl + 'Items/AddItemWitImage', formData, { headers });
     
  }

  GetItemUnitsForItemCollection(itemCardId:any){
    return this.http.get<any>(`${environment.apiUrl}Items/GetItemUnits?itemCardId=${itemCardId}`)
  }

  AddMsItemCard(values: any) {
    return this.http.post<any>(environment.apiUrl+'Items/AddMsItemCard',values).pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res;
    })) 
  }

GetItemUnit(itemCardId : any){
  return this.http.get<any>(`${environment.apiUrl}Items/GetAllItemUnit?itemCardId=${itemCardId}`)
}

GetBasicItemUnit(basUnitId : any){
  return this.http.get<any>(`${environment.apiUrl}Items/GetBasicItemUnit?basUnitId=${basUnitId}`)
}

GetItemUnitSub(basUnitId : any){
  return this.http.get<any>(`${environment.apiUrl}Items/GetAllProdBsicUnitsSub?basUnitId=${basUnitId}`)
}

UpdateItemCollection(values: any): Observable<any> {
  return this.http
    .post<any>(environment.apiUrl + 'Items/UpdateItemCollection', values)
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

UpdateItemAlter(values: any): Observable<any> {
  return this.http
    .post<any>(environment.apiUrl + 'Items/UpdateItemAlter', values)
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


AddItemUnit(values:any){
  return this.http.post<any>(environment.apiUrl+'Items/AddItemUnit',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

UpdateItemUnit(values:any){
  return this.http.post<any>(environment.apiUrl+'Items/UpdateItemUnit',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}


DeleteItemUnit(unitId: number) {
  return this.http
    .delete<any>(`${environment.apiUrl}Items/DeleteItemUnit?unitId=${unitId}`)
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

GetItemPartitionWithHisStore(){
  return this.http.get<any>(environment.apiUrl +'Items/GetItemPartitionWithHisStore')
}

GetItemImage(itemCardId:any){
  return this.http.get<any>(`${environment.apiUrl}Items/GetProductImage?itemCardId=${itemCardId}`)
}

GetItemCollections(itemCardId : any){
  return this.http.get<any>(`${environment.apiUrl}Items/GetItemCollection?itemCardId=${itemCardId}`)
}

GetItemAlternatives(itemCardId : any){
  return this.http.get<any>(`${environment.apiUrl}Items/GetItemAlternatives?itemCardId=${itemCardId}`)
}

GetItemDefaultPartitions(itemCardId : any){
  return this.http.get<any>(`${environment.apiUrl}Items/GetItemDefaultPartitions?itemCardId=${itemCardId}`)
}

DeleteItemDefaultPartition(itemStorePrtId: number) {
  return this.http
    .delete<any>(`${environment.apiUrl}Items/DeleteItemDefaultPartition?itemStorePrtId=${itemStorePrtId}`)
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


DeleteItemCollection(itemCollectId: number) {
  return this.http
    .delete<any>(`${environment.apiUrl}Items/DeleteItemCollection?itemCollectId=${itemCollectId}`)
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

DeleteItemAlternatives(alterId: number) {
  return this.http
    .delete<any>(`${environment.apiUrl}Items/DeleteItemAlternative?alterId=${alterId}`)
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

  GetAllItemCategories(){
    return this.http.get<any>(environment.apiUrl +'Items/GetAllItemCategory')
  }

  GetAllPartitions(){
    return this.http.get<any>(environment.apiUrl +'Items/GetAllPartition')
  }

  // Branches Servies
  getAllBranches() {
    return this.http.get<any[]>(environment.apiUrl + 'Branches');
  }

  GetAllBoxBankForBranches(){
    return this.http.get<any>(environment.apiUrl +'Branches/GetAllBoxBanks')
  }

  getBranch(storeId: number) {
    return this.http.get<any>(
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

          return res;
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

updateUnit(values:any){
  return this.http.post<any>(environment.apiUrl+'BasicUnits/UpdateUnit',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

AddUnit(values:any){
  return this.http.post<any>(environment.apiUrl+'BasicUnits/AddUnit',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
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

DeleteUnit(basUnitId:any){
  return this.http.delete<any>(`${environment.apiUrl}BasicUnits/DeleteUnit?BasUnitId=${basUnitId}`)
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

GetCustomerContact(customerId : any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAllCustomerContact?customerId=${customerId}`)
}

AddCustomerContact(values:any){
  return this.http.post<any>(environment.apiUrl+'Customers/AddCustomerContact',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}



DeleteCustomerContact(custContactId : any){
  return this.http.delete<any>(`${environment.apiUrl}Customers/DeleteCustomerContact?custContactId=${custContactId}`).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

GetAllCountries(){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAllCountries`)
}

GetMainChartAccount(customerId : any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetMainCharAccount?customerId=${customerId}`)
}

GetAdditionalAccount(customerId : any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAllAdditionalAccount?customerId=${customerId}`)
}

GetCustomerMainAccount(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetUserMainAccount?customerId=${customerId}`)
}

GetAdditionalaccount1(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount1?customerId=${customerId}`)
}

GetAdditionalaccount2(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount2?customerId=${customerId}`)
}

GetAdditionalaccount3(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount3?customerId=${customerId}`)
}

GetAdditionalaccount4(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount4?customerId=${customerId}`)
}

GetAdditionalaccount5(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount5?customerId=${customerId}`)
}

GetAdditionalaccount6(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount6?customerId=${customerId}`)
}

GetAdditionalaccount7(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount7?customerId=${customerId}`)
}

GetAdditionalaccount8(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount8?customerId=${customerId}`)
}

GetAdditionalaccount9(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount9?customerId=${customerId}`)
}

GetAdditionalaccount10(customerId:any){
  return this.http.get<any>(`${environment.apiUrl}Customers/GetAdditionalaccount10?customerId=${customerId}`)
}


// الموردين    Vendors

GetAllVendors(){
  return this.http.get<any>(environment.apiUrl+'Suppliers/GetAllSuppliers')
}

DeleteVendor(vendorId:any){
  return this.http.delete<any>(`${environment.apiUrl}Suppliers/DeleteVendor?VendorId=${vendorId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}

GetVendorTypes(){
  return this.http.get<any>(environment.apiUrl+'Suppliers/GetAllVendorTypes')
}

GetVendorCategories(){
  return this.http.get<any>(environment.apiUrl+'Suppliers/GetAllVendorsCategories')
}

AddVendor(values:any){
  return this.http.post<any>(environment.apiUrl+'Suppliers/AddVendor',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

GetAllVendorAdditionalAccount(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAllAdditionalAccount?vendorId=${vendorId}`)
}


GetVendorMainChartAccount(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetMainCharAccount?vendorId=${vendorId}`)
}

GeVendorMainAccount(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GeVendorMainAccount?vendorId=${vendorId}`)

}
GetVendorAdditionalAccount(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount1?vendorId=${vendorId}`)
}

GetVendorAdditionalAccount2(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount2?vendorId=${vendorId}`)
}

GetVendorAdditionalAccount3(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount3?vendorId=${vendorId}`)
}

GetVendorAdditionalAccount4(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount4?vendorId=${vendorId}`)
}

GetVendorAdditionalAccount5(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount5?vendorId=${vendorId}`)
}


GetVendorAdditionalAccount6(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount6?vendorId=${vendorId}`)
}

GetVendorAdditionalAccount7(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount7?vendorId=${vendorId}`)
}

GetVendorAdditionalAccount8(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount8?vendorId=${vendorId}`)
}

GetVendorAdditionalAccount9(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount9?vendorId=${vendorId}`)
}

GetVendorAdditionalAccount10(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAdditionalaccount10?vendorId=${vendorId}`)
}

AddVendorBranch(values:any){
  return this.http.post<any>(environment.apiUrl+'Suppliers/AddVendorBranch',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

GetVendorBranches(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAllVendorBranches?vendorId=${vendorId}`)
}

DeleteVendorBranch(custBranchId : any){
  return this.http.delete<any>(`${environment.apiUrl}Suppliers/DeleteVendorBranch?VendBranchId=${custBranchId}`).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}


GetVendorContacts(vendorId : any){
  return this.http.get<any>(`${environment.apiUrl}Suppliers/GetAllVendorContacts?vendorId=${vendorId}`)
}

AddVendorContact(values:any){
  return this.http.post<any>(environment.apiUrl+'Suppliers/AddVendorContact',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}



DeleteVendorContact(VendContactId : any){
  return this.http.delete<any>(`${environment.apiUrl}Suppliers/DeleteVendorContact?VendContactId=${VendContactId}`).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

// HrEmployee الموظفين
GetHrEmployees(){
  return this.http.get<any>(environment.apiUrl+'HR_Employees/GetAllHrEmployees')
}

GetAllHrDepartment(){
  return this.http.get<any>(environment.apiUrl+'HR_Employees/GetAllHrDepartment')
}

GetAllHrJobs(){
  return this.http.get<any>(environment.apiUrl+'HR_Employees/GetAllHrJobs')
}

GetAllMsStores(){
  return this.http.get<any>(environment.apiUrl+'HR_Employees/GetAllMsStores')

}

GetEmployeeMainAccount(empId : any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetMainAccountForEmployee?empId=${empId}`)
}

AddEmployee(values:any){
  return this.http.post<any>(environment.apiUrl+'HR_Employees/AddHrEmployee',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}

GetEmpAdditionalAccount(empId : any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAllAdditionalAccount?empId=${empId}`)
}
GetEmpMainAccount(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetEmployeeMainAccount?empId=${empId}`)
}

GetEmpAdditionalaccount1(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount1?empId=${empId}`)
}

GetEmpAdditionalaccount2(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount2?empId=${empId}`)
}

GetEmpAdditionalaccount3(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount3?empId=${empId}`)
}

GetEmpAdditionalaccount4(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount4?empId=${empId}`)
}

GetEmpAdditionalaccount5(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount5?empId=${empId}`)
}

GetEmpAdditionalaccount6(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount6?empId=${empId}`)
}

GetEmpAdditionalaccount7(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount7?empId=${empId}`)
}

GetEmpAdditionalaccount8(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount8?empId=${empId}`)
}

GetEmpAdditionalaccount9(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount9?empId=${empId}`)
}

GetEmpAdditionalaccount10(empId:any){
  return this.http.get<any>(`${environment.apiUrl}HR_Employees/GetAdditionalaccount10?empId=${empId}`)
}


DeleteEmployee(empId:any){
  return this.http.delete<any>(`${environment.apiUrl}HR_Employees/DeleteEmployee?empId=${empId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res.status;
  }))
}


// box bank services 


GetAllBoxBanks(){
  return this.http.get<any>(environment.apiUrl+'Boxes/GetAllBoxBanks')
}


GetAllAccountForBoxBanks(){
  return this.http.get<any>(environment.apiUrl+'Boxes/GetAllAccount')
}


AddBoxBank(values:any){
  return this.http.post<any>(environment.apiUrl+'Boxes/AddBox',values).pipe(
    map((res) => {
      var message = res.message;
      var messageEn = res.messageEn;

      if (res.status == true) this.toastr.success(message);
      
      if (res.status == false) this.toastr.error(message);

      return res;
    })
  );
}


DeleteBoxBank(BoxId:any){
  return this.http.delete<any>(`${environment.apiUrl}Boxes/DeleteBoxBank?BoxId=${BoxId}`)
  .pipe(map((res)=>{
    var message = res.message;
    var messageEn = res.messageEn;

    if (res.status == true) this.toastr.success(message);

    if (res.status == false) this.toastr.error(message);

    return res;
  }))
}

}
