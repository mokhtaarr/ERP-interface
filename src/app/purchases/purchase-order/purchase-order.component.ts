import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PurchasesServicesService } from '../purchases-services.service';
import { ToastrService } from 'ngx-toastr';
import { AddItemComponent } from '../add-item/add-item.component';
import { MatSelectChange } from '@angular/material/select';
import { UpdateItemComponent } from '../update-item/update-item.component';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent  implements OnInit {

  dataSource :any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
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

  AllSysBooks:any[] = [];
  AllVendor:any[] = [];
  FilteredAllVendors:any[]=[];
  AllCurrency: any[] = [];
  AllAnalyticalCode:any[] = [];

  itemCollections : any[] = [];
  itemCollectionFromDataBase : any[] = [];
  AddItemDisable : boolean = false;



  constructor(private purchasesServicesService: PurchasesServicesService , private fb:FormBuilder,private dialog: MatDialog,
    public toastr: ToastrService ){
  }


  ngOnInit(): void {
    this.getAllSysBooks();
    this.getAllVendor();
    this.GetAllCurrency();
    this.GetAllSysAnalyticalCodes();


    this.dataSource = new MatTableDataSource<any>(this.Table_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  }


  PurchaseOrderForm = this.fb.group({
  purOrderReqId:[],
   bookId:[],
   vendorId:[],
   currencyId:[],
   trDate:[],
   invoiceType:[],
   manualTrNo:[''],
   aid:[],
   arrivalDate:[],
   expiryDate:[],
   deliveryPeriodDays:[],
   payPeriodDays:[],
  })

  
Table_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

  GetAllPurchaseOrder(){

  }

  onSumbit(){

  }

  updatePurchaseOrder(){

  }


  New(){

  }


  getLastRowData(){

  }

  getNextRowData(){

  }

  getPrevRowData(){

  }

  getFirstRowData(){

  }

  Open_delete_confirm(){

  }

  undo(){

  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  
  fillForm(row:any){

  }

  getAllSysBooks(){
    this.purchasesServicesService.getAllBooks().subscribe(res=>{
      this.AllSysBooks = res
    })
  }

  getAllVendor(){
    this.purchasesServicesService.getAllVendor().subscribe(res=>{
      this.AllVendor = res;
      this.FilteredAllVendors = res;
    })
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchVendor(searchValue);
  }

  searchVendor(searchValue: string): void {
    if (!searchValue) {
      this.FilteredAllVendors = this.AllVendor;
      return;
    }

    this.FilteredAllVendors = this.AllVendor.filter((acc) =>
      acc.vendorCode.toString().includes(searchValue)
    );

    if (this.FilteredAllVendors.length === 0) {
      this.FilteredAllVendors = this.AllVendor.filter((acc) =>
        acc.vendorDescA.toString().includes(searchValue)
      );
    }

    if (this.FilteredAllVendors.length > 0) {
      this.PurchaseOrderForm.get('vendorId')?.setValue(
        this.FilteredAllVendors[0].vendorId
      );

      this.PurchaseOrderForm.get('currencyId')?.setValue(this.FilteredAllVendors[0].currencyId);

    }
  }

  GetAllCurrency() {
    this.purchasesServicesService.GetAllCurrency().subscribe((res) => {
      this.AllCurrency = res;
    });
  }

  GetAllSysAnalyticalCodes(){
    this.purchasesServicesService.GetAllSysAnalyticalCodes().subscribe(res=>{
      this.AllAnalyticalCode = res;
    })
  }

  onAccountSelect(event: MatSelectChange): void {
    const selectedVendor = this.FilteredAllVendors.find(
      (acc) => acc.vendorId === event.value);
    this.PurchaseOrderForm.get('currencyId')?.setValue(selectedVendor.currencyId);
  }

  OpenItemCollectionList(){
    var _popup = this.dialog.open(AddItemComponent, {
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
              this.AddItemDisable = true;
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
  

  
updateItemCollectionFromDataBase(itemCollection:any){
  // var _popup = this.dialog.open(UpdateItemCollectionFromDataBaseComponent, {
  //   width: '90%',
  //   enterAnimationDuration: '1000ms',
  //   exitAnimationDuration: '1000ms',
  //   data: {
  //     Title: 'تعديل صنف مجمع',
  //     itemCollectionData : itemCollection,
  //   },
  // });
  // _popup.afterClosed().subscribe((response) => {
  //   if(response){
  //    this.GetItemCollectionFromDataBase();
  //   }
  // });
}


DeleteItemCollection(itemCardId:any){
  // var _popup = this.dialog.open(DeleteConfirmComponent, {
  //   width: '30%',
  //   enterAnimationDuration: '1000ms',
  //   exitAnimationDuration: '1000ms',
  // });
  // _popup.afterClosed().subscribe((response) => {
  //   if (response) {
  //     this.itemCollections = this.itemCollections.filter(item => item.itemCardId !== itemCardId);
  //     this.toastr.success("تم المسح بنجاح")
  //   }
  // });
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


DeleteItemCollectionFromDataBase(itemCollectId:any){
  // var _popup = this.dialog.open(DeleteConfirmComponent, {
  //   width: '30%',
  //   enterAnimationDuration: '1000ms',
  //   exitAnimationDuration: '1000ms',
  // });
  // _popup.afterClosed().subscribe((response) => {
  //   if (response) {
  //    this.definitionService.DeleteItemCollection(itemCollectId).subscribe(res=>{
  //     if(res.status){
  //       this.GetItemCollectionFromDataBase();
  //     }
  //    })
  //   }
  // });
}



}
