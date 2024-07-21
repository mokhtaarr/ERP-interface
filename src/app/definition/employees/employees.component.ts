import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { MatSelectChange } from '@angular/material/select';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['empCode', 'name1', 'name2', 'remarks'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllHrEmployess : any[] = [];
  AllCalAccountChart:any[]=[];

  
  MainAccountId : any;

  originalPrimaryAccountValue: any;
  originalAddAccount1Value: any;
  originalAddAccount2Value: any;
  originalAddAccount3Value: any;
  originalAddAccount4Value: any;
  originalAddAccount5Value: any;
  originalAddAccount6Value: any;
  originalAddAccount7Value: any;
  originalAddAccount8Value: any;
  originalAddAccount9Value: any;
  originalAddAccount10Value: any;

  isPrimaryAccountChanged = false;
  isAddAccount1Changed = false;
  isAddAccount2Changed = false;
  isAddAccount3Changed = false;
  isAddAccount4Changed = false;
  isAddAccount5Changed = false;
  isAddAccount6Changed = false;
  isAddAccount7Changed = false;
  isAddAccount8Changed = false;
  isAddAccount9Changed = false;
  isAddAccount10Changed = false;
  IsPrimaryAccountChangedForm: any;

  
  DisabledPrevButton: boolean = false;
  DisabledNextButton: boolean = false;
  firstRow: boolean = false;
  lastRow: boolean = false;
  DeleteDisable :boolean = true;
  SaveDisable : boolean = true;
  UpdateDisable : boolean = true;

  EditReadonly : boolean = false;
  reloadDisabled : boolean = true;
  UndoDisabled : boolean = true;
  undoIndex!: number;
  AllCurrency: any;

  AllHrDepartment:any;
  AllHrJobs:any;
  AllStores:any;
  
  readonlyField : boolean = true;

  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }

  ngOnInit(): void {
    this.HrEmployeesForm.disable();
    this.GetAllHrEmployees();
    this.GetAllAccountChart();
    this.GetAllCurrency();
    this.GetAllHrDepartment();
    this.GetAllAccountChart();
    this.GetAllHrJobs();
    this.GetAllMsStores();
  }

  HrEmployeesForm = this.fb.group({
    empId:[],
    empCode:['',Validators.required],
    name1:['',Validators.required],
    name2:[''],
    deviceEmpCode:[''],
    birthDate:[],
    idno:[''],
    isTechnician:[false],
    isSales:[false],
    isMoneyCollector:[false],   
    kidsNo:[],
    idissueDate:[],
    currencyId:[,Validators.required],
    idexpiryDate:[],
    email:[''],
    address1:[''],
    address2:[''],
    phone1:[''],
    phone2:[''],
    phone3:[''],
    accountId:[,Validators.required],
    departMentId:[,Validators.required],
    jobId:[,Validators.required],
    storeId:[],
    gender:[],
    taxRefNo:[''],
    remarks:[''],
    qualification:[''],
    IsPrimaryAccountChangedForm:[false],
    isAddAccount1ChangedForm:[false],
    isAddAccount2ChangedForm:[false],
    isAddAccount3ChangedForm:[false],
    isAddAccount4ChangedForm:[false],
    isAddAccount5ChangedForm:[false],
    isAddAccount6ChangedForm:[false],
    isAddAccount7ChangedForm:[false],
    isAddAccount8ChangedForm:[false],
    isAddAccount9ChangedForm:[false],
    isAddAccount10ChangedForm:[false],
    openningBalanceDepit:[],
    openningBalanceCredit:[],
    accCurrTrancDepit:[],
    accCurrTrancCredit:[],
    accTotalDebit:[],
    accTotaCredit:[],
    balanceDebitLocal:[],
    balanceCreditLocal:[],
    openningBalanceDepitCurncy:[],
    openningBalanceCreditCurncy:[],
    accCurrTrancDepitCurncy:[],
    accCurrTrancCreditCurncy:[],
    accTotalDebitCurncy:[],
    accTotaCreditCurncy:[],
    balanceDebitCurncy:[],
    balanceCreditCurncy:[],
    addAccount1:[],
    addAccount2:[],
    addAccount3:[],
    addAccount4:[],
    addAccount5:[],
    addAccount6:[],
    addAccount7:[],
    addAccount8:[],
    addAccount9:[],
    addAccount10:[],
  })

  
  GetAllHrEmployees(){
    this.definitionService.GetHrEmployees().subscribe(res=>{
      this.AllHrEmployess = res;
      this.dataSource = new MatTableDataSource<any>(this.AllHrEmployess);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

 GetAllHrDepartment(){
  this.definitionService.GetAllHrDepartment().subscribe(res=>{
      this.AllHrDepartment = res
    })
 }


  GetAllAccountChart(){
    this.definitionService.GetAllCalAccountChart().subscribe(res=>{
      this.AllCalAccountChart = res
    })
   }

   GetAllCurrency(){
    this.definitionService.GetAllCurrency().subscribe(res=>{
      this.AllCurrency=res;
    })
   }

   GetAllHrJobs(){
    this.definitionService.GetAllHrJobs().subscribe(res=>{
      this.AllHrJobs=res;
    })
   }

   GetAllMsStores(){
    this.definitionService.GetAllMsStores().subscribe(res=>{
      this.AllStores=res;
    })
   }
  

   onPrimaryAccountChange(event: MatSelectChange) {
    this.isPrimaryAccountChanged = event.value !== this.originalPrimaryAccountValue;
  }

  onAddAccount1Change(event: MatSelectChange) {
    this.isAddAccount1Changed = event.value !== this.originalAddAccount1Value;
  }

  onAddAccount2Change(event: MatSelectChange) {
    this.isAddAccount2Changed = event.value !== this.originalAddAccount2Value;
  }

  onAddAccount3Change(event: MatSelectChange) {
    this.isAddAccount3Changed = event.value !== this.originalAddAccount3Value;
  }

  onAddAccount4Change(event: MatSelectChange) {
    this.isAddAccount4Changed = event.value !== this.originalAddAccount4Value;
  }

  onAddAccount5Change(event: MatSelectChange) {
    this.isAddAccount5Changed = event.value !== this.originalAddAccount5Value;
  }

  onAddAccount6Change(event: MatSelectChange) {
    this.isAddAccount6Changed = event.value !== this.originalAddAccount6Value;
  }

  onAddAccount7Change(event: MatSelectChange) {
    this.isAddAccount7Changed = event.value !== this.originalAddAccount7Value;
  }

  onAddAccount8Change(event: MatSelectChange) {
    this.isAddAccount8Changed = event.value !== this.originalAddAccount8Value;
  }

  onAddAccount9Change(event: MatSelectChange) {
    this.isAddAccount9Changed = event.value !== this.originalAddAccount9Value;
  }

  onAddAccount10Change(event: MatSelectChange) {
    this.isAddAccount10Changed = event.value !== this.originalAddAccount10Value;
  }

 
  
  New() {
    this.HrEmployeesForm.enable();
    this.AllHrEmployess = this.dataSource.filteredData;
    this.undoIndex = this.AllHrEmployess.findIndex(p=>p.empId == this.HrEmployeesForm.value.empId);
    this.HrEmployeesForm.setValue({
      empId: null,
      empCode: null,
      name1: null,
      name2: null,
      deviceEmpCode: null,
      birthDate: null,
      idno: null,
      isTechnician: null,
      isSales: null,
      isMoneyCollector: null,
      kidsNo: null,
      idissueDate: null,
      currencyId: null,
      idexpiryDate: null,
      email: null,
      address1: null,
      address2: null,
      phone1: null,
      phone2: null,
      phone3: null,
      accountId: null,
      departMentId: null,
      jobId: null,
      storeId: null,
      gender: null,
      taxRefNo: null,
      remarks: null,
      qualification: null,
      IsPrimaryAccountChangedForm: null,
      isAddAccount1ChangedForm: null,
      isAddAccount2ChangedForm: null,
      isAddAccount3ChangedForm: null,
      isAddAccount4ChangedForm: null,
      isAddAccount5ChangedForm: null,
      isAddAccount6ChangedForm: null,
      isAddAccount7ChangedForm: null,
      isAddAccount8ChangedForm: null,
      isAddAccount9ChangedForm: null,
      isAddAccount10ChangedForm: null,
      openningBalanceDepit: null,
      openningBalanceCredit: null,
      accCurrTrancDepit: null,
      accCurrTrancCredit: null,
      accTotalDebit: null,
      accTotaCredit: null,
      balanceDebitLocal: null,
      balanceCreditLocal: null,
      openningBalanceDepitCurncy: null,
      openningBalanceCreditCurncy: null,
      accCurrTrancDepitCurncy: null,
      accCurrTrancCreditCurncy: null,
      accTotalDebitCurncy: null,
      accTotaCreditCurncy: null,
      balanceDebitCurncy: null,
      balanceCreditCurncy: null,
      addAccount1: null,
      addAccount2: null,
      addAccount3: null,
      addAccount4: null,
      addAccount5: null,
      addAccount6: null,
      addAccount7: null,
      addAccount8: null,
      addAccount9: null,
      addAccount10: null
    })
    this.DisabledNextButton = true;
    this.DisabledPrevButton = true;
    this.lastRow = true;
    this.firstRow = true;
    this.UpdateDisable = true;
    this.SaveDisable = false;
    this.EditReadonly = false;
    this.reloadDisabled = true;
    this.DeleteDisable = true;
    this.UndoDisabled = false; 
   }
  
   
 updateHrEmployee(){
  this.HrEmployeesForm.enable();
  this.DeleteDisable = true;
  this.DisabledNextButton = true;
  this.DisabledPrevButton = true;
  this.lastRow = true;
  this.firstRow = true;
  this.SaveDisable = false;
  this.EditReadonly = true;
  this.reloadDisabled = false;
  this.UpdateDisable = true;
  this.UndoDisabled = false;
  this.AllHrEmployess = this.dataSource.filteredData;
  this.undoIndex = this.AllHrEmployess.findIndex(p=>p.empId == this.HrEmployeesForm.value.empId);
 }

 
 undo(){
  this.HrEmployeesForm.disable();

    if(this.undoIndex != -1){
      const undoItem = this.AllHrEmployess[this.undoIndex]

      if(undoItem){
        this.definitionService.GetEmployeeMainAccount(undoItem.empId).subscribe(res=>{
          this.MainAccountId = res;
        })
        this.HrEmployeesForm.setValue({
          empId: undoItem.empId,
          empCode: undoItem.empCode,
          name1: undoItem.name1,
          name2: undoItem.name2,
          deviceEmpCode: undoItem.deviceEmpCode,
          birthDate: undoItem.birthDate,
          idno: undoItem.idno,
          isTechnician: undoItem.isTechnician,
          isSales: undoItem.isSales,
          isMoneyCollector: undoItem.isMoneyCollector,
          kidsNo: undoItem.kidsNo,
          idissueDate: undoItem.idissueDate,
          currencyId: undoItem.currencyId,
          idexpiryDate: undoItem.idexpiryDate,
          email: undoItem.email,
          address1: undoItem.address1,
          address2: undoItem.address2,
          phone1: undoItem.phone1,
          phone2: undoItem.phone2,
          phone3: undoItem.phone3,
          accountId: this.MainAccountId,
          departMentId: undoItem.departMentId,
          jobId: undoItem.jobId,
          storeId: undoItem.storeId,
          gender: undoItem.gender,
          taxRefNo: undoItem.taxRefNo,
          remarks: undoItem.remarks,
          qualification: undoItem.qualification,
          IsPrimaryAccountChangedForm: null,
          isAddAccount1ChangedForm: null,
          isAddAccount2ChangedForm: null,
          isAddAccount3ChangedForm: null,
          isAddAccount4ChangedForm: null,
          isAddAccount5ChangedForm: null,
          isAddAccount6ChangedForm: null,
          isAddAccount7ChangedForm: null,
          isAddAccount8ChangedForm: null,
          isAddAccount9ChangedForm: null,
          isAddAccount10ChangedForm: null,
          openningBalanceDepit: null,
          openningBalanceCredit: null,
          accCurrTrancDepit: null,
          accCurrTrancCredit: null,
          accTotalDebit: null,
          accTotaCredit: null,
          balanceDebitLocal: null,
          balanceCreditLocal: null,
          openningBalanceDepitCurncy: null,
          openningBalanceCreditCurncy: null,
          accCurrTrancDepitCurncy: null,
          accCurrTrancCreditCurncy: null,
          accTotalDebitCurncy: null,
          accTotaCreditCurncy: null,
          balanceDebitCurncy: null,
          balanceCreditCurncy: null,
          addAccount1: null,
          addAccount2: null,
          addAccount3: null,
          addAccount4: null,
          addAccount5: null,
          addAccount6: null,
          addAccount7: null,
          addAccount8: null,
          addAccount9: null,
          addAccount10: null
        })
      
      this.UpdateDisable = false;
      this.DisabledNextButton = false;
      this.DisabledPrevButton = false;
      this.lastRow = false;
      this.firstRow = false;
      this.reloadDisabled = false;
      this.SaveDisable = true;
      this.UndoDisabled = true;
      this.DeleteDisable = false;
   
     }
    }
 }

 
 Open_delete_confirm() {
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.definitionService.DeleteEmployee(this.HrEmployeesForm.value.empId).subscribe(res=>{
        if(res){
          this.GetAllHrEmployees();
          this.HrEmployeesForm.setValue({
            empId: null,
            empCode: null,
            name1: null,
            name2: null,
            deviceEmpCode: null,
            birthDate: null,
            idno: null,
            isTechnician: null,
            isSales: null,
            isMoneyCollector: null,
            kidsNo: null,
            idissueDate: null,
            currencyId: null,
            idexpiryDate: null,
            email: null,
            address1: null,
            address2: null,
            phone1: null,
            phone2: null,
            phone3: null,
            accountId: null,
            departMentId: null,
            jobId: null,
            storeId: null,
            gender: null,
            taxRefNo: null,
            remarks: null,
            qualification: null,
            IsPrimaryAccountChangedForm: null,
            isAddAccount1ChangedForm: null,
            isAddAccount2ChangedForm: null,
            isAddAccount3ChangedForm: null,
            isAddAccount4ChangedForm: null,
            isAddAccount5ChangedForm: null,
            isAddAccount6ChangedForm: null,
            isAddAccount7ChangedForm: null,
            isAddAccount8ChangedForm: null,
            isAddAccount9ChangedForm: null,
            isAddAccount10ChangedForm: null,
            openningBalanceDepit: null,
            openningBalanceCredit: null,
            accCurrTrancDepit: null,
            accCurrTrancCredit: null,
            accTotalDebit: null,
            accTotaCredit: null,
            balanceDebitLocal: null,
            balanceCreditLocal: null,
            openningBalanceDepitCurncy: null,
            openningBalanceCreditCurncy: null,
            accCurrTrancDepitCurncy: null,
            accCurrTrancCreditCurncy: null,
            accTotalDebitCurncy: null,
            accTotaCreditCurncy: null,
            balanceDebitCurncy: null,
            balanceCreditCurncy: null,
            addAccount1: null,
            addAccount2: null,
            addAccount3: null,
            addAccount4: null,
            addAccount5: null,
            addAccount6: null,
            addAccount7: null,
            addAccount8: null,
            addAccount9: null,
            addAccount10: null
          })
          this.DeleteDisable = true;
          this.UpdateDisable = true;
          
        }
      })
         
    }
  });
}

 getFirstRowData() {
  this.AllHrEmployess = this.dataSource.filteredData
  const FirstItem = this.AllHrEmployess[0];
    if(FirstItem){
      this.definitionService.GetEmployeeMainAccount(FirstItem.empId).subscribe(res=>{
        this.MainAccountId = res;
      })
      this.HrEmployeesForm.setValue({
        empId: FirstItem.empId,
        empCode: FirstItem.empCode,
        name1: FirstItem.name1,
        name2: FirstItem.name2,
        deviceEmpCode: FirstItem.deviceEmpCode,
        birthDate: FirstItem.birthDate,
        idno: FirstItem.idno,
        isTechnician: FirstItem.isTechnician,
        isSales: FirstItem.isSales,
        isMoneyCollector: FirstItem.isMoneyCollector,
        kidsNo: FirstItem.kidsNo,
        idissueDate: FirstItem.idissueDate,
        currencyId: FirstItem.currencyId,
        idexpiryDate: FirstItem.idexpiryDate,
        email: FirstItem.email,
        address1: FirstItem.address1,
        address2: FirstItem.address2,
        phone1: FirstItem.phone1,
        phone2: FirstItem.phone2,
        phone3: FirstItem.phone3,
        accountId: this.MainAccountId,
        departMentId: FirstItem.departMentId,
        jobId: FirstItem.jobId,
        storeId: FirstItem.storeId,
        gender: FirstItem.gender,
        taxRefNo: FirstItem.taxRefNo,
        remarks: FirstItem.remarks,
        qualification: FirstItem.qualification,
        IsPrimaryAccountChangedForm: null,
        isAddAccount1ChangedForm: null,
        isAddAccount2ChangedForm: null,
        isAddAccount3ChangedForm: null,
        isAddAccount4ChangedForm: null,
        isAddAccount5ChangedForm: null,
        isAddAccount6ChangedForm: null,
        isAddAccount7ChangedForm: null,
        isAddAccount8ChangedForm: null,
        isAddAccount9ChangedForm: null,
        isAddAccount10ChangedForm: null,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        accCurrTrancDepit: null,
        accCurrTrancCredit: null,
        accTotalDebit: null,
        accTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        accCurrTrancDepitCurncy: null,
        accCurrTrancCreditCurncy: null,
        accTotalDebitCurncy: null,
        accTotaCreditCurncy: null,
        balanceDebitCurncy: null,
        balanceCreditCurncy: null,
        addAccount1: null,
        addAccount2: null,
        addAccount3: null,
        addAccount4: null,
        addAccount5: null,
        addAccount6: null,
        addAccount7: null,
        addAccount8: null,
        addAccount9: null,
        addAccount10: null
      })
    this.firstRow = true;
    this.lastRow = false;
    this.DisabledPrevButton = true;
    this.DisabledNextButton = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;
    }
}

