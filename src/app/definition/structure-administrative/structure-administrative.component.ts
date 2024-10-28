import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { noop } from 'rxjs';
import { ExampleFlatNode, ExampleFlatNode2, FoodNode } from 'src/app/shared/models/tree';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-structure-administrative',
  templateUrl: './structure-administrative.component.html',
  styleUrls: ['./structure-administrative.component.scss']
})

export class StructureAdministrativeComponent implements OnInit {

  dataSource: any;
  AllHrDepartment : any[] = [];

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      name: node.name,
      departMentId : node.departMentId,
      departCode : node.departCode,
      departName2: node.departName2,
      departTask:node.departTask,
      remarks : node.remarks,
      parentId : node.parentId
    };
  };


  treeControl = new FlatTreeControl<ExampleFlatNode2>(
    node => node.level,
    node => node.expandable,
    
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
    
  );


  DisabledPrevButton: boolean = false;
  DisabledNextButton: boolean = false;
  firstRow: boolean = false;
  lastRow: boolean = false;
  DeleteDisable :boolean = true;
  SaveDisable : boolean = true;
  UpdateDisable : boolean = true;
  newDisable:boolean = false;

  EditReadonly : boolean = false;
  reloadDisabled : boolean = false;
  UndoDisabled : boolean = true;
  undoIndex!: number; 
   DataFilter :any;

   @ViewChild('tree') tree !: MatTree<any>;

  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog ,
    public accountService : AccountService
  ){
   
  }
  ngOnInit(): void {
    this.HrDepartmentsForm.disable();
   this.getAllHrDepartments();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  HrDepartmentsForm = this.fb.group({
    departMentId : [],
    departCode:['',Validators.required],
    name:['',Validators.required],
    departName2:[''],
    departTask:[''],
    remarks:[''],
    parentId:[]
    
  });


  handleNodeClick(node:any){
    if(node){
      this.HrDepartmentsForm.setValue({
        departMentId: node.departMentId,
        departCode: node.departCode,
        name: node.name,
        departName2: node.departName2,
        departTask: node.departTask,
        remarks: node.remarks,
        parentId:node.parentId
      });
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
    }
  }


  onSmbit(){
    this.definitionService.AddHrDepartment(this.HrDepartmentsForm.value).subscribe(res=>{
      if(res){
        this.getAllHrDepartments();
        this.HrDepartmentsForm.disable();
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

  getAllHrDepartments(){
    this.definitionService.getAllHrDepartments().subscribe(res=>{
      this.AllHrDepartment = res;
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = this.AllHrDepartment;
      if (this.tree && this.tree.treeControl) {
        this.tree.treeControl.expandAll();
      }
    })
  }

  Filterchange(data: Event){
    const value = (data.target as HTMLInputElement).value;
    if (value.trim() === '') {
      this.dataSource.data = this.AllHrDepartment; 
    } else {
      this.DataFilter = this.AllHrDepartment
      .filter(i => i.name.includes(value));
      this.dataSource.data = this.DataFilter;
    }
  }



  getFirstRowData(){
    const FirstItem = this.AllHrDepartment[0];
      if(FirstItem){
     this.HrDepartmentsForm.setValue({
       departMentId: FirstItem.departMentId,
       departCode: FirstItem.departCode,
       name: FirstItem.name,
       departName2: FirstItem.departName2,
       departTask: FirstItem.departTask,
       remarks: FirstItem.remarks,
       parentId: FirstItem.parentId
     });
  
      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      }

  }

  getLastRowData(){
    const LastItem = this.AllHrDepartment[this.AllHrDepartment.length-1];
    if(LastItem){
      this.HrDepartmentsForm.setValue({
        departMentId: LastItem.departMentId,
        departCode: LastItem.departCode,
        name: LastItem.name,
        departName2: LastItem.departName2,
        departTask: LastItem.departTask,
        remarks: LastItem.remarks,
        parentId: LastItem.parentId
      });

    this.firstRow = false;
    this.lastRow = true;
    this.DisabledPrevButton = false;
    this.DisabledNextButton = true;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    }
  }

  getPrevRowData(){
      const index = this.AllHrDepartment.findIndex(p=>p.departMentId == this.HrDepartmentsForm.value.departMentId);
      const PrevItem = this.AllHrDepartment[index - 1];
      if(PrevItem){
        this.HrDepartmentsForm.setValue({
          departMentId: PrevItem.departMentId,
          departCode: PrevItem.departCode,
          name: PrevItem.name,
          departName2: PrevItem.departName2,
          departTask: PrevItem.departTask,
          remarks: PrevItem.remarks,
          parentId: PrevItem.parentId
        });

        this.firstRow = false;
        this.lastRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;
  
  
        const firstItem = this.AllHrDepartment.findIndex(p=>p.departMentId == this.HrDepartmentsForm.value.departMentId);
  
         if(firstItem === 0){
              this.DisabledPrevButton = true;
              this.firstRow = true;
         }
         
       
        this.DisabledNextButton = false;
  
      }
  }


  getNextRowData(){
      const index = this.AllHrDepartment.findIndex(p=>p.departMentId == this.HrDepartmentsForm.value.departMentId);
  
      const nextItem = this.AllHrDepartment[index + 1];
  
      if(nextItem){
        this.HrDepartmentsForm.setValue({
          departMentId: nextItem.departMentId,
          departCode: nextItem.departCode,
          name: nextItem.name,
          departName2: nextItem.departName2,
          departTask: nextItem.departTask,
          remarks: nextItem.remarks,
          parentId: nextItem.parentId
        });

        
        this.firstRow = false;
        this.UpdateDisable = false;
        this.DeleteDisable = false;

        const LastItem = this.AllHrDepartment.findIndex(p=>p.departMentId == this.HrDepartmentsForm.value.departMentId);
  
        if(this.AllHrDepartment.length -1 === LastItem){
          this.DisabledNextButton = true;
          this.lastRow = true;
  
        }
  
        this.DisabledPrevButton = false;
  
      }
  }


  Open_delete_confirm(){
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.definitionService.DeleteHrDepartment(this.HrDepartmentsForm.value.departMentId).subscribe(res=>{
          if(res){
            this.getAllHrDepartments();
            this.HrDepartmentsForm.setValue({
              departMentId: null,
              departCode: null,
              name: null,
              departName2: null,
              departTask: null,
              remarks: null,
              parentId: null
            })
            this.DeleteDisable = true;
            this.UpdateDisable = true;
          }
        })
           
      }
    });
  }

  undo(){
    this.HrDepartmentsForm.disable();
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.newDisable = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.SaveDisable = true;
    this.UndoDisabled = true;

    if(this.undoIndex != -1){
      const undoItem = this.AllHrDepartment[this.undoIndex]

      if(undoItem){
        this.HrDepartmentsForm.setValue({
          departMentId: undoItem.departMentId,
          departCode: undoItem.departCode,
          name: undoItem.name,
          departName2: undoItem.departName2,
          departTask: undoItem.departTask,
          remarks: undoItem.remarks,
          parentId: undoItem.parentId
        });

      this.UpdateDisable = false;
      this.DeleteDisable = false;
     }
    }
  }

  
  updateHrDepartment(){
    this.HrDepartmentsForm.enable();
    this.DeleteDisable = true;
    this.DisabledNextButton = true;
    this.DisabledPrevButton = true;
    this.newDisable = true;
    this.lastRow = true;
    this.firstRow = true;
    this.SaveDisable = false;
    this.EditReadonly = true;
    this.reloadDisabled = false;
    this.UpdateDisable = true;
    this.UndoDisabled = false;
    this.undoIndex = this.AllHrDepartment.findIndex(p=>p.departMentId == this.HrDepartmentsForm.value.departMentId);
  }
 
  
  New(){
    this.HrDepartmentsForm.enable();
    this.undoIndex = this.AllHrDepartment.findIndex(p=>p.departMentId == this.HrDepartmentsForm.value.departMentId);
   this.HrDepartmentsForm.setValue({
     departMentId: null,
     departCode: null,
     name: null,
     departName2: null,
     departTask: null,
     remarks: null,
     parentId: null
   })
  
    this.DisabledNextButton = true;
    this.DisabledPrevButton = true;
    this.newDisable = true;
    this.lastRow = true;
    this.firstRow = true;
    this.UpdateDisable = true;
    this.SaveDisable = false;
    this.EditReadonly = false;
    this.reloadDisabled = true;
    this.DeleteDisable = true;
    this.UndoDisabled = false;
  }
  

}
