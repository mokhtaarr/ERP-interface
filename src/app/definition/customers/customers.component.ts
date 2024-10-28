import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { CustomerBranchesComponent } from '../customer-branches/customer-branches.component';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { CustomerContactComponent } from '../customer-contact/customer-contact.component';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';

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
  AllCountries:any[]=[];

  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup;

  DisabledPrevButton: boolean = false;
  DisabledNextButton: boolean = false;
  firstRow: boolean = false;
  lastRow: boolean = false;
  DeleteDisable :boolean = true;
  SaveDisable : boolean = true;
  UpdateDisable : boolean = true;

  EditReadonly : boolean = false;
  reloadDisabled : boolean = false;
  UndoDisabled : boolean = true;
  undoIndex!: number;

  AllCustomerBranches : any[] = [];
  AllCustomerContact : any[] = [];

  MainAccountId : any;

  readonlyTable : boolean = false;
  newDisable:boolean = false;

  selectedAccount: number | null = null;

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


  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog,
    public accountService : AccountService){
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
    this.GetAllCountries();
  }

  CustomerForm = this.fb.group({
    customerId:[],
    customerCode:['',Validators.required],
    customerDescA:['',Validators.required],
    customerDescE:[''],
    customerTypeId:[],
    costCenterId:[],
    empId:[],
    customerCatId :[],
    currencyId:[,Validators.required],
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
    accountId:[],
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
    etaxCustType:[''],
    taxRefNo:[''],
    taxExemptionNo:[''],
    countryId:[],
    buildingNumber:[],
    buildingNumber2:[],
    zipCode:['']
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
  this.readonlyTable = true;
    this.newDisable = true;

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
  this.readonlyTable = false;
    this.newDisable = false;

  this.DisabledNextButton = false;
  this.DisabledPrevButton = false;
  this.lastRow = false;
  this.firstRow = false;
  this.reloadDisabled = false;
  this.SaveDisable = true;
  this.UndoDisabled = true;

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
         addField5: undoItem.addField5,
         accountId: null,
         addAccount1: null,
         addAccount2: null,
         addAccount3: null,
         addAccount4: null,
         addAccount5: null,
         addAccount6: null,
         addAccount7: null,
         addAccount8: null,
         addAccount9: null,
         addAccount10: null,
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
         IsPrimaryAccountChangedForm: null,
         etaxCustType: undoItem.etaxCustType,
         taxRefNo: undoItem.taxRefNo,
         taxExemptionNo: undoItem.taxExemptionNo,
         countryId: undoItem.countryId,
         buildingNumber: undoItem.buildingNumber,
         buildingNumber2: undoItem.buildingNumber2,
         zipCode: undoItem.zipCode,
       })

      this.UpdateDisable = false;
      this.DeleteDisable = false;
     }
    }
 }

 GetAllCountries(){
  this.definitionService.GetAllCountries().subscribe(res=>{
    this.AllCountries = res;
  })
 }


 fillForm(row:any){
   this.definitionService.GetMainChartAccount(row.customerId).subscribe({
    next: res => {
      this.MainAccountId = res;
      this.originalPrimaryAccountValue = this.CustomerForm.get('accountId')?.value;

    },
    error: err => {
      console.error('Error fetching main account:', err);
    },
    complete: () => {
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
          addField5: row.addField5,
          accountId: this.MainAccountId,
          addAccount1: null,
          addAccount2: null,
          addAccount3: null,
          addAccount4: null,
          addAccount5: null,
          addAccount6: null,
          addAccount7: null,
          addAccount8: null,
          addAccount9: null,
          addAccount10: null,
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
          IsPrimaryAccountChangedForm: null,
          etaxCustType: row.etaxCustType,
          taxRefNo: row.taxRefNo,
          taxExemptionNo: row.taxExemptionNo,
          countryId: row.countryId,
          buildingNumber: row.buildingNumber,
          buildingNumber2: row.buildingNumber2,
          zipCode: row.zipCode
        });
    
        this.UpdateDisable = false;
        this.DeleteDisable = false;
        this.UndoDisabled = true;
        window.scrollTo({ top: 30, behavior: 'smooth' });
      }
     
    }
   })
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
     addField5: PrevItem.addField5,
     accountId: null,
     addAccount1: null,
     addAccount2: null,
     addAccount3: null,
     addAccount4: null,
     addAccount5: null,
     addAccount6: null,
     addAccount7: null,
     addAccount8: null,
     addAccount9: null,
     addAccount10: null,
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
     IsPrimaryAccountChangedForm: null,
     etaxCustType: PrevItem.etaxCustType,
     taxRefNo: PrevItem.taxRefNo,
     taxExemptionNo: PrevItem.taxExemptionNo,
     countryId: PrevItem.countryId,
     buildingNumber: PrevItem.buildingNumber,
     buildingNumber2: PrevItem.buildingNumber2,
     zipCode: PrevItem.zipCode,
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
       addField5: nextItem.addField5,
       accountId: null,
       addAccount1: null,
       addAccount2: null,
       addAccount3: null,
       addAccount4: null,
       addAccount5: null,
       addAccount6: null,
       addAccount7: null,
       addAccount8: null,
       addAccount9: null,
       addAccount10: null,
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
       IsPrimaryAccountChangedForm: null,
       etaxCustType: nextItem.etaxCustType,
       taxRefNo: nextItem.taxRefNo,
       taxExemptionNo: nextItem.taxExemptionNo,
       countryId: nextItem.countryId,
       buildingNumber: nextItem.buildingNumber,
       buildingNumber2: nextItem.buildingNumber2,
       zipCode: nextItem.zipCode,
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
        addField5: FirstItem.addField5,
        accountId: null,
        addAccount1: null,
        addAccount2: null,
        addAccount3: null,
        addAccount4: null,
        addAccount5: null,
        addAccount6: null,
        addAccount7: null,
        addAccount8: null,
        addAccount9: null,
        addAccount10: null,
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
        IsPrimaryAccountChangedForm: null,
        etaxCustType: FirstItem.etaxCustType,
        taxRefNo: FirstItem.taxRefNo,
        taxExemptionNo: FirstItem.taxExemptionNo,
        countryId: FirstItem.countryId,
        buildingNumber: FirstItem.buildingNumber,
        buildingNumber2: FirstItem.buildingNumber2,
        zipCode: FirstItem.zipCode,
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
        addField5: LastItem.addField5,
        accountId: null,
        addAccount1: null,
        addAccount2: null,
        addAccount3: null,
        addAccount4: null,
        addAccount5: null,
        addAccount6: null,
        addAccount7: null,
        addAccount8: null,
        addAccount9: null,
        addAccount10: null,
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
        IsPrimaryAccountChangedForm: null,
        etaxCustType: LastItem.etaxCustType,
        taxRefNo: LastItem.taxRefNo,
        taxExemptionNo: LastItem.taxExemptionNo,
        countryId: LastItem.countryId,
        buildingNumber: LastItem.buildingNumber,
        buildingNumber2: LastItem.buildingNumber2,
        zipCode: LastItem.zipCode,
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
              addField5: null,
              accountId: null,
              addAccount1: null,
              addAccount2: null,
              addAccount3: null,
              addAccount4: null,
              addAccount5: null,
              addAccount6: null,
              addAccount7: null,
              addAccount8: null,
              addAccount9: null,
              addAccount10: null,
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
              IsPrimaryAccountChangedForm: null,
              etaxCustType: null,
              taxRefNo: null,
              taxExemptionNo: null,
              countryId: null,
              buildingNumber: null,
              buildingNumber2: null,
              zipCode: null
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
    this.readonlyTable = true;
    this.newDisable = true;
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
     addField5: null,
     accountId: null,
     addAccount1: null,
     addAccount2: null,
     addAccount3: null,
     addAccount4: null,
     addAccount5: null,
     addAccount6: null,
     addAccount7: null,
     addAccount8: null,
     addAccount9: null,
     addAccount10: null,
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
     IsPrimaryAccountChangedForm: null,
     etaxCustType: null,
     taxRefNo: null,
     taxExemptionNo: null,
     countryId: null,
     buildingNumber: null,
     buildingNumber2: null,
     zipCode: null
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

    onPrimaryAccountChange(event: MatSelectChange) {
      this.isPrimaryAccountChanged = event.value !== this.originalPrimaryAccountValue;
    }
  
  onSumbit(){

   if(this.IsPrimaryAccountChangedForm) this.CustomerForm.get('IsPrimaryAccountChangedForm')?.setValue(true);
   if(this.isAddAccount1Changed) this.CustomerForm.get('isAddAccount1ChangedForm')?.setValue(true)
   if(this.isAddAccount2Changed) this.CustomerForm.get('isAddAccount2ChangedForm')?.setValue(true)
   if(this.isAddAccount3Changed) this.CustomerForm.get('isAddAccount3ChangedForm')?.setValue(true)
   if(this.isAddAccount4Changed) this.CustomerForm.get('isAddAccount4ChangedForm')?.setValue(true)
   if(this.isAddAccount5Changed) this.CustomerForm.get('isAddAccount5ChangedForm')?.setValue(true)
   if(this.isAddAccount6Changed) this.CustomerForm.get('isAddAccount6ChangedForm')?.setValue(true)
   if(this.isAddAccount7Changed) this.CustomerForm.get('isAddAccount7ChangedForm')?.setValue(true)
   if(this.isAddAccount8Changed) this.CustomerForm.get('isAddAccount8ChangedForm')?.setValue(true)
   if(this.isAddAccount9Changed) this.CustomerForm.get('isAddAccount9ChangedForm')?.setValue(true)
   if(this.isAddAccount10Changed) this.CustomerForm.get('isAddAccount10ChangedForm')?.setValue(true)

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
        this.tabGroup.selectedIndex = 0;

      }
    })
  }

  GetAllCustomerBranches(){
    if(this.CustomerForm.value.customerId){
      this.definitionService.GetCustomerBranches(this.CustomerForm.value.customerId).subscribe(res=>{
        this.AllCustomerBranches = res
        
      });
    }
  }

  GetAllCustomerContact(){
    if(this.CustomerForm.value.customerId){
      this.definitionService.GetCustomerContact(this.CustomerForm.value.customerId).subscribe(res=>{
        this.AllCustomerContact = res
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
  if (event.tab.textLabel === 'جهات الإتصال') {
    this.GetAllCustomerContact();
  }
  if (event.tab.textLabel === 'حسابات') {
    this.GetAdditionalAccount();
  }
  if (event.tab.textLabel === 'الارصده') {
    this.GetCustomerMainAccount();
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


AddCustomerContact(){
  var _popup = this.dialog.open(CustomerContactComponent, {
    width: '70%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'أضافة جهة أتصال',
      customerId: this.CustomerForm.value.customerId,
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      this.definitionService.GetCustomerContact(response).subscribe(res=>{
        this.AllCustomerContact = res
      });
    }
  });
}


updateCustomerContact(customerContact:any){
  var _popup = this.dialog.open(CustomerContactComponent, {
    width: '70%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل جهه أتصال',
      customerId: this.CustomerForm.value.customerId,
      CustomerContactData : customerContact
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      
      this.definitionService.GetCustomerContact(response).subscribe(res=>{
        this.AllCustomerContact = res
      });
    }
  });
}

DeleteCustomerContact(custContactId : any) {
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
         this.definitionService.DeleteCustomerContact(custContactId).subscribe(res=>{
          if(res.status){
            this.definitionService.GetCustomerContact(res.id).subscribe(res=>{
              this.AllCustomerContact = res
            });
          }
         })
    }
  });
}


