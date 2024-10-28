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

@Component({
  selector: 'app-sale-order',
  templateUrl: './sale-order.component.html',
  styleUrls: ['./sale-order.component.scss']
})
export class SaleOrderComponent implements OnInit {
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

  salesOrderForm = this.fb.group({
    salesOrderId:[0],
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
    this.salesOrderForm.disable();
    this.getAllSysBooks();
    this.GetAllCurrency();
    this.GetAllSysAnalyticalCodes();
    this.GetAllSalesOrder();
    this.getSalesEmployess();
    this.getAllCustomers();
  }

  GetAllSalesOrder(){
    this.salesService.GetAllSalesOrder().subscribe(res=>{
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
    this.salesService.getAllBooksForSalesOrder().subscribe(res=>{
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
      this.salesOrderForm.get('CreatedBy')?.setValue(res!.userId)
      this.salesOrderForm.get('storeId')?.setValue(res!.storeId)
      })
  }
  

  onSumbit() {
    this.invoiceItemsData = this.itemCollections;

    if(this.invoiceItemsData != null){
      this.salesOrderForm.get("invoiceItem")?.setValue(this.invoiceItemsData)
    }

   this.salesService.AddMsSalesOrder(this.salesOrderForm.value).subscribe(res=>{
    if(res.status){
      this.GetAllSalesOrder();
      this.salesOrderForm.disable();
      this.salesOrderForm.get('salesOrderId')?.setValue(res.id);
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
    if (LastItem.salesOrderId > 0) {
      this.salesOrderForm.setValue({
        salesOrderId: LastItem.salesOrderId,
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

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.salesService.getMsSalesOrderItems(this.salesOrderForm.value.salesOrderId).subscribe(res=>{
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
      (p) => p.salesOrderId == this.salesOrderForm.value.salesOrderId
    );

    const nextItem = this.AllSalesOrder[index + 1];

    if (nextItem.salesOrderId > 0) {
      this.salesOrderForm.setValue({
        salesOrderId: nextItem.salesOrderId,
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
      
     
      this.salesService.getMsSalesOrderItems(this.salesOrderForm.value.salesOrderId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;

      const LastItem = this.AllSalesOrder.findIndex(
        (p) => p.salesOrderId == this.salesOrderForm.value.salesOrderId
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
      (p) => p.salesOrderId == this.salesOrderForm.value.salesOrderId
    );

    if (index === 0 || index === -1) {
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }

    const PrevItem = this.AllSalesOrder[index - 1];

    if (PrevItem.salesOrderId > 0) {
      this.salesOrderForm.setValue({
        salesOrderId: PrevItem.salesOrderId,
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

      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      
      this.salesService.getMsSalesOrderItems(this.salesOrderForm.value.salesOrderId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.trnoReadonly = false;


      const firstItem = this.AllSalesOrder.findIndex(
        (p) => p.salesOrderId == this.salesOrderForm.value.salesOrderId
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
    if (FirstItem.salesOrderId > 0) {
      this.salesOrderForm.setValue({
        salesOrderId: FirstItem.salesOrderId,
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
      
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.salesService.getMsSalesOrderItems(this.salesOrderForm.value.salesOrderId).subscribe(res=>{
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
    this.salesOrderForm.disable();
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

      if (undoItem.salesOrderId > 0) {
        this.DeleteDisable = false;
        this.UpdateDisable = false;
        this.salesOrderForm.setValue({
          salesOrderId: undoItem.salesOrderId,
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

        
      this.itemCollectionFromDataBase = []
      this.itemCollections = [];
      

      this.salesService.getMsSalesOrderItems(this.salesOrderForm.value.salesOrderId).subscribe(res=>{
        this.itemCollectionFromDataBase = res
      })


      }
    }
  }

  updatePurchaseInvoice(){
    this.getUserInfo();
    this.trnoReadonly = true;
    this.salesOrderForm.enable();
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
    this.undoIndex = this.AllSalesOrder.findIndex(p=>p.salesOrderId == this.salesOrderForm.value.salesOrderId);
    this.readonlyTable = false;
    this.AddItemsDisable = false;

  }

  New(){
    this.salesOrderForm.enable();
    this.readonlyTable = false;
    this.newDisable = true;
    this.itemCollections = [];
    this.itemCollectionFromDataBase = [];
    this.AddItemsDisable = false;

    this.undoIndex = this.AllSalesOrder.findIndex(
      (p) => p.salesOrderId == this.salesOrderForm.value.salesOrderId
    );

    this.salesOrderForm.setValue({
      salesOrderId: 0,
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
      this.salesOrderForm.get('trDate')?.setValue(res.currentDateTime);
      this.salesOrderForm.get('invDueDate')?.setValue(res.currentDateTime);
    })

    this.getUserInfo();

    this.trnoReadonly = true;

    this.salesOrderForm.get('termId')?.setValue(this.AllTerms[0]?.termId);
    this.salesOrderForm.get('bookId')?.setValue(this.AllSysBooks[0]?.bookId);

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
      this.salesOrderForm.get('customerId')?.setValue(this.FilteredAllCustomers[0].customerId);

      this.salesOrderForm.get('currencyId')?.setValue(this.FilteredAllCustomers[0].currencyId);
      const targetRate = this.AllCurrency.find(currency => currency.currencyId === this.FilteredAllCustomers[0].currencyId);
      this.salesOrderForm.get('rate')?.setValue(targetRate.rate);

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
    // this.salesOrderForm.get('currencyId')?.setValue(selectedVendor.currencyId);
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
      this.salesOrderForm.get('termId')?.setValue(this.AllTerms[0].termId)
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
    var _popup = this.dialog.open(UpdateSalesOrderDetailComponent, {
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
        this.salesService.getMsSalesOrderItems(this.salesOrderForm.value.salesOrderId).subscribe(res=>{
          this.itemCollectionFromDataBase = res
        })
  
      }
    });
  }
  
  DeleteItemCollectionFromDataBase(invItemCardId : any){
    
  }

  onCurrencyChange(event : MatSelectChange){
    const targetRate = this.AllCurrency.find(currency => currency.currencyId === event.value);
    this.salesOrderForm.get('rate')?.setValue(targetRate.rate);
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
      this.salesOrderForm.get('empId')?.setValue(this.FilteredAllSalesEmployess[0].empId);
    }
  }


  
}
