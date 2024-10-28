import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserInfo } from '../shared/models/userInfo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<UserInfo|null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor( private toastr : ToastrService , private http : HttpClient , private router : Router) { }

  login(values:any){
   return  this.http.post<any>(environment.apiUrl + 'Account/login',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;

        if (res.status == true) {
          this.toastr.success(message);
          localStorage.setItem('token',res.token);
          this.currentUserSource.next(res);
        }

        if (res.status == false) this.toastr.error(message);

        return res;
      })
    );
  }

  
  loadCurrentUser(token : string){
    return this.http.get<any>(`${environment.apiUrl}Account/GetUserInfoFromToken?token=${token}`).pipe(
      map((res) => {
        var message = res.message;

        if(res.status == false){
          this.toastr.error(message);
          this.currentUserSource.next(null);
          this.router.navigateByUrl('/branch')
        }

        if(res.status == true){
          this.currentUserSource.next(res);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/branch')
    this.toastr.success("تم تسجيل الخروج");

  }


  getAllCompanies(){
    return this.http.get<any>(environment.apiUrl+'DataBase/GetAllDataBases')
  }

  getAllStores(values:any){
    return  this.http.post<any>(environment.apiUrl + 'Account/getUserStores',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;

        if (res.status == true) {
          this.toastr.success(message);
          return res;

        }

        if (res.status == false)
           this.toastr.error(message);
      })
    );
  }


  getCompany(DataBaseId : any){
    return this.http.get<any>(`${environment.apiUrl}DataBase/GetDataBase?DataBaseId=${DataBaseId}`).pipe(
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