getNextRowData() {
  this.AllHrEmployess = this.dataSource.filteredData;

  const index = this.AllHrEmployess.findIndex(p=>p.empId == this.HrEmployeesForm.value.empId);

  const nextItem = this.AllHrEmployess[index + 1];

  if(nextItem){
    this.definitionService.GetEmployeeMainAccount(nextItem.empId).subscribe(res=>{
      this.MainAccountId = res;

    })
    this.HrEmployeesForm.setValue({
      empId: nextItem.empId,
      empCode: nextItem.empCode,
      name1: nextItem.name1,
      name2: nextItem.name2,
      deviceEmpCode: nextItem.deviceEmpCode,
      birthDate: nextItem.birthDate,
      idno: nextItem.idno,
      isTechnician: nextItem.isTechnician,
      isSales: nextItem.isSales,
      isMoneyCollector: nextItem.isMoneyCollector,
      kidsNo: nextItem.kidsNo,
      idissueDate: nextItem.idissueDate,
      currencyId: nextItem.currencyId,
      idexpiryDate: nextItem.idexpiryDate,
      email: nextItem.email,
      address1: nextItem.address1,
      address2: nextItem.address2,
      phone1: nextItem.phone1,
      phone2: nextItem.phone2,
      phone3: nextItem.phone3,
      accountId: this.MainAccountId ?? null ,
      departMentId: nextItem.departMentId,
      jobId: nextItem.jobId,
      storeId: nextItem.storeId,
      gender: nextItem.gender,
      taxRefNo: nextItem.taxRefNo,
      remarks: nextItem.remarks,
      qualification: nextItem.qualification,
      IsPrimaryAccountChangedForm: null,
      isAddAccount1ChangedForm: null,
      isAddAccount2ChangedForm: null,
      isAddAccount3ChangedForm: null,
      isAddAccount4ChangedForm: null,
      isAddAccount5ChangedForm: null,
      isAddAccount6ChangedForm: null,
      isAddAccount7ChangedForm: null,
      isAddAccount8ChangedForm: null,
      isAddAccount9ChangedForm: null,
      isAddAccount10ChangedForm: null,
      openningBalanceDepit: null,
      openningBalanceCredit: null,
      accCurrTrancDepit: null,
      accCurrTrancCredit: null,
      accTotalDebit: null,
      accTotaCredit: null,
      balanceDebitLocal: null,
      balanceCreditLocal: null,
      openningBalanceDepitCurncy: null,
      openningBalanceCreditCurncy: null,
      accCurrTrancDepitCurncy: null,
      accCurrTrancCreditCurncy: null,
      accTotalDebitCurncy: null,
      accTotaCreditCurncy: null,
      balanceDebitCurncy: null,
      balanceCreditCurncy: null,
      addAccount1: null,
      addAccount2: null,
      addAccount3: null,
      addAccount4: null,
      addAccount5: null,
      addAccount6: null,
      addAccount7: null,
      addAccount8: null,
      addAccount9: null,
      addAccount10: null
    })
    
    this.firstRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const LastItem = this.AllHrEmployess.findIndex(p=>p.empId == this.HrEmployeesForm.value.empId);

    if(this.AllHrEmployess.length -1 === LastItem){
      this.DisabledNextButton = true;
      this.lastRow = true;
    }
    this.DisabledPrevButton = false;
  } 
 }


 
 getPrevRowData() {
  this.AllHrEmployess = this.dataSource.filteredData;

  const index = this.AllHrEmployess.findIndex(p=>p.empId == this.HrEmployeesForm.value.empId);

  const PrevItem = this.AllHrEmployess[index - 1];

  if(PrevItem){
    this.definitionService.GetEmployeeMainAccount(PrevItem.empId).subscribe(res=>{
      this.MainAccountId = res;
    })
    this.HrEmployeesForm.setValue({
      empId: PrevItem.empId,
      empCode: PrevItem.empCode,
      name1: PrevItem.name1,
      name2: PrevItem.name2,
      deviceEmpCode: PrevItem.deviceEmpCode,
      birthDate: PrevItem.birthDate,
      idno: PrevItem.idno,
      isTechnician: PrevItem.isTechnician,
      isSales: PrevItem.isSales,
      isMoneyCollector: PrevItem.isMoneyCollector,
      kidsNo: PrevItem.kidsNo,
      idissueDate: PrevItem.idissueDate,
      currencyId: PrevItem.currencyId,
      idexpiryDate: PrevItem.idexpiryDate,
      email: PrevItem.email,
      address1: PrevItem.address1,
      address2: PrevItem.address2,
      phone1: PrevItem.phone1,
      phone2: PrevItem.phone2,
      phone3: PrevItem.phone3,
      accountId: this.MainAccountId ?? null,
      departMentId: PrevItem.departMentId,
      jobId: PrevItem.jobId,
      storeId: PrevItem.storeId,
      gender: PrevItem.gender,
      taxRefNo: PrevItem.taxRefNo,
      remarks: PrevItem.remarks,
      qualification: PrevItem.qualification,
      IsPrimaryAccountChangedForm: null,
      isAddAccount1ChangedForm: null,
      isAddAccount2ChangedForm: null,
      isAddAccount3ChangedForm: null,
      isAddAccount4ChangedForm: null,
      isAddAccount5ChangedForm: null,
      isAddAccount6ChangedForm: null,
      isAddAccount7ChangedForm: null,
      isAddAccount8ChangedForm: null,
      isAddAccount9ChangedForm: null,
      isAddAccount10ChangedForm: null,
      openningBalanceDepit: null,
      openningBalanceCredit: null,
      accCurrTrancDepit: null,
      accCurrTrancCredit: null,
      accTotalDebit: null,
      accTotaCredit: null,
      balanceDebitLocal: null,
      balanceCreditLocal: null,
      openningBalanceDepitCurncy: null,
      openningBalanceCreditCurncy: null,
      accCurrTrancDepitCurncy: null,
      accCurrTrancCreditCurncy: null,
      accTotalDebitCurncy: null,
      accTotaCreditCurncy: null,
      balanceDebitCurncy: null,
      balanceCreditCurncy: null,
      addAccount1: null,
      addAccount2: null,
      addAccount3: null,
      addAccount4: null,
      addAccount5: null,
      addAccount6: null,
      addAccount7: null,
      addAccount8: null,
      addAccount9: null,
      addAccount10: null
    })
   

    this.firstRow = false;
    this.lastRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;


    const firstItem = this.AllHrEmployess.findIndex(p=>p.empId == this.HrEmployeesForm.value.empId);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
     
   
    this.DisabledNextButton = false;

  }
}

