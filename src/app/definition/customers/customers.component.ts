import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { CustomerBranchesComponent } from '../customer-branches/customer-branches.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit{
  dataSource: any;
  displayedColumns: string[] = ['isActive', 'customerCode', 'customerDescA', 'customerDescE'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllCustomers : any[] = [];
  AllCustomersType : any[] = [];
  AllCostCenter:any[]=[];
  AllHrEmployees:any[]=[];
  AllCustomerCategory:any[]=[];
  AllCurrency:any[]=[];
  AllCalAccountChart:any[]=[];
  AllCities:any[]=[];

  
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

  AllCustomerBranches : any[] = [];

  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }

  ngOnInit(): void {
    this.CustomerForm.disable();
    this.GetAllCustomers();
    this.GetAllCuatomersType();
    this.GetAllCalCostCenter();
    this.GetAllHrEmployees();
    this.GetAllCustomerCategory();
    this.GetAllCurrency();
    this.GetAllAccountChart();
    this.GetAllCities();
  }

  CustomerForm = this.fb.group({
    customerId:[],
    customerCode:['',Validators.required],
    customerDescA:['',Validators.required],
    customerDescE:['',Validators.required],
    customerTypeId:[],
    costCenterId:[],
    empId:[],
    customerCatId :[],
    currencyId:[],
    tel:[''],
    tel2:[''],
    tel3:[''],
    tel4:[''],
    tel5:[''],
    fax:[''],
    address1:[''],
    address2:[''],
    isActive:[],
    forAdjustOnly:[],
    nationality:[],
    creditPeriod:[],
    creditLimit:[],
    dateOfBirth:[],
    cityId:[],
    passPortIssuePlace:[],
    carLicenseIssueDate:[],
    carLicenseExpiryDate:[],
    dtRegRenew:[],
    custId :[''],
    passPortNo:[''],
    carLicenseNo:[''],
    carLicenseIssuePlace:[''],
    passPortIssueDate :[],
    passPortExpiryDate:[],
    address3:[''],
    dtReg:[],
    addField1:[''],
    addField2:[''],
    addField3:[''],
    addField4:[''],
    addField5:[''],
  })

  GetAllCustomers(){
  this.definitionService.GetAllCustomers().subscribe(res=>{
    this.AllCustomers = res;
    this.dataSource = new MatTableDataSource<any>(this.AllCustomers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
  }

  GetAllCuatomersType(){
    this.definitionService.GetCustomersType().subscribe(res=>{
      this.AllCustomersType = res
    })
  }

  GetAllCalCostCenter(){
    this.definitionService.GetAllCalCostCenter().subscribe(res=>{
      this.AllCostCenter = res;
    })
  }

 GetAllHrEmployees(){
  this.definitionService.GetAllHrEmployees().subscribe(res=>{
    this.AllHrEmployees = res;
  })
 }  

 GetAllCustomerCategory(){
  this.definitionService.GetAll_CustomerCategory().subscribe(res=>{
    this.AllCustomerCategory=res
  })
 }

 GetAllCurrency(){
  this.definitionService.GetAllCurrency().subscribe(res=>{
    this.AllCurrency=res;
  })
 }
 
 GetAllAccountChart(){
  this.definitionService.GetAllCalAccountChart().subscribe(res=>{
    this.AllCalAccountChart = res
  })
 }
 
 GetAllCities(){
  this.definitionService.GetCustomerCities().subscribe(res=>{
    this.AllCities = res
  })
 }


 updatecustomer(){
  this.CustomerForm.enable();
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
  this.AllCustomers = this.dataSource.filteredData;
  this.undoIndex = this.AllCustomers.findIndex(p=>p.customerId == this.CustomerForm.value.customerId);
 }


 undo(){
  this.CustomerForm.disable();

    if(this.undoIndex != -1){
      const undoItem = this.AllCustomers[this.undoIndex]

      if(undoItem){
       this.CustomerForm.setValue({
         customerId: undoItem.customerId,
         customerCode: undoItem.customerCode,
         customerDescA: undoItem.customerDescA,
         customerDescE: undoItem.customerDescE,
         customerTypeId: undoItem.customerTypeId,
         costCenterId: undoItem.costCenterId,
         empId: undoItem.empId,
         customerCatId: undoItem.customerCatId,
         currencyId: undoItem.currencyId,
         tel: undoItem.tel,
         tel2: undoItem.tel2,
         tel3: undoItem.tel3,
         tel4: undoItem.tel4,
         tel5: undoItem.tel5,
         fax: undoItem.fax,
         address1: undoItem.address1,
         address2: undoItem.address2,
         isActive: undoItem.isActive,
         forAdjustOnly: undoItem.forAdjustOnly,
         nationality: undoItem.nationality,
         creditPeriod: undoItem.creditPeriod,
         creditLimit: undoItem.creditLimit,
         dateOfBirth: undoItem.dateOfBirth,
         cityId: undoItem.cityId,
         passPortIssuePlace: undoItem.passPortIssuePlace,
         carLicenseIssueDate: undoItem.carLicenseIssueDate,
         carLicenseExpiryDate: undoItem.carLicenseExpiryDate,
         dtRegRenew: undoItem.dtRegRenew,
         custId: undoItem.custId,
         passPortNo: undoItem.passPortNo,
         carLicenseNo: undoItem.carLicenseNo,
         carLicenseIssuePlace: undoItem.carLicenseIssuePlace,
         passPortIssueDate: undoItem.passPortIssueDate,
         passPortExpiryDate: undoItem.passPortExpiryDate,
         address3: undoItem.address3,
         dtReg: undoItem.dtReg,
         addField1: undoItem.addField1,
         addField2: undoItem.addField2,
         addField3: undoItem.addField3,
         addField4: undoItem.addField4,
         addField5: undoItem.addField5
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

 fillForm(row:any){
  if(row){
    this.CustomerForm.setValue({
      customerId: row.customerId,
         customerCode: row.customerCode,
         customerDescA: row.customerDescA,
         customerDescE: row.customerDescE,
         customerTypeId: row.customerTypeId,
         costCenterId: row.costCenterId,
         empId: row.empId,
         customerCatId: row.customerCatId,
         currencyId: row.currencyId,
         tel: row.tel,
         tel2: row.tel2,
         tel3: row.tel3,
         tel4: row.tel4,
         tel5: row.tel5,
         fax: row.fax,
         address1: row.address1,
         address2: row.address2,
         isActive: row.isActive,
         forAdjustOnly: row.forAdjustOnly,
         nationality: row.nationality,
         creditPeriod: row.creditPeriod,
         creditLimit: row.creditLimit,
         dateOfBirth: row.dateOfBirth,
         cityId: row.cityId,
         passPortIssuePlace: row.passPortIssuePlace,
         carLicenseIssueDate: row.carLicenseIssueDate,
         carLicenseExpiryDate: row.carLicenseExpiryDate,
         dtRegRenew: row.dtRegRenew,
         custId: row.custId,
         passPortNo: row.passPortNo,
         carLicenseNo: row.carLicenseNo,
         carLicenseIssuePlace: row.carLicenseIssuePlace,
         passPortIssueDate: row.passPortIssueDate,
         passPortExpiryDate: row.passPortExpiryDate,
         address3: row.address3,
         dtReg: row.dtReg,
         addField1: row.addField1,
         addField2: row.addField2,
         addField3: row.addField3,
         addField4: row.addField4,
         addField5: row.addField5
    });
    this.UpdateDisable = false;
    this.DeleteDisable = false;
    this.UndoDisabled = true;
    window.scrollTo({ top: 30, behavior: 'smooth' });

  }

 }


  getPrevRowData() {
    this.AllCustomers = this.dataSource.filteredData;

    const index = this.AllCustomers.findIndex(p=>p.customerId == this.CustomerForm.value.customerId);

    const PrevItem = this.AllCustomers[index - 1];

    if(PrevItem){
   this.CustomerForm.setValue({
    customerId: PrevItem.customerId,
    customerCode: PrevItem.customerCode,
    customerDescA: PrevItem.customerDescA,
    customerDescE: PrevItem.customerDescE,
    customerTypeId: PrevItem.customerTypeId,
    costCenterId: PrevItem.costCenterId,
    empId: PrevItem.empId,
    customerCatId: PrevItem.customerCatId,
    currencyId: PrevItem.currencyId,
    tel: PrevItem.tel,
    tel2: PrevItem.tel2,
    tel3: PrevItem.tel3,
    tel4: PrevItem.tel4,
    tel5: PrevItem.tel5,
    fax: PrevItem.fax,
    address1: PrevItem.address1,
    address2: PrevItem.address2,
    isActive: PrevItem.isActive,
    forAdjustOnly: PrevItem.forAdjustOnly,
    nationality: PrevItem.nationality,
    creditPeriod: PrevItem.creditPeriod,
    creditLimit: PrevItem.creditLimit,
    dateOfBirth: PrevItem.dateOfBirth,
    cityId: PrevItem.cityId,
    passPortIssuePlace: PrevItem.passPortIssuePlace,
    carLicenseIssueDate: PrevItem.carLicenseIssueDate,
    carLicenseExpiryDate: PrevItem.carLicenseExpiryDate,
    dtRegRenew: PrevItem.dtRegRenew,
    custId: PrevItem.custId,
    passPortNo: PrevItem.passPortNo,
    carLicenseNo: PrevItem.carLicenseNo,
    carLicenseIssuePlace: PrevItem.carLicenseIssuePlace,
    passPortIssueDate: PrevItem.passPortIssueDate,
    passPortExpiryDate: PrevItem.passPortExpiryDate,
    address3: PrevItem.address3,
    dtReg: PrevItem.dtReg,
    addField1: PrevItem.addField1,
    addField2: PrevItem.addField2,
    addField3: PrevItem.addField3,
    addField4: PrevItem.addField4,
    addField5: PrevItem.addField5
   })

      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;


      const firstItem = this.AllCustomers.findIndex(p=>p.customerId == this.CustomerForm.value.customerId);

       if(firstItem === 0){
            this.DisabledPrevButton = true;
            this.firstRow = true;
       }
       
     
      this.DisabledNextButton = false;

    }

  }

  getNextRowData() {
    this.AllCustomers = this.dataSource.filteredData;

    const index = this.AllCustomers.findIndex(p=>p.customerId == this.CustomerForm.value.customerId);

    const nextItem = this.AllCustomers[index + 1];

    if(nextItem){
     this.CustomerForm.setValue({
      customerId: nextItem.customerId,
      customerCode: nextItem.customerCode,
      customerDescA: nextItem.customerDescA,
      customerDescE: nextItem.customerDescE,
      customerTypeId: nextItem.customerTypeId,
      costCenterId: nextItem.costCenterId,
      empId: nextItem.empId,
      customerCatId: nextItem.customerCatId,
      currencyId: nextItem.currencyId,
      tel: nextItem.tel,
      tel2: nextItem.tel2,
      tel3: nextItem.tel3,
      tel4: nextItem.tel4,
      tel5: nextItem.tel5,
      fax: nextItem.fax,
      address1: nextItem.address1,
      address2: nextItem.address2,
      isActive: nextItem.isActive,
      forAdjustOnly: nextItem.forAdjustOnly,
      nationality: nextItem.nationality,
      creditPeriod: nextItem.creditPeriod,
      creditLimit: nextItem.creditLimit,
      dateOfBirth: nextItem.dateOfBirth,
      cityId: nextItem.cityId,
      passPortIssuePlace: nextItem.passPortIssuePlace,
      carLicenseIssueDate: nextItem.carLicenseIssueDate,
      carLicenseExpiryDate: nextItem.carLicenseExpiryDate,
      dtRegRenew: nextItem.dtRegRenew,
      custId: nextItem.custId,
      passPortNo: nextItem.passPortNo,
      carLicenseNo: nextItem.carLicenseNo,
      carLicenseIssuePlace: nextItem.carLicenseIssuePlace,
      passPortIssueDate: nextItem.passPortIssueDate,
      passPortExpiryDate: nextItem.passPortExpiryDate,
      address3: nextItem.address3,
      dtReg: nextItem.dtReg,
      addField1: nextItem.addField1,
      addField2: nextItem.addField2,
      addField3: nextItem.addField3,
      addField4: nextItem.addField4,
      addField5: nextItem.addField5
     })
      
      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      const LastItem = this.AllCustomers.findIndex(p=>p.customerId == this.CustomerForm.value.customerId);

      if(this.AllCustomers.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;
      }
      this.DisabledPrevButton = false;
    } 
   }

  getFirstRowData() {
    this.AllCustomers = this.dataSource.filteredData
    const FirstItem = this.AllCustomers[0];
      if(FirstItem){
      this.CustomerForm.setValue({
        customerId: FirstItem.customerId,
        customerCode: FirstItem.customerCode,
        customerDescA: FirstItem.customerDescA,
        customerDescE: FirstItem.customerDescE,
        customerTypeId: FirstItem.customerTypeId,
        costCenterId: FirstItem.costCenterId,
        empId: FirstItem.empId,
        customerCatId: FirstItem.customerCatId,
        currencyId: FirstItem.currencyId,
        tel: FirstItem.tel,
        tel2: FirstItem.tel2,
        tel3: FirstItem.tel3,
        tel4: FirstItem.tel4,
        tel5: FirstItem.tel5,
        fax: FirstItem.fax,
        address1: FirstItem.address1,
        address2: FirstItem.address2,
        isActive: FirstItem.isActive,
        forAdjustOnly: FirstItem.forAdjustOnly,
        nationality: FirstItem.nationality,
        creditPeriod: FirstItem.creditPeriod,
        creditLimit: FirstItem.creditLimit,
        dateOfBirth: FirstItem.dateOfBirth,
        cityId: FirstItem.cityId,
        passPortIssuePlace: FirstItem.passPortIssuePlace,
        carLicenseIssueDate: FirstItem.carLicenseIssueDate,
        carLicenseExpiryDate: FirstItem.carLicenseExpiryDate,
        dtRegRenew: FirstItem.dtRegRenew,
        custId: FirstItem.custId,
        passPortNo: FirstItem.passPortNo,
        carLicenseNo: FirstItem.carLicenseNo,
        carLicenseIssuePlace: FirstItem.carLicenseIssuePlace,
        passPortIssueDate: FirstItem.passPortIssueDate,
        passPortExpiryDate: FirstItem.passPortExpiryDate,
        address3: FirstItem.address3,
        dtReg: FirstItem.dtReg,
        addField1: FirstItem.addField1,
        addField2: FirstItem.addField2,
        addField3: FirstItem.addField3,
        addField4: FirstItem.addField4,
        addField5: FirstItem.addField5
      })
      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      }
  }

  
  getLastRowData(){
    this.AllCustomers = this.dataSource.filteredData
    const LastItem = this.AllCustomers[this.AllCustomers.length-1];
    if(LastItem){
      this.CustomerForm.setValue({
        customerId: LastItem.customerId,
        customerCode: LastItem.customerCode,
        customerDescA: LastItem.customerDescA,
        customerDescE: LastItem.customerDescE,
        customerTypeId: LastItem.customerTypeId,
        costCenterId: LastItem.costCenterId,
        empId: LastItem.empId,
        customerCatId: LastItem.customerCatId,
        currencyId: LastItem.currencyId,
        tel: LastItem.tel,
        tel2: LastItem.tel2,
        tel3: LastItem.tel3,
        tel4: LastItem.tel4,
        tel5: LastItem.tel5,
        fax: LastItem.fax,
        address1: LastItem.address1,
        address2: LastItem.address2,
        isActive: LastItem.isActive,
        forAdjustOnly: LastItem.forAdjustOnly,
        nationality: LastItem.nationality,
        creditPeriod: LastItem.creditPeriod,
        creditLimit: LastItem.creditLimit,
        dateOfBirth: LastItem.dateOfBirth,
        cityId: LastItem.cityId,
        passPortIssuePlace: LastItem.passPortIssuePlace,
        carLicenseIssueDate: LastItem.carLicenseIssueDate,
        carLicenseExpiryDate: LastItem.carLicenseExpiryDate,
        dtRegRenew: LastItem.dtRegRenew,
        custId: LastItem.custId,
        passPortNo: LastItem.passPortNo,
        carLicenseNo: LastItem.carLicenseNo,
        carLicenseIssuePlace: LastItem.carLicenseIssuePlace,
        passPortIssueDate: LastItem.passPortIssueDate,
        passPortExpiryDate: LastItem.passPortExpiryDate,
        address3: LastItem.address3,
        dtReg: LastItem.dtReg,
        addField1: LastItem.addField1,
        addField2: LastItem.addField2,
        addField3: LastItem.addField3,
        addField4: LastItem.addField4,
        addField5: LastItem.addField5
      })

    this.firstRow = false;
    this.lastRow = true;
    this.DisabledPrevButton = false;
    this.DisabledNextButton = true;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

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
        this.definitionService.DeleteCustomer(this.CustomerForm.value.customerId).subscribe(res=>{
          if(res){
            this.GetAllCustomers();
            this.CustomerForm.setValue({
              customerId: null,
              customerCode: null,
              customerDescA: null,
              customerDescE: null,
              customerTypeId: null,
              costCenterId: null,
              empId: null,
              customerCatId: null,
              currencyId: null,
              tel: null,
              tel2: null,
              tel3: null,
              tel4: null,
              tel5: null,
              fax: null,
              address1: null,
              address2: null,
              isActive: null,
              forAdjustOnly: null,
              nationality: null,
              creditPeriod: null,
              creditLimit: null,
              dateOfBirth: null,
              cityId: null,
              passPortIssuePlace: null,
              carLicenseIssueDate: null,
              carLicenseExpiryDate: null,
              dtRegRenew: null,
              custId: null,
              passPortNo: null,
              carLicenseNo: null,
              carLicenseIssuePlace: null,
              passPortIssueDate: null,
              passPortExpiryDate: null,
              address3: null,
              dtReg: null,
              addField1: null,
              addField2: null,
              addField3: null,
              addField4: null,
              addField5: null
            })

            this.DeleteDisable = true;
            this.UpdateDisable = true;
            
          }
        })
           
      }
    });
  }

  New() {
    this.CustomerForm.enable();
    this.AllCustomers = this.dataSource.filteredData;
    this.undoIndex = this.AllCustomers.findIndex(p=>p.customerId == this.CustomerForm.value.customerId);
   this.CustomerForm.setValue({
     customerId: null,
     customerCode: null,
     customerDescA: null,
     customerDescE: null,
     customerTypeId: null,
     costCenterId: null,
     empId: null,
     customerCatId: null,
     currencyId: null,
     tel: null,
     tel2: null,
     tel3: null,
     tel4: null,
     tel5: null,
     fax: null,
     address1: null,
     address2: null,
     isActive: null,
     forAdjustOnly: null,
     nationality: null,
     creditPeriod: null,
     creditLimit: null,
     dateOfBirth: null,
     cityId: null,
     passPortIssuePlace: null,
     carLicenseIssueDate: null,
     carLicenseExpiryDate: null,
     dtRegRenew: null,
     custId: null,
     passPortNo: null,
     carLicenseNo: null,
     carLicenseIssuePlace: null,
     passPortIssueDate: null,
     passPortExpiryDate: null,
     address3: null,
     dtReg: null,
     addField1: null,
     addField2: null,
     addField3: null,
     addField4: null,
     addField5: null
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
    this.UndoDisabled = false;  }
  
  
  onSumbit(){
    this.definitionService.AddCustomer(this.CustomerForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllCustomers();
        this.CustomerForm.disable();
        this.CustomerForm.get('customerId')?.setValue(res.id)
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

  GetAllCustomerBranches(){
    console.log('hi')
    console.log(this.CustomerForm.value.customerId)
    if(this.CustomerForm.value.customerId){
      this.definitionService.GetCustomerBranches(this.CustomerForm.value.customerId).subscribe(res=>{
        this.AllCustomerBranches = res
        console.log(this.AllCustomerBranches)
      });
    }
  }

  AddCustomerBranch(){
      var _popup = this.dialog.open(CustomerBranchesComponent, {
        width: '50%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
          Title: 'أضافة فرع',
          customerId: this.CustomerForm.value.customerId,
        },
      });
      _popup.afterClosed().subscribe((response) => {
        if(response){
          this.definitionService.GetCustomerBranches(response).subscribe(res=>{
            this.AllCustomerBranches = res
          });
        }
      });
}

onTabChanged(event: MatTabChangeEvent) {
  if (event.tab.textLabel === 'الفروع') {
    this.GetAllCustomerBranches();
  }
}


DeleteCustomerBranch(custBranchId : any) {
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      console.log(custBranchId)
         this.definitionService.DeleteCustomerBranch(custBranchId).subscribe(res=>{
          if(res.status){
            this.definitionService.GetCustomerBranches(res.id).subscribe(res=>{
              this.AllCustomerBranches = res
            });
          }
         })
    }
  });
}

updateCustomerBranch(branchData:any){
  var _popup = this.dialog.open(CustomerBranchesComponent, {
    width: '50%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل فرع',
      customerId: this.CustomerForm.value.customerId,
      CustomerBranchData : branchData
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      
      this.definitionService.GetCustomerBranches(response).subscribe(res=>{
        this.AllCustomerBranches = res
      });
    }
  });
}

}

