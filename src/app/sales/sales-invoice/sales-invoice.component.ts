import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';
import { AddItemToPurchaseInvoiceComponent } from 'src/app/purchases/add-item-to-purchase-invoice/add-item-to-purchase-invoice.component';
import { PurchasesServicesService } from 'src/app/purchases/purchases-services.service';
import { UpdateItemComponent } from 'src/app/purchases/update-item/update-item.component';
import { UpdatePurchaseInvoiceComponent } from 'src/app/purchases/update-purchase-invoice/update-purchase-invoice.component';
import { SalesService } from '../sales.service';
import { AddItemsToSalesInvoiceComponent } from '../add-items-to-sales-invoice/add-items-to-sales-invoice.component';
import { UpdateSalesInvoiceDetailsComponent } from '../update-sales-invoice-details/update-sales-invoice-details.component';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss']
})
export class SalesInvoiceComponent implements OnInit  {
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

  AllSysBooks:any[] = [];
  AllVendor:any[] = [];
  FilteredAllVendors:any[]=[];
  AllCurrency: any[] = [];
  AllAnalyticalCode:any[] = [];

  itemCollections : any[] = [];
  itemCollectionFromDataBase : any[] = [];
  AddItemDisable : boolean = false;

  AllSalesInvocies:any[] = [];
  
  readonlyTable: boolean = true;
  newDisable: boolean = false;

  AllRectSourceType : any[] = [];
  FilteredAllRectSourceType : any[] = [];
  trnoReadonly : boolean = false;
  AllTerms : any[] = [];
  AllSalesEmployess : any[] = [];

  addItemDisable : boolean = true;
  invoiceItemsData : any;
  AddItemsDisable : boolean = true;
  trnoReadonly2 : boolean = true;
  FilteredAllSalesEmployess : any[] = [];

  constructor(private purchasesServicesService: PurchasesServicesService , private fb:FormBuilder,private dialog: MatDialog,
    public toastr: ToastrService, public accountService : AccountService,private salesService : SalesService ){
  }

  salesInvoiceForm = this.fb.group({
    invId:[0],
    trNo:[],
    bookId:[,Validators.required],
    trDate: [new Date()],
    termId:[],
    rectSourceType : [0],
    customerId:[,Validators.required],
    currencyId:[],
    manualTrNo:[''],
    invoiceType:[],
    aid:[],
    invDueDate:[],
    storeId:[''],
    CreatedBy:[''],
    invoiceItem :[[]],
    rate : [],
    empId : []
  })

  ngOnInit(): void {
    this.salesInvoiceForm.disable();
    this.getAllSysBooks();
    this.GetAllCurrency();
    this.GetAllSysAnalyticalCodes();
    this.GetAllSalesInvoice();
    this.getSalesEmployess();
  }

  GetAllSalesInvoice(){
    this.salesService.GetAllSalesInvoice().subscribe(res=>{
      this.AllSalesInvocies = res;
    })
  }

  getAllSysBooks(){
    this.salesService.getAllBooksForSalesInvoice().subscribe(res=>{
      if(res.length > 0){
        this.AllSysBooks = res

        this.purchasesServicesService.getAllMsTerms(this.AllSysBooks[0].bookId).subscribe(res=>{
          if(res.length > 0){
           this.AllTerms = res
          }
         })

      }
    })
  }

  getUserInfo(){
    this.accountService.currentUser$.subscribe(res =>{
      this.salesInvoiceForm.get('CreatedBy')?.setValue(res!.userId)
      this.salesInvoiceForm.get('storeId')?.setValue(res!.storeId)
      })
  }
  