getLastRowData(){
  this.AllHrEmployess = this.dataSource.filteredData
  const LastItem = this.AllHrEmployess[this.AllHrEmployess.length-1];
  if(LastItem){
    
    this.definitionService.GetEmployeeMainAccount(LastItem.empId).subscribe(res=>{
      this.MainAccountId = res;
    })

    this.HrEmployeesForm.setValue({
      empId: LastItem.empId,
      empCode: LastItem.empCode,
      name1: LastItem.name1,
      name2: LastItem.name2,
      deviceEmpCode: LastItem.deviceEmpCode,
      birthDate: LastItem.birthDate,
      idno: LastItem.idno,
      isTechnician: LastItem.isTechnician,
      isSales: LastItem.isSales,
      isMoneyCollector: LastItem.isMoneyCollector,
      kidsNo: LastItem.kidsNo,
      idissueDate: LastItem.idissueDate,
      currencyId: LastItem.currencyId,
      idexpiryDate: LastItem.idexpiryDate,
      email: LastItem.email,
      address1: LastItem.address1,
      address2: LastItem.address2,
      phone1: LastItem.phone1,
      phone2: LastItem.phone2,
      phone3: LastItem.phone3,
      accountId: this.MainAccountId,
      departMentId: LastItem.departMentId,
      jobId: LastItem.jobId,
      storeId: LastItem.storeId,
      gender: LastItem.gender,
      taxRefNo: LastItem.taxRefNo,
      remarks: LastItem.remarks,
      qualification: LastItem.qualification,
      IsPrimaryAccountChangedForm: null,
      isAddAccount1ChangedForm: null,
      isAddAccount2ChangedForm: null,
      isAddAccount3ChangedForm: null,
      isAddAccount4ChangedForm: null,
      isAddAccount5ChangedForm: null,
      isAddAccount6ChangedForm: null,
      isAddAccount7ChangedForm: null,
      isAddAccount8ChangedForm: null,
      isAddAccount9ChangedForm: null,
      isAddAccount10ChangedForm: null,
      openningBalanceDepit: null,
      openningBalanceCredit: null,
      accCurrTrancDepit: null,
      accCurrTrancCredit: null,
      accTotalDebit: null,
      accTotaCredit: null,
      balanceDebitLocal: null,
      balanceCreditLocal: null,
      openningBalanceDepitCurncy: null,
      openningBalanceCreditCurncy: null,
      accCurrTrancDepitCurncy: null,
      accCurrTrancCreditCurncy: null,
      accTotalDebitCurncy: null,
      accTotaCreditCurncy: null,
      balanceDebitCurncy: null,
      balanceCreditCurncy: null,
      addAccount1: null,
      addAccount2: null,
      addAccount3: null,
      addAccount4: null,
      addAccount5: null,
      addAccount6: null,
      addAccount7: null,
      addAccount8: null,
      addAccount9: null,
      addAccount10: null
    })

  this.firstRow = false;
  this.lastRow = true;
  this.DisabledPrevButton = false;
  this.DisabledNextButton = true;
  this.UpdateDisable = false;
  this.DeleteDisable = false;

  }
}


