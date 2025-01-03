import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-item-categories',
  templateUrl: './item-categories.component.html',
  styleUrls: ['./item-categories.component.scss']
})
export class ItemCategoriesComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['itemCategoryId', 'itemCatCode','itemCatDescA', 'itemCatDescE','Name_parentItemCategoryId','parentItemCategoryId','itemCategoryType'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllItemCategory : any[] = [];
  ItemCategorySelect : any[] = [];
  itemCategory_buttons : any[] = [];

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
  undoIndex !: number

  newDisable:boolean = false;



  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog,
    public accountService : AccountService){

  }

  ngOnInit(): void {
    this.itemCategoryForm.disable();
    this.getAllItemCategory();
  }

  itemCategoryForm = this.fb.group({
    itemCategoryId : [],
    itemCatCode :['',Validators.required],
    itemCatDescA :['',Validators.required],
    itemCatDescE:[''],
    parentItemCategoryId:[],
    itemCategoryType:[],
    remarks:[''],
    imagePath:['']
  })

  getAllItemCategory(){
    this.definitionService.GetAllItemCategory().subscribe(res=>{
      this.AllItemCategory = res;
      this.ItemCategorySelect = res;
      this.dataSource = new MatTableDataSource<any>(this.AllItemCategory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

   
  }

 

  fillForm(row:any){
    if(row){
      this.itemCategoryForm.setValue({
        itemCategoryId: row.itemCategoryId,
        itemCatCode: row.itemCatCode,
        itemCatDescA: row.itemCatDescA,
        itemCatDescE: row.itemCatDescE,
        parentItemCategoryId: row.parentItemCategoryId,
        itemCategoryType: row.itemCategoryType,
        remarks: row.remarks,
        imagePath : null
      });
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
      window.scrollTo({ top: 30, behavior: 'smooth' });

    }
  }

  New(){
    this.itemCategoryForm.enable();

    this.AllItemCategory = this.dataSource.filteredData;
    this.undoIndex = this.AllItemCategory.findIndex(p=>p.itemCategoryId == this.itemCategoryForm.value.itemCategoryId);

    this.itemCategoryForm.setValue({
      itemCategoryId: null,
      itemCatCode: null,
      itemCatDescA: null,
      itemCatDescE: null,
      parentItemCategoryId: null,
      itemCategoryType: null,
      remarks: null,
      imagePath: null
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
    this.newDisable = true;

  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  getFirstRowData(){
    this.itemCategory_buttons = this.dataSource.filteredData
    const FirstItem = this.itemCategory_buttons[0];

    this.itemCategoryForm.setValue({
      itemCategoryId: FirstItem.itemCategoryId,
      itemCatCode: FirstItem.itemCatCode,
      itemCatDescA: FirstItem.itemCatDescA,
      itemCatDescE: FirstItem.itemCatDescE,
      parentItemCategoryId: FirstItem.parentItemCategoryId,
      itemCategoryType: FirstItem.itemCategoryType,
      remarks: FirstItem.remarks,
      imagePath: null
    })   

    this.firstRow = true;
    this.lastRow = false;
    this.DisabledPrevButton = true;
    this.DisabledNextButton = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

  }

  getLastRowData(){
    this.itemCategory_buttons = this.dataSource.filteredData
    const LastItem = this.itemCategory_buttons[this.itemCategory_buttons.length-1];

    this.itemCategoryForm.setValue({
      itemCategoryId: LastItem.itemCategoryId,
      itemCatCode: LastItem.itemCatCode,
      itemCatDescA: LastItem.itemCatDescA,
      itemCatDescE: LastItem.itemCatDescE,
      parentItemCategoryId: LastItem.parentItemCategoryId,
      itemCategoryType: LastItem.itemCategoryType,
      remarks: LastItem.remarks,
      imagePath: null
    })   

    this.DeleteDisable = false;
    this.firstRow = false;
    this.lastRow = true;
    this.DisabledPrevButton = false;
    this.DisabledNextButton = true;
    this.UpdateDisable = false;

  }

  getNextRowData(){
    this.AllItemCategory = this.dataSource.filteredData;

    const index = this.AllItemCategory.findIndex(p=>p.itemCategoryId == this.itemCategoryForm.value.itemCategoryId);

    const nextItem = this.AllItemCategory[index + 1];

    if(nextItem){
      this.itemCategoryForm.setValue({
        itemCategoryId: nextItem.itemCategoryId,
        itemCatCode: nextItem.itemCatCode,
        itemCatDescA: nextItem.itemCatDescA,
        itemCatDescE: nextItem.itemCatDescE,
        parentItemCategoryId: nextItem.parentItemCategoryId,
        itemCategoryType: nextItem.itemCategoryType,
        remarks: nextItem.remarks,
        imagePath: null
      })
      
      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      const LastItem = this.AllItemCategory.findIndex(p=>p.itemCategoryId == this.itemCategoryForm.value.itemCategoryId);

      if(this.AllItemCategory.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;

      }

      this.DisabledPrevButton = false;

    }
  }

  getPrevRowData(){
    this.AllItemCategory = this.dataSource.filteredData;

    const index = this.AllItemCategory.findIndex(p=>p.itemCategoryId == this.itemCategoryForm.value.itemCategoryId);

    const PrevItem = this.AllItemCategory[index - 1];

    if(PrevItem){
      this.itemCategoryForm.setValue({
        itemCategoryId: PrevItem.itemCategoryId,
        itemCatCode: PrevItem.itemCatCode,
        itemCatDescA: PrevItem.itemCatDescA,
        itemCatDescE: PrevItem.itemCatDescE,
        parentItemCategoryId: PrevItem.parentItemCategoryId,
        itemCategoryType: PrevItem.itemCategoryType,
        remarks: PrevItem.remarks,
        imagePath: null
      })
      
      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;


      const firstItem = this.AllItemCategory.findIndex(p=>p.itemCategoryId == this.itemCategoryForm.value.itemCategoryId);

       if(firstItem === 0){
            this.DisabledPrevButton = true;
            this.firstRow = true;
       }
       
     
      this.DisabledNextButton = false;

    }
  }

  updateItemCategory(){
    this.itemCategoryForm.enable()
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
    this.newDisable = true;
    this.AllItemCategory = this.dataSource.filteredData;
    this.undoIndex = this.AllItemCategory.findIndex(p=>p.itemCategoryId == this.itemCategoryForm.value.itemCategoryId);
  }
 

  onSumbit(){
    this.definitionService.AddItemCategory(this.itemCategoryForm.value).subscribe(res=>{
      if(res){
        this.getAllItemCategory();
        this.itemCategoryForm.disable();
        this.DisabledNextButton = false;
        this.DisabledPrevButton = false;
        this.lastRow = false;
        this.firstRow = false;
        this.SaveDisable = true;
        this.UpdateDisable = false;
        this.UndoDisabled = true;
      }
    })
  }

  Open_delete_confirm() {
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      // data: {
      //   Title: Title,
      //   branches: this.AllBranches,
      //   partCode: Code,
      // },
    });

    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.definitionService.DeleteItemCategory(this.itemCategoryForm.value.itemCategoryId).subscribe(res=>{
          if(res){
            this.getAllItemCategory();
            this.itemCategoryForm.setValue({
              itemCategoryId: null,
              itemCatCode: null,
              itemCatDescA: null,
              itemCatDescE: null,
              parentItemCategoryId: null,
              itemCategoryType: null,
              remarks: null,
              imagePath: null
            })

            this.DeleteDisable = true;
            this.UpdateDisable = true;
          }
        })
      }
    });
  }

  undo(){
    this.itemCategoryForm.disable();
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.SaveDisable = true;
    this.UndoDisabled = true;
    this.newDisable = false;

    
    if(this.undoIndex != -1){
      const undoItem = this.AllItemCategory[this.undoIndex]
      if(undoItem){
        this.itemCategoryForm.setValue({
          itemCategoryId: undoItem.itemCategoryId,
          itemCatCode: undoItem.itemCatCode,
          itemCatDescA: undoItem.itemCatDescA,
          itemCatDescE: undoItem.itemCatDescE,
          parentItemCategoryId: undoItem.parentItemCategoryId,
          itemCategoryType: undoItem.itemCategoryType,
          remarks: undoItem.remarks,
          imagePath: null
        });
       
      }
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      }
  }

}

