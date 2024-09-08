import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-customer-categories',
  templateUrl: './customer-categories.component.html',
  styleUrls: ['./customer-categories.component.scss']
})
export class CustomerCategoriesComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] =
   ['customerCatId', 'catCode', 'catDescA', 'catDescE','remarks'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  customerCategory:any[] = [];

  readonlyTable : boolean = false;
  newDisable:boolean = false;

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
  undoIndex !: number


  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }
   

  ngOnInit(): void {
    this.CustomerCategoryForm.disable();
   this.getAllCustomerCategory();
  }

  getAllCustomerCategory(){
    this.definitionService.getAllCustomerCategory().subscribe(res=>{
      this.customerCategory = res;
      this.dataSource = new MatTableDataSource<any>(this.customerCategory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  CustomerCategoryForm = this.fb.group({
    customerCatId:[''],
    catCode:['',Validators.required],
    catDescA:['',Validators.required],
    catDescE:[''],
    remarks:[''],
    defaultDisc:[''],
    reportDiscValu:[''],
    discPercentOrVal:[''],
    isDiscountByItem:[''],
    isTaxExempted:[''],
    creditPeriod:[''],
    creditLimit:[''],
    isDealer:[''],
    salPrice:['']
  })

  fillForm(row:any){
    if(row){
      this.CustomerCategoryForm.setValue({
        customerCatId: row.customerCatId,
        catCode: row.catCode,
        catDescA: row.catDescA,
        catDescE: row.catDescE,
        remarks: row.remarks,
        defaultDisc: row.defaultDisc,
        reportDiscValu: row.reportDiscValu,
        discPercentOrVal: row.discPercentOrVal,
        isDiscountByItem: row.isDiscountByItem,
        isTaxExempted: row.isTaxExempted,
        creditPeriod: row.creditPeriod,
        creditLimit: row.creditLimit,
        salPrice: row.salPrice,
        isDealer: row.isDealer
      });

      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      window.scrollTo({ top: 30, behavior: 'smooth' });
    }
  }
  
  onSmbit() {
    this.definitionService.AddCustomerCategory(this.CustomerCategoryForm.value).subscribe(res=>{
      if(res){
        this.getAllCustomerCategory();
        this.CustomerCategoryForm.disable();
        this.CustomerCategoryForm.get('customerCatId')?.setValue(res.id)
        this.DisabledNextButton = false;
        this.DisabledPrevButton = false;
        this.lastRow = false;
        this.firstRow = false;
        this.SaveDisable=true;
        this.UpdateDisable = false;
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
          this.definitionService.DeleteCustomerCategory(this.CustomerCategoryForm.value.customerCatId).subscribe(res=>{
            if(res){
              this.getAllCustomerCategory();
              this.CustomerCategoryForm.setValue({
                customerCatId: null,
                catCode: null,
                catDescA: null,
                catDescE: null,
                remarks: null,
                defaultDisc: null,
                reportDiscValu: null,
                discPercentOrVal: null,
                isDiscountByItem: null,
                isTaxExempted: null,
                creditPeriod: null,
                creditLimit: null,
                isDealer: null,
                salPrice: null
              })

              this.DeleteDisable = true;
              this.UpdateDisable = true;
            }
          })
        }
      });
    }

    undo() {
      this.CustomerCategoryForm.disable();
      this.DisabledNextButton = false;
      this.DisabledPrevButton = false;
      this.lastRow = false;
      this.firstRow = false;
      this.reloadDisabled = false;
      this.SaveDisable = true;
      this.UndoDisabled = true;
      this.readonlyTable = false;
      this.newDisable = false;


      if(this.undoIndex != -1){
        const undoItem = this.customerCategory[this.undoIndex]

        if(undoItem){
          this.CustomerCategoryForm.setValue({
            customerCatId: undoItem.customerCatId,
            catCode: undoItem.catCode,
            catDescA: undoItem.catDescA,
            catDescE: undoItem.catDescE,
            remarks: undoItem.remarks,
            defaultDisc: undoItem.defaultDisc,
            reportDiscValu: undoItem.reportDiscValu,
            discPercentOrVal: undoItem.discPercentOrVal,
            isDiscountByItem: undoItem.isDiscountByItem,
            isTaxExempted: undoItem.isTaxExempted,
            creditPeriod: undoItem.creditPeriod,
            creditLimit: undoItem.creditLimit,
            isDealer: undoItem.isDealer,
            salPrice: undoItem.salPrice
          });
          this.DeleteDisable = false;
          this.UpdateDisable = false;
        
        } 
      }  
    }

    updateCustomerCategory() {
      this.CustomerCategoryForm.enable();
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
      this.customerCategory = this.dataSource.filteredData;
      this.undoIndex = this.customerCategory.findIndex(p=>p.customerCatId == this.CustomerCategoryForm.value.customerCatId);
    }


    New() {
      this.CustomerCategoryForm.enable();
      this.readonlyTable = true;
      this.newDisable = true;
      
      this.customerCategory = this.dataSource.filteredData;
     this.undoIndex = this.customerCategory.findIndex(p=>p.customerCatId == this.CustomerCategoryForm.value.customerCatId);

    this.CustomerCategoryForm.setValue({
      customerCatId: null,
      catCode: null,
      catDescA: null,
      catDescE: null,
      remarks: null,
      defaultDisc: null,
      reportDiscValu: null,
      discPercentOrVal: null,
      isDiscountByItem: null,
      isTaxExempted: null,
      creditPeriod: null,
      creditLimit: null,
      isDealer: null,
      salPrice: null
    });

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

    getNextRowData() {
      this.customerCategory = this.dataSource.filteredData;

      const index = this.customerCategory.findIndex(p=>p.customerCatId == this.CustomerCategoryForm.value.customerCatId);
  
      const nextItem = this.customerCategory[index + 1];
  
      if(nextItem){
        this.CustomerCategoryForm.setValue({
          customerCatId: nextItem.customerCatId,
          catCode: nextItem.catCode,
          catDescA: nextItem.catDescA,
          catDescE: nextItem.catDescE,
          remarks: nextItem.remarks,
          defaultDisc: nextItem.defaultDisc,
          reportDiscValu: nextItem.reportDiscValu,
          discPercentOrVal: nextItem.discPercentOrVal,
          isDiscountByItem: nextItem.isDiscountByItem,
          isTaxExempted: nextItem.isTaxExempted,
          creditPeriod: nextItem.creditPeriod,
          creditLimit: nextItem.creditLimit,
          isDealer: nextItem.isDealer,
          salPrice: nextItem.salPrice
        });   
        
        this.firstRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;

        const LastItem = this.customerCategory.findIndex(p=>p.customerCatId == this.CustomerCategoryForm.value.customerCatId);
  
        if(this.customerCategory.length -1 === LastItem){
          this.DisabledNextButton = true;
          this.lastRow = true;
  
        }
  
        this.DisabledPrevButton = false;
  
      }
    }


    getPrevRowData() {
      this.customerCategory = this.dataSource.filteredData;

    const index = this.customerCategory.findIndex(p=>p.customerCatId == this.CustomerCategoryForm.value.customerCatId);

    const PrevItem = this.customerCategory[index - 1];

    if(PrevItem){
      this.CustomerCategoryForm.setValue({
        customerCatId: PrevItem.customerCatId,
        catCode: PrevItem.catCode,
        catDescA: PrevItem.catDescA,
        catDescE: PrevItem.catDescE,
        remarks: PrevItem.remarks,
        defaultDisc: PrevItem.defaultDisc,
        reportDiscValu: PrevItem.reportDiscValu,
        discPercentOrVal: PrevItem.discPercentOrVal,
        isDiscountByItem: PrevItem.isDiscountByItem,
        isTaxExempted: PrevItem.isTaxExempted,
        creditPeriod: PrevItem.creditPeriod,
        creditLimit: PrevItem.creditLimit,
        isDealer: PrevItem.isDealer,
        salPrice: PrevItem.salPrice
      });   

      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;


      const firstItem = this.customerCategory.findIndex(p=>p.customerCatId == this.CustomerCategoryForm.value.customerCatId);

       if(firstItem === 0){
            this.DisabledPrevButton = true;
            this.firstRow = true;
       }
       
     
      this.DisabledNextButton = false;

    }
    }

    getLastRowData() {
      this.customerCategory = this.dataSource.filteredData
      const LastItem = this.customerCategory[this.customerCategory.length-1];
      if(LastItem){
      this.CustomerCategoryForm.setValue({
        customerCatId: LastItem.customerCatId,
        catCode: LastItem.catCode,
        catDescA: LastItem.catDescA,
        catDescE: LastItem.catDescE,
        remarks: LastItem.remarks,
        defaultDisc: LastItem.defaultDisc,
        reportDiscValu: LastItem.reportDiscValu,
        discPercentOrVal: LastItem.discPercentOrVal,
        isDiscountByItem: LastItem.isDiscountByItem,
        isTaxExempted: LastItem.isTaxExempted,
        creditPeriod: LastItem.creditPeriod,
        creditLimit: LastItem.creditLimit,
        isDealer: LastItem.isDealer,
        salPrice: LastItem.salPrice
      });   
  
      this.firstRow = false;
      this.lastRow = true;
      this.DisabledPrevButton = false;
      this.DisabledNextButton = true;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      }
    }

    getFirstRowData() {
      this.customerCategory = this.dataSource.filteredData
      const FirstItem = this.customerCategory[0];
        if(FirstItem){
        this.CustomerCategoryForm.setValue({
          customerCatId: FirstItem.customerCatId,
          catCode: FirstItem.catCode,
          catDescA: FirstItem.catDescA,
          catDescE: FirstItem.catDescE,
          remarks: FirstItem.remarks,
          defaultDisc: FirstItem.defaultDisc,
          reportDiscValu: FirstItem.reportDiscValu,
          discPercentOrVal: FirstItem.discPercentOrVal,
          isDiscountByItem: FirstItem.isDiscountByItem,
          isTaxExempted: FirstItem.isTaxExempted,
          creditPeriod: FirstItem.creditPeriod,
          creditLimit: FirstItem.creditLimit,
          isDealer: FirstItem.isDealer,
          salPrice: FirstItem.salPrice
        });   
    
        this.firstRow = true;
        this.lastRow = false;
        this.DisabledPrevButton = true;
        this.DisabledNextButton = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;

        }
    }
    
 
    Filterchange(data: Event) {
      const value = (data.target as HTMLInputElement).value;
      this.dataSource.filter = value;
    }
}