fillForm(row:any){
  this.definitionService.GetEmployeeMainAccount(row.empId).subscribe({
   next: res => {
     this.MainAccountId = res;
     this.originalPrimaryAccountValue = this.HrEmployeesForm.get('accountId')?.value;
    
   },
   error: err => {
     console.error('Error fetching main account:', err);
   },
   complete: () => {
     if(row){
      this.HrEmployeesForm.setValue({
        empId: row.empId,
        empCode: row.empCode,
        name1: row.name1,
        name2: row.name2,
        deviceEmpCode: row.deviceEmpCode,
        birthDate: row.birthDate,
        idno: row.idno,
        isTechnician: row.isTechnician,
        isSales: row.isSales,
        isMoneyCollector: row.isMoneyCollector,
        kidsNo: row.kidsNo,
        idissueDate: row.idissueDate,
        currencyId: row.currencyId,
        idexpiryDate: row.idexpiryDate,
        email: row.email,
        address1: row.address1,
        address2: row.address2,
        phone1: row.phone1,
        phone2: row.phone2,
        phone3: row.phone3,
        accountId: this.MainAccountId,
        departMentId: row.departMentId,
        jobId: row.jobId,
        storeId: row.storeId,
        gender: row.gender,
        taxRefNo: row.taxRefNo,
        remarks: row.remarks,
        qualification: row.qualification,
        IsPrimaryAccountChangedForm: null,
        isAddAccount1ChangedForm: null,
        isAddAccount2ChangedForm: null,
        isAddAccount3ChangedForm: null,
        isAddAccount4ChangedForm: null,
        isAddAccount5ChangedForm: null,
        isAddAccount6ChangedForm: null,
        isAddAccount7ChangedForm: null,
        isAddAccount8ChangedForm: null,
        isAddAccount9ChangedForm: null,
        isAddAccount10ChangedForm: null,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        accCurrTrancDepit: null,
        accCurrTrancCredit: null,
        accTotalDebit: null,
        accTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        accCurrTrancDepitCurncy: null,
        accCurrTrancCreditCurncy: null,
        accTotalDebitCurncy: null, 
        accTotaCreditCurncy: null,
        balanceDebitCurncy: null,
        balanceCreditCurncy: null,
        addAccount1: null,
        addAccount2: null,
        addAccount3: null,
        addAccount4: null,
        addAccount5: null,
        addAccount6: null,
        addAccount7: null,
        addAccount8: null,
        addAccount9: null,
        addAccount10: null
      })
  
  
       this.UpdateDisable = false;
       this.DeleteDisable = false;
       this.UndoDisabled = true;
       window.scrollTo({ top: 30, behavior: 'smooth' });
     }
    
   }
  })
}


