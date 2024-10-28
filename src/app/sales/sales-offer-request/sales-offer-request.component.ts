import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';
import { PurchasesServicesService } from 'src/app/purchases/purchases-services.service';
import { UpdateItemComponent } from 'src/app/purchases/update-item/update-item.component';
import { AddItemsToSalesInvoiceComponent } from '../add-items-to-sales-invoice/add-items-to-sales-invoice.component';
import { SalesService } from '../sales.service';
import { UpdateSalesOrderDetailComponent } from '../update-sales-order-detail/update-sales-order-detail.component';
import { UpdateSalesOfferItemRequestComponent } from '../update-sales-offer-item-request/update-sales-offer-item-request.component';

@Component({
  selector: 'app-sales-offer-request',
  templateUrl: './sales-offer-request.component.html',
  styleUrls: ['./sales-offer-request.component.scss']
})
export class SalesOfferRequestComponent implements OnInit {
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

  AllSalesOrder:any[] = [];
  
  readonlyTable: boolean = true;
  newDisable: boolean = false;

  trnoReadonly : boolean = false;
  AllTerms : any[] = [];
  AllSalesEmployess : any[] = [];

  addItemDisable : boolean = true;
  invoiceItemsData : any;
  AddItemsDisable : boolean = true;
  trnoReadonly2 : boolean = true;
  FilteredAllSalesEmployess : any[] = [];
  AllCustomers : any[] = [];
  FilteredAllCustomers : any[] = [];

  constructor(private purchasesServicesService: PurchasesServicesService , private fb:FormBuilder,private dialog: MatDialog,
    public toastr: ToastrService, public accountService : AccountService,private salesService : SalesService ){
  }

  salesOfferRequestForm = this.fb.group({
    salesOfferReqId:[0],
    trNo:[],
    bookId:[,Validators.required],
    trDate: [new Date()],
    termId:[],
    rectSourceType : [0],
    customerId:[,Validators.required],
    currencyId:[],
    manualTrNo:[''],
    aid:[],
    invDueDate:[],
    storeId:[''],
    CreatedBy:[''],
    invoiceItem :[[]],
    rate : [],
    empId : [],
    addField3 :['']
  })

  ngOnInit(): void {
    this.salesOfferRequestForm.disable();
    this.getAllSysBooks();
    this.GetAllCurrency();
    this.GetAllSysAnalyticalCodes();
    this.GetAllSalesOfferRequest();
    this.getSalesEmployess();
    this.getAllCustomers();
  }

  GetAllSalesOfferRequest(){
    this.salesService.GetAllSalesOfferRequest().subscribe(res=>{
      this.AllSalesOrder = res;
    })
  }

  getAllCustomers(){
    this.salesService.getAllCustomers().subscribe(res=>{
      this.AllCustomers = res;
      this.FilteredAllCustomers = res;
    })
  }

  getAllSysBooks(){
    this.salesService.getAllBooksForSalesOfferRequest().subscribe(res=>{
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
      this.salesOfferRequestForm.get('CreatedBy')?.setValue(res!.userId)
      this.salesOfferRequestForm.get('storeId')?.setValue(res!.storeId)
      })
  }
  

  onSumbit() {
    this.invoiceItemsData = this.itemCollections;

    if(this.invoiceItemsData != null){
      this.salesOfferRequestForm.get("invoiceItem")?.setValue(this.invoiceItemsData)
    }

   this.salesService.AddMsSalesOfferRequest(this.salesOfferRequestForm.value).subscribe(res=>{
    if(res.status){
      this.GetAllSalesOfferRequest();
      this.salesOfferRequestForm.disable();
      this.salesOfferRequestForm.get('salesOfferReqId')?.setValue(res.id);
      this.DisabledNextButton = false;
      this.DisabledPrevButton = false;
      this.lastRow = false;
      this.firstRow = false;
      this.SaveDisable=true;
      this.UpdateDisable = false;
      this.UndoDisabled = true;
      this.DeleteDisable=false;
      this.readonlyTable = true;
      this.AddItemsDisable = true;
      
    }
   })
  }

