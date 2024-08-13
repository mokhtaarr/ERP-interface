import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SystemToolsService {

  constructor(private http: HttpClient, public toastr: ToastrService) {
    
  }


  // السيرفسيس الخاصه بالمستخدمين

  GetAllUsers(){
    return this.http.get<any>(environment.apiUrl +'Account/GetAllUsers')
  }

  AddUser(values:any){
    return this.http.post<any>(environment.apiUrl+'Account/AddUser',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  DeleteUser(userId:any){
    return this.http.delete<any>(`${environment.apiUrl}Account/DeleteUser?userId=${userId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }

  GetAllMsStores(){
    return this.http.get<any>(environment.apiUrl+'HR_Employees/GetAllMsStores')
  }

  GetAllEmployees(){
    return this.http.get<any>(environment.apiUrl+'Account/GetAllEmployees')
  }
}