onSumbit(){

  if(this.IsPrimaryAccountChangedForm) this.HrEmployeesForm.get('IsPrimaryAccountChangedForm')?.setValue(true);
  if(this.isAddAccount1Changed) this.HrEmployeesForm.get('isAddAccount1ChangedForm')?.setValue(true)
  if(this.isAddAccount2Changed) this.HrEmployeesForm.get('isAddAccount2ChangedForm')?.setValue(true)
  if(this.isAddAccount3Changed) this.HrEmployeesForm.get('isAddAccount3ChangedForm')?.setValue(true)
  if(this.isAddAccount4Changed) this.HrEmployeesForm.get('isAddAccount4ChangedForm')?.setValue(true)
  if(this.isAddAccount5Changed) this.HrEmployeesForm.get('isAddAccount5ChangedForm')?.setValue(true)
  if(this.isAddAccount6Changed) this.HrEmployeesForm.get('isAddAccount6ChangedForm')?.setValue(true)
  if(this.isAddAccount7Changed) this.HrEmployeesForm.get('isAddAccount7ChangedForm')?.setValue(true)
  if(this.isAddAccount8Changed) this.HrEmployeesForm.get('isAddAccount8ChangedForm')?.setValue(true)
  if(this.isAddAccount9Changed) this.HrEmployeesForm.get('isAddAccount9ChangedForm')?.setValue(true)
  if(this.isAddAccount10Changed) this.HrEmployeesForm.get('isAddAccount10ChangedForm')?.setValue(true)

   this.definitionService.AddEmployee(this.HrEmployeesForm.value).subscribe(res=>{
     if(res.status){
       this.GetAllHrEmployees();
       this.HrEmployeesForm.disable();
       this.HrEmployeesForm.get('empId')?.setValue(res.id)
       this.DisabledNextButton = false;
       this.DisabledPrevButton = false;
       this.lastRow = false;
       this.firstRow = false;
       this.SaveDisable=true;
       this.UpdateDisable = false;
       this.UndoDisabled = true;
       this.DeleteDisable=false;

     }
   })
 }


 onTabChanged(event: MatTabChangeEvent) {
  if (event.tab.textLabel === 'حسابات') {
    this.GetAdditionalAccount();
  }
}