  getLastRowData(){
    const LastItem = this.AllSalesOrder[this.AllSalesOrder.length - 1];
    if (this.AllSalesOrder.length > 0) {
      this.salesOfferRequestForm.setValue({
        salesOfferReqId: LastItem.salesOfferReqId,
        trNo: LastItem.trNo ?? null,
        bookId: LastItem.bookId,
        trDate: LastItem.trDate,
        termId: LastItem.termId,
        rectSourceType: LastItem.rectSourceType,
        customerId: LastItem.customerId,
        currencyId: LastItem.currencyId,
        manualTrNo: LastItem.manualTrNo,
        aid: LastItem.aid,
        invDueDate: LastItem.invDueDate,
        rate : LastItem.rate,
        empId : LastItem.empId,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null,
        addField3 : LastItem.addField3
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.salesService.getMsSalesOfferRequestItems(this.salesOfferRequestForm.value.salesOfferReqId).subscribe(res=>{
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
    const index = this.AllSalesOrder.findIndex(
      (p) => p.salesOfferReqId == this.salesOfferRequestForm.value.salesOfferReqId
    );

    const nextItem = this.AllSalesOrder[index + 1];

    if (this.AllSalesOrder.length > 0) {
      this.salesOfferRequestForm.setValue({
        salesOfferReqId: nextItem.salesOfferReqId,
        trNo: nextItem.trNo ?? null,
        bookId: nextItem.bookId,
        trDate: nextItem.trDate,
        termId: nextItem.termId,
        rectSourceType: nextItem.rectSourceType,
        customerId: nextItem.customerId,
        currencyId: nextItem.currencyId,
        manualTrNo: nextItem.manualTrNo,
        aid: nextItem.aid,
        invDueDate: nextItem.invDueDate,
        rate: nextItem.rate,
        empId: nextItem.empId,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null,
        addField3: nextItem.addField3
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      
     
      this.salesService.getMsSalesOfferRequestItems(this.salesOfferRequestForm.value.salesOfferReqId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;

      const LastItem = this.AllSalesOrder.findIndex(
        (p) => p.salesOfferReqId == this.salesOfferRequestForm.value.salesOfferReqId
      );

      if (this.AllSalesOrder.length - 1 === LastItem) {
        this.DisabledNextButton = true;
        this.lastRow = true;
      }

      this.DisabledPrevButton = false;
    }

  }

  Open_delete_confirm(){

  }

  getPrevRowData(){
    const index = this.AllSalesOrder.findIndex(
      (p) => p.salesOfferReqId == this.salesOfferRequestForm.value.salesOfferReqId
    );

    if (index === 0 || index === -1) {
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }

    const PrevItem = this.AllSalesOrder[index - 1];

    if (this.AllSalesOrder.length > 0) {
      this.salesOfferRequestForm.setValue({
        salesOfferReqId: PrevItem.salesOfferReqId,
        trNo: PrevItem.trNo ?? null,
        bookId: PrevItem.bookId,
        trDate: PrevItem.trDate,
        termId: PrevItem.termId,
        rectSourceType: PrevItem.rectSourceType,
        customerId: PrevItem.customerId,
        currencyId: PrevItem.currencyId,
        manualTrNo: PrevItem.manualTrNo,
        aid: PrevItem.aid,
        invDueDate: PrevItem.invDueDate,
        rate : PrevItem.rate,
        empId : PrevItem.empId,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null,
        addField3: PrevItem.addField3
      });

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      
      this.salesService.getMsSalesOfferRequestItems(this.salesOfferRequestForm.value.salesOfferReqId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;


      const firstItem = this.AllSalesOrder.findIndex(
        (p) => p.salesOfferReqId == this.salesOfferRequestForm.value.salesOfferReqId
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

    const FirstItem = this.AllSalesOrder[0];

    if (this.AllSalesOrder.length > 0) {
      this.salesOfferRequestForm.setValue({
        salesOfferReqId: FirstItem.salesOfferReqId,
        trNo:FirstItem.trNo ?? null,
        bookId: FirstItem.bookId,
        trDate: FirstItem.trDate,
        termId: FirstItem.termId,
        rectSourceType: FirstItem.rectSourceType,
        customerId: FirstItem.customerId,
        currencyId: FirstItem.currencyId,
        manualTrNo: FirstItem.manualTrNo,
        aid: FirstItem.aid,
        invDueDate: FirstItem.invDueDate,
        rate : FirstItem.rate,
        empId : FirstItem.empId,
        storeId: null,
        CreatedBy: null,
        invoiceItem: null,
        addField3: FirstItem.addField3
      });
      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.salesService.getMsSalesOfferRequestItems(this.salesOfferRequestForm.value.salesOfferReqId).subscribe(res=>{
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
    this.salesOfferRequestForm.disable();
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
      const undoItem = this.AllSalesOrder[this.undoIndex];

      if (undoItem.salesOfferReqId > 0) {
        this.DeleteDisable = false;
        this.UpdateDisable = false;
        this.salesOfferRequestForm.setValue({
          salesOfferReqId: undoItem.salesOfferReqId,
          trNo: undoItem.trNo ?? null,
          bookId: undoItem.bookId,
          trDate: undoItem.trDate,
          termId: undoItem.termId,
          rectSourceType: undoItem.rectSourceType,
          customerId: undoItem.customerId,
          currencyId: undoItem.currencyId,
          manualTrNo: undoItem.manualTrNo,
          aid: undoItem.aid,
          invDueDate: undoItem.invDueDate,
          rate: undoItem.rate,
          empId: undoItem.empId,
          storeId: null,
          CreatedBy: null,
          invoiceItem: null,
          addField3: undoItem.addField3
        });

        
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.salesService.getMsSalesOfferRequestItems(this.salesOfferRequestForm.value.salesOfferReqId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      }
    }
  }

  updatePurchaseInvoice(){
    this.getUserInfo();
    this.trnoReadonly = true;
    this.salesOfferRequestForm.enable();
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
    this.undoIndex = this.AllSalesOrder.findIndex(p=>p.salesOfferReqId == this.salesOfferRequestForm.value.salesOfferReqId);
    this.readonlyTable = false;
    this.AddItemsDisable = false;

  }

  New(){
    this.salesOfferRequestForm.enable();
    this.readonlyTable = false;
    this.newDisable = true;
    this.itemCollections = [];
    this.itemCollectionFromDataBase = [];
    this.AddItemsDisable = false;

    this.undoIndex = this.AllSalesOrder.findIndex(
      (p) => p.salesOfferReqId == this.salesOfferRequestForm.value.salesOfferReqId
    );

    this.salesOfferRequestForm.setValue({
      salesOfferReqId: 0,
      trNo: null,
      bookId: null,
      trDate: null,
      termId: null,
      rectSourceType: 2,
      customerId: null,
      currencyId: null,
      manualTrNo: null,
      aid: null,
      rate: null,
      invDueDate: null,
      storeId: null,
      CreatedBy: null,
      empId: null,
      invoiceItem: null,
      addField3: null
    });

    this.salesService.getCurrentTime().subscribe(res=>{
      this.salesOfferRequestForm.get('trDate')?.setValue(res.currentDateTime);
      this.salesOfferRequestForm.get('invDueDate')?.setValue(res.currentDateTime);
    })

    this.getUserInfo();

    this.trnoReadonly = true;

    this.salesOfferRequestForm.get('termId')?.setValue(this.AllTerms[0]?.termId);
    this.salesOfferRequestForm.get('bookId')?.setValue(this.AllSysBooks[0]?.bookId);

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
    this.searchCustomer(searchValue);
  }

  searchCustomer(searchValue: string): void {
    if (!searchValue) {
      this.FilteredAllCustomers = this.AllCustomers;
      return;
    }

    this.FilteredAllCustomers = this.AllCustomers.filter((acc) =>
      acc.customerCode.toString().includes(searchValue)
    );

    if (this.FilteredAllCustomers.length === 0) {
      this.FilteredAllCustomers = this.AllCustomers.filter((acc) =>
        acc.customerDescA.toString().includes(searchValue)
      );
    }

    if (this.FilteredAllCustomers.length > 0) {
      this.salesOfferRequestForm.get('customerId')?.setValue(this.FilteredAllCustomers[0].customerId);

      this.salesOfferRequestForm.get('currencyId')?.setValue(this.FilteredAllCustomers[0].currencyId);
      const targetRate = this.AllCurrency.find(currency => currency.currencyId === this.FilteredAllCustomers[0].currencyId);
      this.salesOfferRequestForm.get('rate')?.setValue(targetRate.rate);

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
    // this.salesOfferRequestForm.get('currencyId')?.setValue(selectedVendor.currencyId);
  }

  GetAllSysAnalyticalCodes(){
    this.purchasesServicesService.GetAllSysAnalyticalCodes().subscribe(res=>{
      this.AllAnalyticalCode = res;
    })
  }







  onBookChange(event: MatSelectChange): void {
    this.purchasesServicesService.getAllMsTerms(event.value).subscribe(res=>{
     if(res.length > 0){
      this.AllTerms = res
      this.salesOfferRequestForm.get('termId')?.setValue(this.AllTerms[0].termId)
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
    var _popup = this.dialog.open(UpdateSalesOfferItemRequestComponent, {
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
        this.salesService.getMsSalesOfferRequestItems(this.salesOfferRequestForm.value.salesOfferReqId).subscribe(res=>{
          this.itemCollectionFromDataBase = res
        })
  
      }
    });
  }
  
  DeleteItemCollectionFromDataBase(invItemCardId : any){
    
  }

  onCurrencyChange(event : MatSelectChange){
    const targetRate = this.AllCurrency.find(currency => currency.currencyId === event.value);
    this.salesOfferRequestForm.get('rate')?.setValue(targetRate.rate);
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
      this.salesOfferRequestForm.get('empId')?.setValue(this.FilteredAllSalesEmployess[0].empId);
    }
  }


  
}
