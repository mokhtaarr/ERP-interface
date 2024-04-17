import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Items } from '../shared/models/items';
import { environment } from 'src/environments/environment.prod';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {

  constructor(private http : HttpClient,public toastr:ToastrService) { }

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

}
