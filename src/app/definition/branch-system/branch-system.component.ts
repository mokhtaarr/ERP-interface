import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { Branches, partition } from '../definition-models/Branches';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PartitionPopupComponent } from '../partition-popup/partition-popup.component';
import { Title } from 'chart.js';
import { AddPartitionPopupComponent } from '../add-partition-popup/add-partition-popup.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { last } from 'rxjs';

@Component({
  selector: 'app-branch-system',
  templateUrl: './branch-system.component.html',
  styleUrls: ['./branch-system.component.scss'],
})
export class BranchSystemComponent implements OnInit {
  AllBranches: any[] = [];
  branches_button: Branches[] = [];
  branch!: Branches;
  readonly_field: boolean = false;
  Disabled_field: boolean = true;
  Disable_button: boolean = true;
  getStoreId: number = 0;
  hidden_row: boolean = false;
  StoreId_for_DeletedPartition: number = 0;
  Disable_right_button: boolean = false;
  Disable_Left_button: boolean = false;
  EditDisable : boolean = true;
  SaveDisable : boolean = true;
  DeleteDisable : boolean = true;
  reloadDisabled : boolean = false;
  UndoDisabled : boolean = true;
  firstRow: boolean = false;
  lastRow: boolean = false;
  undoIndex!: number;

  AllPartition: partition[] = [];
  selectedBranchId: any;

