import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { AddVendorBranchComponent } from '../add-vendor-branch/add-vendor-branch.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { VendorContactComponent } from '../vendor-contact/vendor-contact.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['isActive', 'vendorCode', 'vendorDescA', 'vendorDescE'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

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

  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup;
  readonlyTable : boolean = false;
  newDisable:boolean = false;

  AllVendorBranches: any[] = []
  AllVendorContacts : any[] =[]
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

  AllVendors:any[] = []
  AllVendorsTypes:any[]=[]
  AllCostCenter:any[]=[];
  AllHrEmployees:any[]=[];
  AllVendorCategory:any[]=[];
  AllCurrency:any[]=[];
  AllCalAccountChart:any[]=[];
  AllCities:any[]=[];
  AllCountries:any[]=[];

  selectedAccount: number | null = null;

  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }


  ngOnInit(): void {
    this.VendorForm.disable();
    this.GetAllVendors();
    this.GetAllVendorTypes();
    this.GetAllCalCostCenter();
    this.GetAllHrEmployees();
    this.GetAllAccountChart();
    this.GetAllVendorCategories();
    this.GetAllCurrency();
    this.GetAllCities();
    this.GetAllCountries();
  }

  VendorForm = this.fb.group({
    vendorId:[],
    vendorCode:['',Validators.required],
    vendorDescA:['',Validators.required],
    vendorDescE:[''],
    isActive:[],
    vendorTypeId:[],
    costCenterId:[],
    empId:[],
    vendorCatId :[],
    currencyId:[,Validators.required],
    tel:[''],
    tel2:[''],
    tel3:[''],
    tel4:[''],
    tel5:[''],
    fax:[''],
    address1:[''],
    address2:[''],
    address3:[''],
    forAdjustOnly:[],
    creditPeriod:[],
    creditLimit:[],
    cityId:[],
    dtRegRenew:[],
    dtReg:[],
    addField1:[''],
    addField2:[''],
    addField3:[''],
    addField4:[''],
    addField5:[''],
    accountId:[,Validators.required],
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
    email:[''],
    email2:[''],
    email3:[''],
    etaxCustType:[''],
    taxRefNo:[''],
    taxExemptionNo:[''],
    countryId:[],
    buildingNumber:[],
    buildingNumber2:[],
    zipCode:['']
  })


  GetAllVendors(){
    this.definitionService.GetAllVendors().subscribe(res=>{
      this.AllVendors = res;
      this.dataSource = new MatTableDataSource<any>(this.AllVendors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    }
  
    GetAllVendorTypes(){
      this.definitionService.GetVendorTypes().subscribe(res=>{
        this.AllVendorsTypes = res
      })
    }

    GetAllVendorCategories(){
      this.definitionService.GetVendorCategories().subscribe(res=>{
        this.AllVendorCategory = res
      })
    }

    
  GetAllCalCostCenter(){
    this.definitionService.GetAllCalCostCenter().subscribe(res=>{
      this.AllCostCenter = res;
    })
  }

  GetAllCountries(){
    this.definitionService.GetAllCountries().subscribe(res=>{
      this.AllCountries = res;
    })
   }

 GetAllHrEmployees(){
  this.definitionService.GetAllHrEmployees().subscribe(res=>{
    this.AllHrEmployees = res;
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

 
 GetAllCities(){
  this.definitionService.GetCustomerCities().subscribe(res=>{
    this.AllCities = res
  })
 }

 fillForm(row:any){
  this.definitionService.GetVendorMainChartAccount(row.vendorId).subscribe({
    next: res => {
      this.MainAccountId = res;
      this.originalPrimaryAccountValue = this.VendorForm.get('vendorId')?.value;

    },
    error: err => {
      console.error('Error fetching main account:', err);
    },
    complete: () => {
      if(row){
        this.VendorForm.setValue({
          vendorId: row.vendorId,
          vendorCode: row.vendorCode,
          vendorDescA: row.vendorDescA,
          vendorDescE: row.vendorDescE,
          isActive: row.isActive,
          vendorTypeId: row.vendorTypeId,
          costCenterId: row.costCenterId,
          empId: row.empId,
          vendorCatId: row.vendorCatId,
          currencyId: row.currencyId,
          tel: row.tel,
          tel2: row.tel2,
          tel3: row.tel3,
          tel4: row.tel4,
          tel5: row.tel4,
          fax: row.fax,
          address1: row.address1,
          address2: row.address2,
          address3: row.address3,
          forAdjustOnly: row.forAdjustOnly,
          creditPeriod: row.creditPeriod,
          creditLimit: row.creditLimit,
          cityId: row.cityId,
          dtRegRenew: row.dtRegRenew,
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
          email: null,
          email2: null,
          email3: null,
          IsPrimaryAccountChangedForm: null,
          etaxCustType: row.etaxCustType,
          taxRefNo: row.taxRefNo,
          taxExemptionNo: row.taxExemptionNo,
          countryId: row.countryId,
          buildingNumber: row.buildingNumber,
          buildingNumber2: row.buildingNumber2,
          zipCode: row.zipCode
        })
    
        this.UpdateDisable = false;
        this.DeleteDisable = false;
        this.UndoDisabled = true;
        window.scrollTo({ top: 30, behavior: 'smooth' });
      }
     
    }
   })
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
  
    GetVendorMainAccount(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GeVendorMainAccount(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
            this.selectedAccount = 1; 

          }
        })
      }
    }
    
    GetAdditionalaccount1(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }else{
            this.VendorForm.get("openningBalanceDepit")?.setValue(null);
            this.VendorForm.get("openningBalanceCredit")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(null);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(null);
            this.VendorForm.get("accTotalDebit")?.setValue(null);
            this.VendorForm.get("accTotaCredit")?.setValue(null);
            this.VendorForm.get("balanceDebitLocal")?.setValue(null);
            this.VendorForm.get("balanceCreditLocal")?.setValue(null);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(null);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(null);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(null);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(null);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(null);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(null);
          }
        })
      }
    }
    
    GetAdditionalaccount2(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount2(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }else{
            this.VendorForm.get("openningBalanceDepit")?.setValue(null);
            this.VendorForm.get("openningBalanceCredit")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(null);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(null);
            this.VendorForm.get("accTotalDebit")?.setValue(null);
            this.VendorForm.get("accTotaCredit")?.setValue(null);
            this.VendorForm.get("balanceDebitLocal")?.setValue(null);
            this.VendorForm.get("balanceCreditLocal")?.setValue(null);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(null);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(null);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(null);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(null);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(null);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(null);
          }
        })
      }
    }
    
    
    GetAdditionalaccount3(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount3(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }else{
            this.VendorForm.get("openningBalanceDepit")?.setValue(null);
            this.VendorForm.get("openningBalanceCredit")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(null);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(null);
            this.VendorForm.get("accTotalDebit")?.setValue(null);
            this.VendorForm.get("accTotaCredit")?.setValue(null);
            this.VendorForm.get("balanceDebitLocal")?.setValue(null);
            this.VendorForm.get("balanceCreditLocal")?.setValue(null);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(null);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(null);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(null);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(null);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(null);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(null);
          }
        })
      }
    }
    
    GetAdditionalaccount4(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount4(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }else{
            this.VendorForm.get("openningBalanceDepit")?.setValue(null);
            this.VendorForm.get("openningBalanceCredit")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(null);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(null);
            this.VendorForm.get("accTotalDebit")?.setValue(null);
            this.VendorForm.get("accTotaCredit")?.setValue(null);
            this.VendorForm.get("balanceDebitLocal")?.setValue(null);
            this.VendorForm.get("balanceCreditLocal")?.setValue(null);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(null);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(null);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(null);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(null);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(null);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(null);
          }
        })
      }
    }
    
    GetAdditionalaccount5(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount5(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }else{
            this.VendorForm.get("openningBalanceDepit")?.setValue(null);
            this.VendorForm.get("openningBalanceCredit")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(null);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(null);
            this.VendorForm.get("accTotalDebit")?.setValue(null);
            this.VendorForm.get("accTotaCredit")?.setValue(null);
            this.VendorForm.get("balanceDebitLocal")?.setValue(null);
            this.VendorForm.get("balanceCreditLocal")?.setValue(null);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(null);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(null);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(null);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(null);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(null);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(null);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(null);
          }
        })
      }
    }
    
    
    GetAdditionalaccount6(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount6(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }
        })
      }
    }
    
    
    GetAdditionalaccount7(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount7(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }
        })
      }
    }
    
    GetAdditionalaccount8(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount8(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }
        })
      }
    }
    
    GetAdditionalaccount9(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount9(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }
        })
      }
    }
    
    GetAdditionalaccount10(){
      if(this.VendorForm.value.vendorId){
        this.definitionService.GetVendorAdditionalAccount10(this.VendorForm.value.vendorId).subscribe(res=>{
          if(res){
            this.VendorForm.get("openningBalanceDepit")?.setValue(res.openningBalanceDepit);
            this.VendorForm.get("openningBalanceCredit")?.setValue(res.openningBalanceCredit);
            this.VendorForm.get("accCurrTrancDepit")?.setValue(res.accCurrTrancDepit);
            this.VendorForm.get("accCurrTrancCredit")?.setValue(res.accCurrTrancCredit);
            this.VendorForm.get("accTotalDebit")?.setValue(res.accTotalDebit);
            this.VendorForm.get("accTotaCredit")?.setValue(res.accTotaCredit);
            this.VendorForm.get("balanceDebitLocal")?.setValue(res.balanceDebitLocal);
            this.VendorForm.get("balanceCreditLocal")?.setValue(res.balanceCreditLocal);
            this.VendorForm.get("openningBalanceDepitCurncy")?.setValue(res.openningBalanceDepitCurncy);
            this.VendorForm.get("openningBalanceCreditCurncy")?.setValue(res.openningBalanceCreditCurncy);
            this.VendorForm.get("accCurrTrancDepitCurncy")?.setValue(res.accCurrTrancDepitCurncy);
            this.VendorForm.get("accCurrTrancCreditCurncy")?.setValue(res.accCurrTrancCreditCurncy);
            this.VendorForm.get("accTotalDebitCurncy")?.setValue(res.accTotalDebitCurncy);
            this.VendorForm.get("accTotaCreditCurncy")?.setValue(res.accTotaCreditCurncy);
            this.VendorForm.get("balanceDebitCurncy")?.setValue(res.balanceDebitCurncy);
            this.VendorForm.get("balanceCreditCurncy")?.setValue(res.balanceCreditCurncy);
          }
        })
      }
    }


    New() {
      this.VendorForm.enable();
      this.newDisable = true;
      this.readonlyTable = true;
      this.AllVendors = this.dataSource.filteredData;
      this.undoIndex = this.AllVendors.findIndex(p=>p.vendorId == this.VendorForm.value.vendorId);
     this.VendorForm.setValue({
       vendorId: null,
       vendorCode: null,
       vendorDescA: null,
       vendorDescE: null,
       isActive: null,
       vendorTypeId: null,
       costCenterId: null,
       empId: null,
       vendorCatId: null,
       currencyId: null,
       tel: null,
       tel2: null,
       tel3: null,
       tel4: null,
       tel5: null,
       fax: null,
       address1: null,
       address2: null,
       address3: null,
       forAdjustOnly: null,
       creditPeriod: null,
       creditLimit: null,
       cityId: null,
       dtRegRenew: null,
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
       email: null,
       email2: null,
       email3: null,
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


  
  updateVendor(){
  this.VendorForm.enable();
  this.newDisable = false;
  this.readonlyTable = false;
  this.newDisable = true;
  this.readonlyTable = true;
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
  this.AllVendors = this.dataSource.filteredData;
  this.undoIndex = this.AllVendors.findIndex(p=>p.vendorId == this.VendorForm.value.vendorId);
 }

 undo(){
  this.VendorForm.disable();
  this.DisabledNextButton = false;
  this.DisabledPrevButton = false;
  this.lastRow = false;
  this.firstRow = false;
  this.reloadDisabled = false;
  this.SaveDisable = true;
  this.UndoDisabled = true;
  
    if(this.undoIndex != -1){
      const undoItem = this.AllVendors[this.undoIndex]

      if(undoItem){
       this.VendorForm.setValue({
         vendorId: undoItem.vendorId,
         vendorCode: undoItem.vendorCode,
         vendorDescA: undoItem.vendorDescA,
         vendorDescE: undoItem.vendorDescE,
         isActive: undoItem.isActive,
         vendorTypeId: undoItem.vendorTypeId,
         costCenterId: undoItem.costCenterId,
         empId: undoItem.empId,
         vendorCatId: undoItem.vendorCatId,
         currencyId: undoItem.currencyId,
         tel: undoItem.tel,
         tel2: undoItem.tel2,
         tel3: undoItem.tel3,
         tel4: undoItem.tel4,
         tel5: undoItem.tel4,
         fax: undoItem.fax,
         address1: undoItem.address1,
         address2: undoItem.address2,
         address3: undoItem.address3,
         forAdjustOnly: undoItem.forAdjustOnly,
         creditPeriod: undoItem.creditPeriod,
         creditLimit: undoItem.creditLimit,
         cityId: undoItem.cityId,
         dtRegRenew: undoItem.dtRegRenew,
         dtReg: undoItem.dtReg,
         addField1: undoItem.addField1,
         addField2: undoItem.addField2,
         addField3: undoItem.addField3,
         addField4: undoItem.addField4,
         addField5: undoItem.addField5,
         etaxCustType: undoItem.etaxCustType,
         taxRefNo: undoItem.taxRefNo,
         taxExemptionNo: undoItem.taxExemptionNo,
         countryId: undoItem.countryId,
         buildingNumber: undoItem.buildingNumber,
         buildingNumber2: undoItem.buildingNumber2,
         zipCode: undoItem.zipCode,
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
         email: null,
         email2: null,
         email3: null,
         IsPrimaryAccountChangedForm: null,
       })
     }
    }
    this.UpdateDisable = false;
    this.DeleteDisable = true;
 }

 getFirstRowData() {
  this.AllVendors = this.dataSource.filteredData
  const FirstItem = this.AllVendors[0];
    if(FirstItem){
      this.VendorForm.setValue({
        vendorId: FirstItem.vendorId,
        vendorCode: FirstItem.vendorCode,
        vendorDescA: FirstItem.vendorDescA,
        vendorDescE: FirstItem.vendorDescE,
        isActive: FirstItem.isActive,
        vendorTypeId: FirstItem.vendorTypeId,
        costCenterId: FirstItem.costCenterId,
        empId: FirstItem.empId,
        vendorCatId: FirstItem.vendorCatId,
        currencyId: FirstItem.currencyId,
        tel: FirstItem.tel,
        tel2: FirstItem.tel2,
        tel3: FirstItem.tel3,
        tel4: FirstItem.tel4,
        tel5: FirstItem.tel4,
        fax: FirstItem.fax,
        address1: FirstItem.address1,
        address2: FirstItem.address2,
        address3: FirstItem.address3,
        forAdjustOnly: FirstItem.forAdjustOnly,
        creditPeriod: FirstItem.creditPeriod,
        creditLimit: FirstItem.creditLimit,
        cityId: FirstItem.cityId,
        dtRegRenew: FirstItem.dtRegRenew,
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
        email: null,
        email2: null,
        email3: null,
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
  this.AllVendors = this.dataSource.filteredData
  const LastItem = this.AllVendors[this.AllVendors.length-1];
  if(LastItem){
    this.VendorForm.setValue({
      vendorId: LastItem.vendorId,
      vendorCode: LastItem.vendorCode,
      vendorDescA: LastItem.vendorDescA,
      vendorDescE: LastItem.vendorDescE,
      isActive: LastItem.isActive,
      vendorTypeId: LastItem.vendorTypeId,
      costCenterId: LastItem.costCenterId,
      empId: LastItem.empId,
      vendorCatId: LastItem.vendorCatId,
      currencyId: LastItem.currencyId,
      tel: LastItem.tel,
      tel2: LastItem.tel2,
      tel3: LastItem.tel3,
      tel4: LastItem.tel4,
      tel5: LastItem.tel4,
      fax: LastItem.fax,
      address1: LastItem.address1,
      address2: LastItem.address2,
      address3: LastItem.address3,
      forAdjustOnly: LastItem.forAdjustOnly,
      creditPeriod: LastItem.creditPeriod,
      creditLimit: LastItem.creditLimit,
      cityId: LastItem.cityId,
      dtRegRenew: LastItem.dtRegRenew,
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
      email: null,
      email2: null,
      email3: null,
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

getPrevRowData() {
  this.AllVendors = this.dataSource.filteredData;

  const index = this.AllVendors.findIndex(p=>p.vendorId == this.VendorForm.value.vendorId);

  const PrevItem = this.AllVendors[index - 1];

  if(PrevItem){
    this.VendorForm.setValue({
      vendorId: PrevItem.vendorId,
      vendorCode: PrevItem.vendorCode,
      vendorDescA: PrevItem.vendorDescA,
      vendorDescE: PrevItem.vendorDescE,
      isActive: PrevItem.isActive,
      vendorTypeId: PrevItem.vendorTypeId,
      costCenterId: PrevItem.costCenterId,
      empId: PrevItem.empId,
      vendorCatId: PrevItem.vendorCatId,
      currencyId: PrevItem.currencyId,
      tel: PrevItem.tel,
      tel2: PrevItem.tel2,
      tel3: PrevItem.tel3,
      tel4: PrevItem.tel4,
      tel5: PrevItem.tel4,
      fax: PrevItem.fax,
      address1: PrevItem.address1,
      address2: PrevItem.address2,
      address3: PrevItem.address3,
      forAdjustOnly: PrevItem.forAdjustOnly,
      creditPeriod: PrevItem.creditPeriod,
      creditLimit: PrevItem.creditLimit,
      cityId: PrevItem.cityId,
      dtRegRenew: PrevItem.dtRegRenew,
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
      email: null,
      email2: null,
      email3: null,
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


    const firstItem = this.AllVendors.findIndex(p=>p.vendorId == this.VendorForm.value.vendorId);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
     
   
    this.DisabledNextButton = false;

  }

}

getNextRowData() {
  this.AllVendors = this.dataSource.filteredData;

  const index = this.AllVendors.findIndex(p=>p.vendorId == this.VendorForm.value.vendorId);

  const nextItem = this.AllVendors[index + 1];

  if(nextItem){
    this.VendorForm.setValue({
      vendorId: nextItem.vendorId,
      vendorCode: nextItem.vendorCode,
      vendorDescA: nextItem.vendorDescA,
      vendorDescE: nextItem.vendorDescE,
      isActive: nextItem.isActive,
      vendorTypeId: nextItem.vendorTypeId,
      costCenterId: nextItem.costCenterId,
      empId: nextItem.empId,
      vendorCatId: nextItem.vendorCatId,
      currencyId: nextItem.currencyId,
      tel: nextItem.tel,
      tel2: nextItem.tel2,
      tel3: nextItem.tel3,
      tel4: nextItem.tel4,
      tel5: nextItem.tel4,
      fax: nextItem.fax,
      address1: nextItem.address1,
      address2: nextItem.address2,
      address3: nextItem.address3,
      forAdjustOnly: nextItem.forAdjustOnly,
      creditPeriod: nextItem.creditPeriod,
      creditLimit: nextItem.creditLimit,
      cityId: nextItem.cityId,
      dtRegRenew: nextItem.dtRegRenew,
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
      email: null,
      email2: null,
      email3: null,
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

    const LastItem = this.AllVendors.findIndex(p=>p.vendorId == this.VendorForm.value.vendorId);

    if(this.AllVendors.length -1 === LastItem){
      this.DisabledNextButton = true;
      this.lastRow = true;
    }
    this.DisabledPrevButton = false;
  } 
 }

  
 onSumbit(){
  if(this.isPrimaryAccountChanged) this.VendorForm.get('IsPrimaryAccountChangedForm')?.setValue(true);
  if(this. isAddAccount1Changed) this.VendorForm.get('isAddAccount1ChangedForm')?.setValue(true)
  if(this.isAddAccount2Changed) this.VendorForm.get('isAddAccount2ChangedForm')?.setValue(true)
  if(this.isAddAccount3Changed) this.VendorForm.get('isAddAccount3ChangedForm')?.setValue(true)
  if(this.isAddAccount4Changed) this.VendorForm.get('isAddAccount4ChangedForm')?.setValue(true)
  if(this.isAddAccount5Changed) this.VendorForm.get('isAddAccount5ChangedForm')?.setValue(true)
  if(this.isAddAccount6Changed) this.VendorForm.get('isAddAccount6ChangedForm')?.setValue(true)
  if(this.isAddAccount7Changed) this.VendorForm.get('isAddAccount7ChangedForm')?.setValue(true)
  if(this.isAddAccount8Changed) this.VendorForm.get('isAddAccount8ChangedForm')?.setValue(true)
  if(this.isAddAccount9Changed) this.VendorForm.get('isAddAccount9ChangedForm')?.setValue(true)
  if(this.isAddAccount10Changed) this.VendorForm.get('isAddAccount10ChangedForm')?.setValue(true)

   this.definitionService.AddVendor(this.VendorForm.value).subscribe(res=>{
     if(res.status){
       this.GetAllVendors();
       this.VendorForm.disable();
       this.VendorForm.get('vendorId')?.setValue(res.id)
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


 Open_delete_confirm() {
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.definitionService.DeleteVendor(this.VendorForm.value.vendorId).subscribe(res=>{
        if(res){
          this.GetAllVendors();
          this.VendorForm.setValue({
            vendorId: null,
            vendorCode: null,
            vendorDescA: null,
            vendorDescE: null,
            isActive: null,
            vendorTypeId: null,
            costCenterId: null,
            empId: null,
            vendorCatId: null,
            currencyId: null,
            tel: null,
            tel2: null,
            tel3: null,
            tel4: null,
            tel5: null,
            fax: null,
            address1: null,
            address2: null,
            address3: null,
            forAdjustOnly: null,
            creditPeriod: null,
            creditLimit: null,
            cityId: null,
            dtRegRenew: null,
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
            email: null,
            email2: null,
            email3: null,
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
 
 onTabChanged(event: MatTabChangeEvent) {
  if (event.tab.textLabel === 'الفروع') {
    this.GetAllVendorBranches();
  }
  if (event.tab.textLabel === 'جهات الإتصال') {
    this.GetAllVendorContacts();
  }
  if (event.tab.textLabel === 'حسابات') {
    this.GetAllVendorAdditionalAccount();
  }
  if (event.tab.textLabel === 'الارصده') {
    this.GetVendorMainAccount();
  }
}
    

GetAllVendorAdditionalAccount(){
  if(this.VendorForm.value.vendorId){
    this.definitionService.GetAllVendorAdditionalAccount(this.VendorForm.value.vendorId).subscribe({
      next: res => {
          this.VendorForm.get("addAccount1")?.setValue(res.addAccountCode1);
          this.VendorForm.get("addAccount2")?.setValue(res.addAccountCode2);
          this.VendorForm.get("addAccount3")?.setValue(res.addAccountCode3);
          this.VendorForm.get("addAccount4")?.setValue(res.addAccountCode4);
          this.VendorForm.get("addAccount5")?.setValue(res.addAccountCode5);
          this.VendorForm.get("addAccount6")?.setValue(res.addAccountCode6);
          this.VendorForm.get("addAccount7")?.setValue(res.addAccountCode7);
          this.VendorForm.get("addAccount8")?.setValue(res.addAccountCode8);
          this.VendorForm.get("addAccount9")?.setValue(res.addAccountCode9);
          this.VendorForm.get("addAccount10")?.setValue(res.addAccountCode10);

          this.originalAddAccount1Value = this.VendorForm.get('addAccount1')?.value;
          this.originalAddAccount2Value = this.VendorForm.get('addAccount2')?.value;
          this.originalAddAccount3Value = this.VendorForm.get('addAccount3')?.value;
          this.originalAddAccount4Value = this.VendorForm.get('addAccount4')?.value;
          this.originalAddAccount5Value = this.VendorForm.get('addAccount5')?.value;
          this.originalAddAccount6Value = this.VendorForm.get('addAccount6')?.value;
          this.originalAddAccount7Value = this.VendorForm.get('addAccount7')?.value;
          this.originalAddAccount8Value = this.VendorForm.get('addAccount8')?.value;
          this.originalAddAccount9Value = this.VendorForm.get('addAccount9')?.value;
          this.originalAddAccount10Value = this.VendorForm.get('addAccount10')?.value;
          
   
        
      }
    })
  }
}



AddVendorBranch(){
  var _popup = this.dialog.open(AddVendorBranchComponent, {
    width: '50%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'أضافة فرع',
      vendorId: this.VendorForm.value.vendorId,
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      this.definitionService.GetVendorBranches(response).subscribe(res=>{
        this.AllVendorBranches = res
      });
    }
  });
}


GetAllVendorBranches(){
  if(this.VendorForm.value.vendorId){
    this.definitionService.GetVendorBranches(this.VendorForm.value.vendorId).subscribe(res=>{
      this.AllVendorBranches = res
      
    });
  }
}

DeleteVendorBranch(custBranchId : any) {
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
         this.definitionService.DeleteVendorBranch(custBranchId).subscribe(res=>{
          if(res.status){
            this.definitionService.GetVendorBranches(this.VendorForm.value.vendorId).subscribe(res=>{
              this.AllVendorBranches = res         
            });
          }
         })
    }
  });
}

updateVendorBranch(branchData:any){
  var _popup = this.dialog.open(AddVendorBranchComponent, {
    width: '50%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل فرع',
      vendorId: this.VendorForm.value.vendorId,
      VendorBranchData : branchData
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      
      this.definitionService.GetVendorBranches(response).subscribe(res=>{
        this.AllVendorBranches = res
      });
    }
  });
}

GetAllVendorContacts(){
  if(this.VendorForm.value.vendorId){
    this.definitionService.GetVendorContacts(this.VendorForm.value.vendorId).subscribe(res=>{
      this.AllVendorContacts = res
    });
  }
}


AddVendorContact(){
  var _popup = this.dialog.open(VendorContactComponent, {
    width: '70%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'أضافة جهة أتصال',
      vendorId: this.VendorForm.value.vendorId,
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      this.definitionService.GetVendorContacts(response).subscribe(res=>{
        this.AllVendorContacts = res
      });
    }
  });
}


updateVendorContact(customerContact:any){
  var _popup = this.dialog.open(VendorContactComponent, {
    width: '70%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل جهه أتصال',
      vendorId: this.VendorForm.value.vendorId,
      vendorContactData : customerContact
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      
      this.definitionService.GetVendorContacts(response).subscribe(res=>{
        this.AllVendorContacts = res
      });
    }
  });
}

DeleteVendorContact(VendContactId : any) {
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
         this.definitionService.DeleteVendorContact(VendContactId).subscribe(res=>{
          if(res.status){
            this.definitionService.GetVendorContacts(res.id).subscribe(res=>{
              this.AllVendorContacts = res
            });
          }
         })
    }
  });
}


Filterchange(data: Event) {
  const value = (data.target as HTMLInputElement).value;
  this.dataSource.filter = value;
}


}
