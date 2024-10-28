import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsModuleServicesService {

  codeNumber : number = 0
  constructor(private http: HttpClient, public toastr: ToastrService) {
    
  }

  getAllItems() {
    return this.http.get<any[]>(environment.apiUrl + 'Items');
  }

  // السرفسيس الخاصه با دليل الحسابات

  GEtAllAccountsGuide(){
    return this.http.get<any>(environment.apiUrl +'AccountsGuide/GetAllAccounts')
  }

 
 GetNewAccountCode(mainAccountId : any){
    return this.http.get<any>(`${environment.apiUrl}AccountsGuide/GetNewAccountCode?mainAccountId=${mainAccountId}`)
 }

  GEtAllAccountsGuideForSelect(){
    return this.http.get<any>(environment.apiUrl +'AccountsGuide/GetAllAccountsForSelect')
  }
  
  GetAllCurrency(){
    return this.http.get<any>(environment.apiUrl+'Customers/GetAllCurrency')
  }

  AddCalAccountChart(values:any){
    return this.http.post<any>(environment.apiUrl+'AccountsGuide/AddCalAccountChart',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  DeleteAccountChart(accountId:any){
    return this.http.delete<any>(`${environment.apiUrl}AccountsGuide/DeleteAccountChart?accountId=${accountId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }

  GetAllUsers(){
    return this.http.get<any>(environment.apiUrl+'AccountsGuide/GetAllUsers')
  }

  AddCalAccountUser(values:any){
    return this.http.post<any>(environment.apiUrl+'AccountsGuide/AddCalAccountChartUser',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  
  GetAllAccountUsers(){
    return this.http.get<any>(environment.apiUrl+'AccountsGuide/GetAllCalAccountUsers')
  }

  DeleteAccountUser(accuserId:any){
    return this.http.delete<any>(`${environment.apiUrl}AccountsGuide/DeleteAccountUser?accUserId=${accuserId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }

  // السيرفسيس الخاصه بالانشطة
  GetAllActivities(){
    return this.http.get<any>(environment.apiUrl +'Activite/GetAllActivities')
  }

  GetAllActivitiesForSelect(){
    return this.http.get<any>(environment.apiUrl +'Activite/GetAllActivitiesForSelect')
  }

  AddActivity(values:any){
    return this.http.post<any>(environment.apiUrl+'Activite/AddCalActivity',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  DeleteActivity(activeId:any){
    return this.http.delete<any>(`${environment.apiUrl}Activite/DeleteActivity?ActiveId=${activeId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }




  // السيرفسيس الخاصه بمركز التكلفه 
  GEtAllCostCenter(){
    return this.http.get<any>(environment.apiUrl +'ColCostCenter/GetAllCostCenter')
  }

  GetAllCostCenterForSelect(){
    return this.http.get<any>(environment.apiUrl +'ColCostCenter/GetAllCostCenterForSelect')
  }

  GetAllSys_AnalyticalCodes(){
    return this.http.get<any>(environment.apiUrl +'ColCostCenter/GetAllSys_AnalyticalCodes')
  }
  
  AddCalCostCenter(values:any){
    return this.http.post<any>(environment.apiUrl+'ColCostCenter/AddCalCostCenter',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }


  DeleteCostCenter(costCenterId:any){
    return this.http.delete<any>(`${environment.apiUrl}ColCostCenter/DeleteCostCenter?costCenterId=${costCenterId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }


  // السيرفسيس الخاصه بالاكواد التحليلية
  GetAllSysAnalyticalCode(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllSysAnalyticalCode')
  }

  GetAllSysAnalyticalCodeForSelect(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllSysAnalyticalCodeForSelect')
  }

  GetAllAccountsForSelect(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllAccountChartForSelect')
  }

  GetAll_CostCenterForSelect(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllCostCenterForSelect')
  }

  GetAllCustomer(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllCustomer')
  }

  GetAllHrEmployees(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllHrEmployees')
  }

  GetAllAssets(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllAssets')
  }


  GetAllVendors(){
    return this.http.get<any>(environment.apiUrl +'SysAnalyticalCodes/GetAllVendors')
  }

  AddSysAnalyticalCode(values:any){
    return this.http.post<any>(environment.apiUrl+'SysAnalyticalCodes/AddSysAnalyticalCode',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  
  DeleteSysAnalyticalCode(aid:any){
    return this.http.delete<any>(`${environment.apiUrl}SysAnalyticalCodes/DeleteSysAnalyticalCode?aid=${aid}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }


  // العملات

   GetAllCurrencies(){
    return this.http.get<any>(environment.apiUrl +'MSCurrency/getAllCurrencies')
  }


  addCurrency(values : any){
    return this.http.post<any>(environment.apiUrl+'MSCurrency/AddCurrency',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  DeleteCurrency(aid:any){
    return this.http.delete<any>(`${environment.apiUrl}MSCurrency/DeleteCurrency?currencyId=${aid}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }


  // السيرفسيس الخاصه بالسنوات المالية 
  GetSysFinancialYears(){
    return this.http.get<any>(environment.apiUrl+'SysFinancialYears/GetAllSys_FinancialYears')
  }



  private arabicMonthNames: string[] = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  getDateRanges(startDate: Date, endDate: Date,financialYearsCode:any) {
    if (startDate > endDate) {
      throw new Error('تاريخ البداية يجب أن يكون قبل تاريخ النهاية.');
    }

    const dateRanges = [];
    let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const end = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
   
    while (current <= end) {
      let monthStart = new Date(current.getFullYear(), current.getMonth(), 1);
      let monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);

      if (monthStart < startDate) {
        monthStart = startDate;
      }

      if (monthEnd > endDate) {
        monthEnd = endDate;
      }

      const monthNameEnglish = monthStart.toLocaleString('default', { month: 'long' });
      const monthNameArabic = this.arabicMonthNames[monthStart.getMonth()];

      dateRanges.push({
        financialIntervalsId:null,
        monthNameE: monthNameEnglish,
        monthNameA: monthNameArabic,
        startingFrom: monthStart,
        endingDate: monthEnd,
        financialIntervalCode: `${financialYearsCode}-${dateRanges.length + 1}`,
        isClosed:false,
        isActive:true
      });
     

      current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }

    return dateRanges;
  }


  addfinancialYear(values : any){
    return this.http.post<any>(environment.apiUrl+'SysFinancialYears/AddFinancialYear',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  GetSysFinancialIntervals(FinancialYearsId:any){
    return this.http.get<any>(`${environment.apiUrl}SysFinancialYears/GetSysFinancialIntervals?FinancialYearsId=${FinancialYearsId}`)
  }
      
  DeleteFinance(FinancialYearsId:any){
    return this.http.delete<any>(`${environment.apiUrl}SysFinancialYears/DeleteFanincial?FinancialYearsId=${FinancialYearsId}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }

  // سيرفسيس مستند القبض

  getAllBooksForMsReceiptNote() {
    return this.http.get<any>(environment.apiUrl + 'MsReceiptNote/GetAllSysBooks');
  }

  getAllReceiptNote() {
    return this.http.get<any>(environment.apiUrl + 'MsReceiptNote/GetAllMsReceiptNote')
  }
   
  GetAllBoxBank() {
    return this.http.get<any>(environment.apiUrl + 'MsReceiptNote/GetAllBoxBank');
  }

  AddMsReturnPurchase(values:any){
    return this.http.post<any>(environment.apiUrl+'MS_ReturnPurchase/AddMsReturnPurchase',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  GetAccountBalance(accountId:any){
    return this.http.get<any>(`${environment.apiUrl}MsReceiptNote/GetAccountBalance?accountId=${accountId}`)
  }

  
  AddMsReceiptNote(values:any){
    return this.http.post<any>(environment.apiUrl+'MsReceiptNote/AddMsReceiptNote',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }
  

  DeleteReceiptNote(RectId:any,deletedBy:any){
    return this.http.delete<any>(`${environment.apiUrl}MsReceiptNote/DeleteReceiptNote?RectId=${RectId}&deletedBy=${deletedBy}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }


  // سيرفسيس مستند القبض

  getAllBooksForMsPaymentNote() {
    return this.http.get<any>(environment.apiUrl + 'MsPaymentNote/GetAllSysBooks');
  }

  getAllPaymentNote() {
    return this.http.get<any>(environment.apiUrl + 'MsPaymentNote/GetAllMsPaymentNote')
  }
    
  AddMsPaymentNote(values:any){
    return this.http.post<any>(environment.apiUrl+'MsPaymentNote/AddMsPaymentNote',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }
  
  DeletePaymenttNote(payId:any,deletedBy:any){
    return this.http.delete<any>(`${environment.apiUrl}MsPaymentNote/DeletePaymentNote?payId=${payId}&deletedBy=${deletedBy}`)
    .pipe(map((res)=>{
      var message = res.message;
      var messageEn = res.messageEn;
  
      if (res.status == true) this.toastr.success(message);
  
      if (res.status == false) this.toastr.error(message);
  
      return res.status;
    }))
  }


  // السيرفسيس الخاصه بقيد اليوميه
  GetAllCalJurnalEntry() {
    return this.http.get<any>(environment.apiUrl + 'CalJurnalEntry/GetAllCalJurnalEntry')
  }
   
  getAllBooksForJurnalEntry() {
    return this.http.get<any>(environment.apiUrl + 'CalJurnalEntry/GetAllSysBooks');
  }

  
  AddCalJurnalEntry(values:any){
    return this.http.post<any>(environment.apiUrl+'CalJurnalEntry/AddCalJurnalEntry',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  GetAllSearchAccounts(){
    return this.http.get<any>(environment.apiUrl+'CalJurnalEntry/GetAllAccounts')
   }
  
   updateCalJurnalDetail(values:any){
    return this.http.post<any>(environment.apiUrl+'CalJurnalEntry/updateCalJurnalDetail',values).pipe(
      map((res) => {
        var message = res.message;
        var messageEn = res.messageEn;
  
        if (res.status == true) this.toastr.success(message);
        
        if (res.status == false) this.toastr.error(message);
  
        return res;
      })
    );
  }

  getCalJurnalDetails(JurnalId:any){
    return this.http.get<any>(`${environment.apiUrl}CalJurnalEntry/getCalJurnalDetails?JurnalId=${JurnalId}`)
  }

  DeleteJournalDetail(jurnalDetailId: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}CalJurnalEntry/DeleteJournalDetail?jurnalDetailId=${jurnalDetailId}`)
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

}