GetAdditionalAccount(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalAccount(this.CustomerForm.value.customerId).subscribe({
      next: res => {
          this.CustomerForm.get("addAccount1")?.setValue(res.addAccountCode1);
          this.CustomerForm.get("addAccount2")?.setValue(res.addAccountCode2);
          this.CustomerForm.get("addAccount3")?.setValue(res.addAccountCode3);
          this.CustomerForm.get("addAccount4")?.setValue(res.addAccountCode4);
          this.CustomerForm.get("addAccount5")?.setValue(res.addAccountCode5);
          this.CustomerForm.get("addAccount6")?.setValue(res.addAccountCode6);
          this.CustomerForm.get("addAccount7")?.setValue(res.addAccountCode7);
          this.CustomerForm.get("addAccount8")?.setValue(res.addAccountCode8);
          this.CustomerForm.get("addAccount9")?.setValue(res.addAccountCode9);
          this.CustomerForm.get("addAccount10")?.setValue(res.addAccountCode10);

          this.originalAddAccount1Value = this.CustomerForm.get('addAccount1')?.value;
          this.originalAddAccount2Value = this.CustomerForm.get('addAccount2')?.value;
          this.originalAddAccount3Value = this.CustomerForm.get('addAccount3')?.value;
          this.originalAddAccount4Value = this.CustomerForm.get('addAccount4')?.value;
          this.originalAddAccount5Value = this.CustomerForm.get('addAccount5')?.value;
          this.originalAddAccount6Value = this.CustomerForm.get('addAccount6')?.value;
          this.originalAddAccount7Value = this.CustomerForm.get('addAccount7')?.value;
          this.originalAddAccount8Value = this.CustomerForm.get('addAccount8')?.value;
          this.originalAddAccount9Value = this.CustomerForm.get('addAccount9')?.value;
          this.originalAddAccount10Value = this.CustomerForm.get('addAccount10')?.value;
          
   
        
      }
    })
  }
}

