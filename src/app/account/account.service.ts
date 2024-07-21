import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor( private toastr : ToastrService , private http : HttpClient) { }

  login(values:any){
   return  this.http.post<any>(environment.apiUrl + 'Account/login',values).pipe(
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
}
