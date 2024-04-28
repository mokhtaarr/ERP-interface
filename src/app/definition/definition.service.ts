import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Items } from '../shared/models/items';
import { environment } from 'src/environments/environment.prod';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Branches, partition } from './definition-models/Branches';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {

  private httpOptions = {};

  constructor(private http : HttpClient,public toastr:ToastrService) { 
    this.httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  }



  // Items Services
  getAllItems(){
    return this.http.get<Items[]>(environment.apiUrl + 'Items')
  }

  addItem(formData:any){

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    
    return this.http.post<Items>(environment.apiUrl+'Items/AddItem',formData , { headers }).pipe(
      map(()=>
        this.toastr.success("تم إضافة المنتج بنجاح"),
      ),
      catchError(() => {
        this.toastr.error("حدث خطأ أثناء إضافة المنتج");
        return EMPTY;
      })
    );
  }




  // Branches Servies
  getAllBranches(){
    return this.http.get<Branches[]>(environment.apiUrl + 'Branches')
  }

  getBranch(storeId : number){
    return this.http.get<Branches>(environment.apiUrl +`Branches/storeId?storeId=${storeId}`)
  }

  getAllPartition_of_storeId(storeId : number){
    return this.http.get<partition[]>(environment.apiUrl +`Branches/partation-of-StoreId?storeId=${storeId}`)
  }

  

  AddPartation(partition : any) : Observable<any>{
    return this.http.post<any>(environment.apiUrl+'Branches/AddPartition',partition).pipe(
      map( res => {

        var message = res.message;
        var messageEn = res.messageEn;

        if(res.status == true){
          this.toastr.success(message);

        }
        

        if(res.status == false)
          this.toastr.error(message);
        
        return res;
       
      })
    );
  }

  UpdatePartition(partition : any) : Observable<any>{
    return this.http.post<any>(environment.apiUrl+'Branches/UpdatePartition',partition).pipe(
      map( res => {

        var message = res.message;
        var messageEn = res.messageEn;

        if(res.status == true){
          this.toastr.success(message);

        }
        

        if(res.status == false)
          this.toastr.error(message);
        
        return res.storeId;
       
      })
    );
  }


  getParttion(partCode:string){
    return this.http.get<partition>(environment.apiUrl +`Branches/GetPartition?partCode=${partCode}`)
  }


  AddBranch(values:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl+'Branches/AddStore',values).pipe(
      map( res => {

        var message = res.message;
        var messageEn = res.messageEn;

        if(res.status == true){
          this.toastr.success(message);

        }
        

        if(res.status == false)
          this.toastr.error(message);
        
        return res;
       
      })
    ); 
 }


 UpdateBranch(values:any):Observable<any>{
  return this.http.post<any>(environment.apiUrl+'Branches/UpdateStore',values).pipe(
    map( res => {

      var message = res.message;
      var messageEn = res.messageEn;

      if(res.status == true){
        this.toastr.success(message);

      }
      

      if(res.status == false)
        this.toastr.error(message);
      
      return res;
     
    })
  ); 
}


 
}