GetCustomerMainAccount(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetCustomerMainAccount(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
        this.selectedAccount = 1; 

      }
    })
  }
}

GetAdditionalaccount1(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount1(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.CustomerForm.get("openningBalanceDepit")?.setValue(null);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(null);
        this.CustomerForm.get("accTotalDebit")?.setValue(null);
        this.CustomerForm.get("accTotaCredit")?.setValue(null);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(null);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(null);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(null);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(null);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(null);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}

GetAdditionalaccount2(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount2(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.CustomerForm.get("openningBalanceDepit")?.setValue(null);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(null);
        this.CustomerForm.get("accTotalDebit")?.setValue(null);
        this.CustomerForm.get("accTotaCredit")?.setValue(null);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(null);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(null);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(null);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(null);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(null);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


GetAdditionalaccount3(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount3(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.CustomerForm.get("openningBalanceDepit")?.setValue(null);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(null);
        this.CustomerForm.get("accTotalDebit")?.setValue(null);
        this.CustomerForm.get("accTotaCredit")?.setValue(null);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(null);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(null);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(null);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(null);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(null);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}

GetAdditionalaccount4(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount4(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.CustomerForm.get("openningBalanceDepit")?.setValue(null);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(null);
        this.CustomerForm.get("accTotalDebit")?.setValue(null);
        this.CustomerForm.get("accTotaCredit")?.setValue(null);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(null);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(null);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(null);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(null);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(null);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}

GetAdditionalaccount5(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount5(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }else{
        this.CustomerForm.get("openningBalanceDepit")?.setValue(null);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(null);
        this.CustomerForm.get("accTotalDebit")?.setValue(null);
        this.CustomerForm.get("accTotaCredit")?.setValue(null);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(null);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(null);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(null);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(null);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(null);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(null);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(null);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(null);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(null);
      }
    })
  }
}


GetAdditionalaccount6(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount6(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }
    })
  }
}


GetAdditionalaccount7(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount7(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }
    })
  }
}

GetAdditionalaccount8(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount8(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }
    })
  }
}

GetAdditionalaccount9(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount9(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }
    })
  }
}

GetAdditionalaccount10(){
  if(this.CustomerForm.value.customerId){
    this.definitionService.GetAdditionalaccount10(this.CustomerForm.value.customerId).subscribe(res=>{
      if(res){
        this.CustomerForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
        this.CustomerForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
        this.CustomerForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
        this.CustomerForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
        this.CustomerForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
        this.CustomerForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
        this.CustomerForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
        this.CustomerForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
        this.CustomerForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
        this.CustomerForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
        this.CustomerForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
        this.CustomerForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
        this.CustomerForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
        this.CustomerForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
        this.CustomerForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
        this.CustomerForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
      }
    })
  }
}

Filterchange(data: Event) {
  const value = (data.target as HTMLInputElement).value;
  this.dataSource.filter = value;
}

}