  disableAddPartition : boolean = false;
  allBoxBanks:any[] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'partCode',
    'partDescA',
    'partDescE',
    'edit',
    'delete',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private definitionService: DefinitionService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.branchForm.disable();
    this.getAllBranches();
    this.updateDisabledState();
    this.GetAllBoxBankForBranches();
  }

  branchForm = this.fb.group({
    storeId: [0],
    storeCode: ['', Validators.required],
    storeDescA: ['', Validators.required],
    storeDescE: [''],
    tel: [''],
    boxId:[],
    storeType: [false],
  });

  updateDisabledState() {
    if (this.Disabled_field) {
      this.branchForm.disable();
    } else {
      this.branchForm.enable();
    }
  }

  getAllBranches() {
    this.definitionService.getAllBranches().subscribe(data => {
      this.AllBranches = data;
      const firstBranch = this.AllBranches[0];
      if(firstBranch){
       this.getPartition_of_StoreId(firstBranch.storeId);
       this.getBranch(firstBranch.storeId);
       this.selectedBranchId = firstBranch.storeId;
      }
    });
  }

  GetAllBoxBankForBranches(){
    this.definitionService.GetAllBoxBankForBranches().subscribe(res=>{
      this.allBoxBanks = res;
    })
  }

  getBranch(storeId: number) {
    this.readonly_field = true;
    this.definitionService.getBranch(storeId).subscribe(res => {
      this.branchForm.setValue({
        storeId: res.storeId,
        storeCode: res.storeCode,
        storeDescA: res.storeDescA,
        storeDescE: res.storeDescE ?? '',
        tel:res.tel ?? '',
        boxId: res.boxId ?? null,
        storeType: res.storeType ?? false,
      });
    });

    this.EditDisable = false;
    this.SaveDisable = true;
    this.DeleteDisable = false;

  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  getPartition_of_StoreId(storeId: number) {
    this.definitionService
      .getAllPartition_of_storeId(storeId)
      .subscribe((data: partition[]) => {
        this.AllPartition = data;
        this.dataSource = new MatTableDataSource<partition>(this.AllPartition);

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });

    this.StoreId_for_DeletedPartition = storeId;
    this.branchForm.get('storeId')?.setValue(storeId);
  }

  open_AddPartition_Popup() {
    var _popup = this.dialog.open(AddPartitionPopupComponent, {
      width: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'إضافة مخزن',
        branches: this.AllBranches,
        storeId : this.branchForm.value.storeId
      },
    });

    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.getBranch(response);
        this.getPartition_of_StoreId(response);
        this.selectedBranchId = response;
      }
    });
  }

  Openpopup(Code: any, Title: any) {
    var _popup = this.dialog.open(PartitionPopupComponent, {
      width: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: Title,
        branches: this.AllBranches,
        partCode: Code,
      },
    });

    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.getBranch(response);
        this.getPartition_of_StoreId(response);
        this.selectedBranchId = response;
      }
    });
  }

  Update_Partition(partCode: string) {
    this.Openpopup(partCode, 'تعديل  بيانات المخزن');
  }

  New() {
    this.Disabled_field = false;
    this.readonly_field = false;
    this.undoIndex = this.AllBranches.findIndex(p=>p.storeId == this.branchForm.value.storeId);

    this.branchForm.setValue({
      storeId: null,
      storeCode: null,
      storeDescA: null,
      storeDescE: null,
      tel: null,
      boxId: null,
      storeType: null,
    });
    this.updateDisabledState();

    this.Disable_Left_button = true;
    this.Disable_right_button = true;
    this.lastRow = true;
    this.firstRow = true;
    this.EditDisable = true;
    this.SaveDisable = false;
    this.readonly_field = false;
    this.reloadDisabled = true;
    this.DeleteDisable = true;
    this.UndoDisabled = false;
    this.disableAddPartition = true;
    this.AllPartition = []
  }

  onSumbit() {
    console.log(this.branchForm.value);
    
    this.definitionService.AddBranch(this.branchForm.value).subscribe(res=>{
      if(res.status){
       
        this.definitionService.getAllBranches().subscribe((data: Branches[]) => {
          this.AllBranches = data;
        });

        this.Disable_Left_button = false;
        this.Disable_right_button = false;
        this.lastRow = false;
        this.firstRow = false;
        this.SaveDisable=true;
        this.EditDisable = false;
        this.UndoDisabled = true;
        this.branchForm.disable();
        this.branchForm.get('storeId')?.setValue(res.id);
        this.selectedBranchId = this.branchForm.value.storeId;
        this.getPartition_of_StoreId(res.id);
        this.getBranch(res.id)
        this.disableAddPartition = false;
      }
    });
  }

  // updateBranch() {
  //   this.definitionService
  //     .UpdateBranch(this.branchForm.value)
  //     .subscribe((res) => {
  //       this.getAllBranches();
  //     });
  // }

  updateBranch(){
    this.branchForm.enable();
    this.DeleteDisable = true;
    this.Disable_right_button = true;
    this.Disable_Left_button = true;
    this.lastRow = true;
    this.firstRow = true;
    this.SaveDisable = false;
    this.readonly_field = true;
    this.reloadDisabled = false;
    this.EditDisable = true;
    this.UndoDisabled = false;
    this.disableAddPartition = true;
    this.undoIndex = this.AllBranches.findIndex(p=>p.storeId == this.branchForm.value.storeId);
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
        this.getStoreId = this.branchForm.value.storeId ?? 0;
        if (this.getStoreId != 0)
          this.definitionService
            .DeleteBranch(this.getStoreId)
            .subscribe((res) => {

              this.definitionService.getAllBranches().subscribe((data: Branches[]) => {
                this.AllBranches = data;});
              
                this.disableAddPartition = true;
              
              this.branchForm.setValue({
                storeId: null,
                storeCode: null,
                storeDescA: null,
                storeDescE: null,
                tel: null,
                boxId: null,
                storeType: null,
              });
            });
      }
    });
  }

  open_delete_partition_confirm(partCode: string) {
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
        if (partCode.length != 0)
          this.definitionService.DeletePartition(partCode).subscribe((res) => {
            this.definitionService.getAllBranches().subscribe((data: Branches[]) => {
              this.AllBranches = data;})
              
              const row = this.dataSource.data.find(
              (item: any) => item.partCode === partCode
            );
            if (row) {
              row.isHidden = true; // Set isHidden to true to hide the row
            }
          });
      }
    });
  }

  getLastBranch() {
    const LastBranch = this.AllBranches[this.AllBranches.length - 1];
    if (LastBranch) {
      this.branchForm.setValue({
        storeId: LastBranch.storeId,
        storeCode: LastBranch.storeCode,
        storeDescA: LastBranch.storeDescA,
        storeDescE: LastBranch.storeDescE ?? '',
        tel: LastBranch.tel ?? '',
        boxId: LastBranch.boxId ?? null,
        storeType: LastBranch.storeType ?? false,
      });

      this.selectedBranchId = LastBranch.storeId;

      this.getPartition_of_StoreId(LastBranch.storeId);
      this.Disable_Left_button = false ;
      this.Disable_right_button = true ;

      this.EditDisable = false;
      this.DeleteDisable = false;
      this.firstRow = false;
      this.lastRow = true;

      this.disableAddPartition = false;

      this.DeleteDisable = false;
  
    }
  }

  getFirstBranch() {
    const firstBranch = this.AllBranches[0];
    if (firstBranch) {
      this.branchForm.setValue({
        storeId: firstBranch.storeId,
        storeCode: firstBranch.storeCode,
        storeDescA: firstBranch.storeDescA,
        storeDescE: firstBranch.storeDescE ?? '',
        tel: firstBranch.tel ?? '',
        boxId: firstBranch.boxId ?? null,
        storeType: firstBranch.storeType ?? false,
      });

      this.selectedBranchId = firstBranch.storeId;

      this.getPartition_of_StoreId(firstBranch.storeId);

      this.disableAddPartition = false;

      this.Disable_Left_button = true ;
      this.Disable_right_button = false;

      this.EditDisable = false;
      this.DeleteDisable = false;

      this.firstRow = true;
      this.lastRow = false;
   
  
    }
  }

  getNextBranch() {
    const index = this.AllBranches.findIndex(
      (p) => p.storeId == this.branchForm.value.storeId
    );
    const nextItem = this.AllBranches[index + 1];
    if (nextItem) {
      this.branchForm.setValue({
        storeId: nextItem.storeId,
        storeCode: nextItem.storeCode,
        storeDescA: nextItem.storeDescA,
        storeDescE: nextItem.storeDescE ?? '',
        tel: nextItem.tel ?? '',
        boxId: nextItem.boxId ?? null,
        storeType: nextItem.storeType ?? false,
      });

      
      this.disableAddPartition = false;

      this.selectedBranchId = nextItem.storeId;

      this.getPartition_of_StoreId(nextItem.storeId);

      this.Disable_Left_button = false;
      this.firstRow = false;
      this.EditDisable = false;
      this.DeleteDisable = false;

      const Last_index = this.AllBranches.findIndex(
        (p) => p.storeId == this.branchForm.value.storeId
      );
  
      if (Last_index === this.AllBranches.length - 1) {
        this.Disable_right_button = true;
        this.lastRow = true;
      }

  
    }

    
  }

  getPrevBranch() {
    const index = this.AllBranches.findIndex(
      (p) => p.storeId == this.branchForm.value.storeId
    );


    if (index === 0) {
      this.Disable_Left_button = true;
      this.firstRow = true;
    }


    const prevItem = this.AllBranches[index - 1];
    if (prevItem) {
      this.branchForm.setValue({
        storeId: prevItem.storeId,
        storeCode: prevItem.storeCode,
        storeDescA: prevItem.storeDescA,
        storeDescE: prevItem.storeDescE ?? '',
        tel: prevItem.tel ?? '',
        boxId: prevItem.boxId ?? null,
        storeType: prevItem.storeType ?? false,
      });

      this.disableAddPartition = false;


      this.selectedBranchId = prevItem.storeId;

      this.firstRow = false;
      this.lastRow = false;
      this.EditDisable = false;
      this.DeleteDisable = false;

      this.getPartition_of_StoreId(prevItem.storeId);

      this.Disable_right_button = false;
      const first_index = this.AllBranches.findIndex(
        (p) => p.storeId == this.branchForm.value.storeId
      );

      if (first_index === 0) {
        this.Disable_Left_button = true;
        this.firstRow = true;
      }

      
    }
  }

  undo(){
    this.branchForm.disable();
    this.disableAddPartition = false
    if(this.undoIndex != -1){
      const undoItem = this.AllBranches[this.undoIndex]

      if(undoItem){
       this.branchForm.setValue({
         storeId: undoItem.storeId,
         storeCode: undoItem.storeCode,
         storeDescA: undoItem.storeDescA,
         storeDescE: undoItem.storeDescE ?? '',
         tel: undoItem.tel ?? '',
         boxId: undoItem.boxId ?? null,
         storeType: undoItem.storeType ?? false
       })

       this.disableAddPartition = false;

       this.selectedBranchId = undoItem.storeId;
       
       this.getPartition_of_StoreId(undoItem.storeId)
     }

     this.EditDisable = false;
     this.Disable_right_button = false;
     this.Disable_Left_button = false;
     this.lastRow = false;
     this.firstRow = false;
     this.reloadDisabled = false;
     this.SaveDisable = true;
     this.UndoDisabled = true;
     this.DeleteDisable = false;
    }
  }
}