  onSumbit() {
    this.invoiceItemsData = this.itemCollections;

    if(this.invoiceItemsData != null){
      this.salesInvoiceForm.get("invoiceItem")?.setValue(this.invoiceItemsData)
    }

   this.salesService.AddMsSalesInvoice(this.salesInvoiceForm.value).subscribe(res=>{
    if(res.status){
      this.GetAllSalesInvoice();
      this.salesInvoiceForm.disable();
      this.salesInvoiceForm.get('invId')?.setValue(res.id);
      this.DisabledNextButton = false;
      this.DisabledPrevButton = false;
      this.lastRow = false;
      this.firstRow = false;
      this.SaveDisable=true;
      this.UpdateDisable = false;
      this.UndoDisabled = true;
      this.DeleteDisable=false;
      this.readonlyTable = true;
      this.AddItemDisable = true;
      this.AddItemsDisable = true
    }
   })
  }

  getLastRowData(){
    const LastItem = this.AllSalesInvocies[this.AllSalesInvocies.length - 1];
    if (LastItem) {
      this.salesInvoiceForm.setValue({
        invId: LastItem.invId,
        trNo: LastItem.trNo ?? null,
        bookId: LastItem.bookId,
        trDate: LastItem.trDate,
        termId: LastItem.termId,
        rectSourceType: LastItem.rectSourceType,
        customerId: LastItem.customerId,
        currencyId: LastItem.currencyId,
        manualTrNo: LastItem.manualTrNo,
        invoiceType: LastItem.invoiceType,
        aid: LastItem.aid,
        invDueDate: LastItem.invDueDate,
        rate : LastItem.rate,
        empId : LastItem.empId,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null
      });

      this.onRectSourceTypeChange({ value: LastItem.rectSourceType } as MatSelectChange);

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.salesService.getMsSalesInvoiceItems(this.salesInvoiceForm.value.invId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })

      this.firstRow = false;
      this.lastRow = true;
      this.DisabledPrevButton = false;
      this.DisabledNextButton = true;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;
    }
  }

  getNextRowData(){
    const index = this.AllSalesInvocies.findIndex(
      (p) => p.invId == this.salesInvoiceForm.value.invId
    );

    const nextItem = this.AllSalesInvocies[index + 1];

    if (nextItem.invId != null) {
      this.salesInvoiceForm.setValue({
        invId: nextItem.invId,
        trNo: nextItem.trNo ?? null,
        bookId: nextItem.bookId,
        trDate: nextItem.trDate,
        termId: nextItem.termId,
        rectSourceType: nextItem.rectSourceType,
        customerId: nextItem.customerId,
        currencyId: nextItem.currencyId,
        manualTrNo: nextItem.manualTrNo,
        invoiceType: nextItem.invoiceType,
        aid: nextItem.aid,
        invDueDate: nextItem.invDueDate,
        rate : nextItem.rate,
        empId : nextItem.empId,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.onRectSourceTypeChange({ value: nextItem.rectSourceType } as MatSelectChange);
     
      this.salesService.getMsSalesInvoiceItems(this.salesInvoiceForm.value.invId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;

      const LastItem = this.AllSalesInvocies.findIndex(
        (p) => p.invId == this.salesInvoiceForm.value.invId
      );

      if (this.AllSalesInvocies.length - 1 === LastItem) {
        this.DisabledNextButton = true;
        this.lastRow = true;
      }

      this.DisabledPrevButton = false;
    }

  }

  Open_delete_confirm(){

  }

  getPrevRowData(){
    const index = this.AllSalesInvocies.findIndex(
      (p) => p.invId == this.salesInvoiceForm.value.invId
    );

    if (index === 0 || index === -1) {
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }

    const PrevItem = this.AllSalesInvocies[index - 1];

    if (PrevItem.invId != null) {
      this.salesInvoiceForm.setValue({
        invId: PrevItem.invId,
        trNo: PrevItem.trNo ?? null,
        bookId: PrevItem.bookId,
        trDate: PrevItem.trDate,
        termId: PrevItem.termId,
        rectSourceType: PrevItem.rectSourceType,
        customerId: PrevItem.customerId,
        currencyId: PrevItem.currencyId,
        manualTrNo: PrevItem.manualTrNo,
        invoiceType: PrevItem.invoiceType,
        aid: PrevItem.aid,
        invDueDate: PrevItem.invDueDate,
        rate : PrevItem.rate,
        empId : PrevItem.empId,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null
      });

      this.onRectSourceTypeChange({ value: PrevItem.rectSourceType } as MatSelectChange);

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      
      this.salesService.getMsSalesInvoiceItems(this.salesInvoiceForm.value.invId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;


      const firstItem = this.AllSalesInvocies.findIndex(
        (p) => p.invId == this.salesInvoiceForm.value.invId
      );

      if (firstItem === 0) {
        this.DisabledPrevButton = true;
        this.firstRow = true;
      }

      this.DisabledNextButton = false;
    }
  }

  getFirstRowData(){
    this.trnoReadonly = false;

    const FirstItem = this.AllSalesInvocies[0];
    if (FirstItem.invId != null) {
      this.salesInvoiceForm.setValue({
        invId: FirstItem.invId,
        trNo:FirstItem.trNo ?? null,
        bookId: FirstItem.bookId,
        trDate: FirstItem.trDate,
        termId: FirstItem.termId,
        rectSourceType: FirstItem.rectSourceType,
        customerId: FirstItem.customerId,
        currencyId: FirstItem.currencyId,
        manualTrNo: FirstItem.manualTrNo,
        invoiceType: FirstItem.invoiceType,
        aid: FirstItem.aid,
        invDueDate: FirstItem.invDueDate,
        rate : FirstItem.rate,
        empId : FirstItem.empId,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null
      });

      this.onRectSourceTypeChange({ value: FirstItem.rectSourceType } as MatSelectChange);

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.salesService.getMsSalesInvoiceItems(this.salesInvoiceForm.value.invId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
    }
  }


  undo(){
    this.trnoReadonly = false;
    this.salesInvoiceForm.disable();
    this.readonlyTable = true;
    this.newDisable = false;
    this.AddItemsDisable = true;

    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.DeleteDisable = true;
    this.UpdateDisable = true;
    this.SaveDisable = true;
    this.UndoDisabled = true;

    if (this.undoIndex != -1) {
      const undoItem = this.AllSalesInvocies[this.undoIndex];

      if (undoItem.invId != null) {
        this.DeleteDisable = false;
        this.UpdateDisable = false;
        this.salesInvoiceForm.setValue({
          invId: undoItem.invId,
          trNo: undoItem.trNo ?? null,
          bookId: undoItem.bookId,
          trDate: undoItem.trDate,
          termId: undoItem.termId,
          rectSourceType: undoItem.rectSourceType,
          customerId: undoItem.customerId,
          currencyId: undoItem.currencyId,
          manualTrNo: undoItem.manualTrNo,
          invoiceType: undoItem.invoiceType,
          aid: undoItem.aid,
          invDueDate: undoItem.invDueDate,
          rate : undoItem.rate,
          empId : undoItem.empId,
          storeId: null,
          CreatedBy: null,
          invoiceItem: null
        });

        this.onRectSourceTypeChange({ value: undoItem.rectSourceType } as MatSelectChange);

        
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.salesService.getMsSalesInvoiceItems(this.salesInvoiceForm.value.invId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      }
    }
  }

  updatePurchaseInvoice(){
    this.getUserInfo();
    this.trnoReadonly = true;
    this.salesInvoiceForm.enable();
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
    this.undoIndex = this.AllSalesInvocies.findIndex(p=>p.invId == this.salesInvoiceForm.value.invId);
    this.readonlyTable = false;
    this.AddItemsDisable = false;

  }

  New(){
    this.salesInvoiceForm.enable();
    this.readonlyTable = false;
    this.newDisable = true;
    this.itemCollections = [];
    this.itemCollectionFromDataBase = [];
    this.AddItemsDisable = false;

    this.undoIndex = this.AllSalesInvocies.findIndex(
      (p) => p.invId == this.salesInvoiceForm.value.invId
    );

    this.salesInvoiceForm.setValue({
      invId: 0,
      trNo: null,
      bookId: null,
      trDate: null,
      termId: null,
      rectSourceType: 2,
      customerId: null,
      currencyId: null,
      manualTrNo: null,
      invoiceType: null,
      aid: null,
      rate : null,
      invDueDate: null,
      storeId: null,
      CreatedBy: null,
      invoiceItem: null,
      empId:null
    });

    this.salesService.getCurrentTime().subscribe(res=>{
      this.salesInvoiceForm.get('trDate')?.setValue(res.currentDateTime);
      this.salesInvoiceForm.get('invDueDate')?.setValue(res.currentDateTime);
    })

    this.getUserInfo();
    this.onRectSourceTypeChange({ value: 2 } as MatSelectChange);

    this.trnoReadonly = true;

    this.salesInvoiceForm.get('termId')?.setValue(this.AllTerms[0]?.termId);
    this.salesInvoiceForm.get('bookId')?.setValue(this.AllSysBooks[0]?.bookId);

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

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchVendor(searchValue);
  }

  searchVendor(searchValue: string): void {
    if (!searchValue) {
      this.FilteredAllRectSourceType = this.AllRectSourceType;
      return;
    }

    this.FilteredAllRectSourceType = this.AllRectSourceType.filter((acc) =>
      acc.code.toString().includes(searchValue)
    );

    if (this.FilteredAllRectSourceType.length === 0) {
      this.FilteredAllRectSourceType = this.AllRectSourceType.filter((acc) =>
        acc.name.toString().includes(searchValue)
      );
    }

    if (this.FilteredAllRectSourceType.length > 0) {
      this.salesInvoiceForm.get('customerId')?.setValue(
        this.FilteredAllRectSourceType[0].id
      );

      this.salesInvoiceForm.get('currencyId')?.setValue(this.FilteredAllRectSourceType[0].currencyId);
      const targetRate = this.AllCurrency.find(currency => currency.currencyId === this.FilteredAllRectSourceType[0].currencyId);
      this.salesInvoiceForm.get('rate')?.setValue(targetRate.rate);

    }
  }

  GetAllCurrency() {
    this.purchasesServicesService.GetAllCurrency().subscribe((res) => {
      this.AllCurrency = res;
    });
  }


  onAccountSelect(event: MatSelectChange): void {
    const selectedVendor = this.FilteredAllVendors.find(
      (acc) => acc.customerId === event.value);
    // this.salesInvoiceForm.get('currencyId')?.setValue(selectedVendor.currencyId);
  }

  GetAllSysAnalyticalCodes(){
    this.purchasesServicesService.GetAllSysAnalyticalCodes().subscribe(res=>{
      this.AllAnalyticalCode = res;
    })
  }




  onRectSourceTypeChange(event : MatSelectChange){
       if(event.value == 1 || (event.value >= 5 && event.value < 15)){
        this.purchasesServicesService.getAllCustomers().subscribe(res=>{
          this.AllRectSourceType = res
          this.FilteredAllRectSourceType = res
         })
       }

       if(event.value == 2 || (event.value >= 15 && event.value < 25)){
         this.purchasesServicesService.getAllVendor().subscribe(res=>{
          this.AllRectSourceType = res
          this.FilteredAllRectSourceType = res
         })
       }

       
       if(event.value == 4 || event.value == 35 || (event.value >= 25 && event.value < 34)){
        this.purchasesServicesService.getAllHrEmployees().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value == 36 || event.value == 37){
        this.purchasesServicesService.getAllJobOrder().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      
      if(event.value >= 38 && event.value <= 47){
        this.purchasesServicesService.getAllSrVehicles().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >= 48 && event.value <= 50){
        this.purchasesServicesService.getAllSearchVehicleJobOrder().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >=  51 && event.value <= 60){
        this.purchasesServicesService.getAllMsLetterOfGuarantees().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >=  61 && event.value <= 63){
        this.purchasesServicesService.getAllSrJobOrderMotors().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >=  64 && event.value <= 66){
        this.purchasesServicesService.getAllRepairOrders().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }
      

      if(event.value >=  67 && event.value <= 77){
        this.purchasesServicesService.getAllAssetAssetCards().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }

      if(event.value >=  78 && event.value <= 88){
        this.purchasesServicesService.getAllProjProjects().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }
      
      if(event.value ==  34 ){
        this.purchasesServicesService.getAllCalAccountCharts().subscribe(res=>{
         this.AllRectSourceType = res
         this.FilteredAllRectSourceType = res
        })
      }
  }


  onBookChange(event: MatSelectChange): void {
    this.purchasesServicesService.getAllMsTerms(event.value).subscribe(res=>{
     if(res.length > 0){
      this.AllTerms = res
      this.salesInvoiceForm.get('termId')?.setValue(this.AllTerms[0].termId)
     }
    })
  }

  AddItemToPurchaseInvoice(){
    var _popup = this.dialog.open(AddItemsToSalesInvoiceComponent, {
      width: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'أضافه صنف',
      },
    });
    _popup.afterClosed().subscribe((response) => {
        if (response) {
          for (let i = 0; i < response.length; i++) {
            let item = response[i];
            let exists = this.itemCollections.some(existingItem => existingItem.itemCardId === item.itemCardId);
            let existsInDataBase;
  
            if(this.itemCollectionFromDataBase.length != 0){
              existsInDataBase = this.itemCollectionFromDataBase.some(i=>i.subItemId === item.itemCardId)
            }
            
            if (!exists && !existsInDataBase) {
              
              this.itemCollections.push(item);
  
            }else{
              this.toastr.info(`هذا الصنف ${item.itemDescA} موجود من قبل`)
            }
          }
      }
    });
  }
 

  updateItemCollection(itemCollection:any){
    var _popup = this.dialog.open(UpdateItemComponent, {
      width: '90%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'تعديل',
        itemCollectionData : itemCollection,
      },
    });
    _popup.afterClosed().subscribe((response) => {
      if(response){
          this.itemCollections = this.itemCollections.filter(item => item.itemCardId !== itemCollection.itemCardId);
          this.itemCollections.push(response);
          this.toastr.success("تم التعديل بنجاح")
  
      }
    });
  }
  DeleteItemCollection(itemCardId:any){
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.itemCollections = this.itemCollections.filter(item => item.itemCardId !== itemCardId);
        this.toastr.success("تم المسح بنجاح")
      }
    });
  }


  updateItemCollectionFromDataBase(invoiceItem : any){
    var _popup = this.dialog.open(UpdateSalesInvoiceDetailsComponent, {
      width: '90%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'تعديل',
        itemCollectionData : invoiceItem,
      },
    });
    _popup.afterClosed().subscribe((response) => {
      if(response){
        this.salesService.getMsSalesInvoiceItems(this.salesInvoiceForm.value.invId).subscribe(res=>{
          this.itemCollectionFromDataBase = res
        })
  
      }
    });
  }
  
  DeleteItemCollectionFromDataBase(invItemCardId : any){
    
  }

  onCurrencyChange(event : MatSelectChange){
    const targetRate = this.AllCurrency.find(currency => currency.currencyId === event.value);
    this.salesInvoiceForm.get('rate')?.setValue(targetRate.rate);
  }

  getSalesEmployess(){
  this.salesService.getSalesEmployees().subscribe(res=>{
    this.AllSalesEmployess = res;
    this.FilteredAllSalesEmployess = res;
  })
  }


  Sales_HrEmployess_Searching(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchSalesEmployess(searchValue);
  }

  searchSalesEmployess(searchValue: string): void {
    if (!searchValue) {
      this.FilteredAllSalesEmployess = this.AllSalesEmployess;
      return;
    }

    this.FilteredAllSalesEmployess = this.AllSalesEmployess.filter((acc) =>
      acc.empCode.toString().includes(searchValue)
    );

    if (this.FilteredAllSalesEmployess.length === 0) {
      this.FilteredAllSalesEmployess = this.AllSalesEmployess.filter((acc) =>
        acc.name1.toString().includes(searchValue)
      );
    }

    if (this.FilteredAllSalesEmployess.length > 0) {
      this.salesInvoiceForm.get('empId')?.setValue(this.FilteredAllSalesEmployess[0].empId);
    }
  }


  
}