GetAdditionalAccount(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalAccount(this.HrEmployeesForm.value.empId).subscribe({
      next: res => {
          this.HrEmployeesForm.get("addAccount1")?.setValue(res.addAccountCode1);
          this.HrEmployeesForm.get("addAccount2")?.setValue(res.addAccountCode2);
          this.HrEmployeesForm.get("addAccount3")?.setValue(res.addAccountCode3);
          this.HrEmployeesForm.get("addAccount4")?.setValue(res.addAccountCode4);
          this.HrEmployeesForm.get("addAccount5")?.setValue(res.addAccountCode5);
          this.HrEmployeesForm.get("addAccount6")?.setValue(res.addAccountCode6);
          this.HrEmployeesForm.get("addAccount7")?.setValue(res.addAccountCode7);
          this.HrEmployeesForm.get("addAccount8")?.setValue(res.addAccountCode8);
          this.HrEmployeesForm.get("addAccount9")?.setValue(res.addAccountCode9);
          this.HrEmployeesForm.get("addAccount10")?.setValue(res.addAccountCode10);

          this.originalAddAccount1Value = this.HrEmployeesForm.get('addAccount1')?.value;
          this.originalAddAccount2Value = this.HrEmployeesForm.get('addAccount2')?.value;
          this.originalAddAccount3Value = this.HrEmployeesForm.get('addAccount3')?.value;
          this.originalAddAccount4Value = this.HrEmployeesForm.get('addAccount4')?.value;
          this.originalAddAccount5Value = this.HrEmployeesForm.get('addAccount5')?.value;
          this.originalAddAccount6Value = this.HrEmployeesForm.get('addAccount6')?.value;
          this.originalAddAccount7Value = this.HrEmployeesForm.get('addAccount7')?.value;
          this.originalAddAccount8Value = this.HrEmployeesForm.get('addAccount8')?.value;
          this.originalAddAccount9Value = this.HrEmployeesForm.get('addAccount9')?.value;
          this.originalAddAccount10Value = this.HrEmployeesForm.get('addAccount10')?.value;
          
   
        
      }
    })
  }
}


GetEmpMainAccount(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpMainAccount(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }
    })
  }
}

GetAdditionalaccount1(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount1(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


GetAdditionalaccount2(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount2(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}



GetAdditionalaccount3(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount3(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}




GetAdditionalaccount4(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount4(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


GetAdditionalaccount5(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount5(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


GetAdditionalaccount6(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount6(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


GetAdditionalaccount7(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount7(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


GetAdditionalaccount8(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount8(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


GetAdditionalaccount9(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount9(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


GetAdditionalaccount10(){
  if(this.HrEmployeesForm.value.empId){
    this.definitionService.GetEmpAdditionalaccount10(this.HrEmployeesForm.value.empId).subscribe(res=>{
      if(res){
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.HrEmployeesForm.get("openningBalanceDepit")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCredit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepit")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCredit")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebit")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCredit")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitLocal")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditLocal")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotalDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("accTotaCreditCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceDebitCurncy")?.setValue(null);
        this.HrEmployeesForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


Filterchange(data: Event) {
  const value = (data.target as HTMLInputElement).value;
  this.dataSource.filter = value;
}
}
