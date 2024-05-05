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
  AllBranches: Branches[] = [];
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

  AllPartition: partition[] = [];
  selectedBranchId: any;

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
    this.getAllBranches();
    this.updateDisabledState();
  }

  branchForm = this.fb.group({
    storeId: [0],
    storeCode: ['', Validators.required],
    storeDescA: ['', Validators.required],
    storeDescE: ['', Validators.required],
    branch_offical: [''],
    phone: [''],
    Treasury: [''],
    branch_location: [''],
    main: [false],
  });

  updateDisabledState() {
    if (this.Disabled_field) {
      this.branchForm.disable();
      this.branchForm.get('storeCode')?.enable();
    } else {
      this.branchForm.enable();
    }
  }

  getAllBranches() {
    this.definitionService.getAllBranches().subscribe((data: Branches[]) => {
      this.AllBranches = data;
    });
  }

  getBranch(storeId: number) {
    this.branchForm.enable();
    this.readonly_field = true;
    this.definitionService.getBranch(storeId).subscribe((res: Branches) => {
      this.branchForm.setValue({
        storeId: res.storeId,
        storeCode: res.storeCode,
        storeDescA: res.storeDescA,
        storeDescE: res.storeDescE,
        branch_offical: '',
        phone: '',
        Treasury: '',
        branch_location: '',
        main: false,
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
  }

  open_AddPartition_Popup() {
    var _popup = this.dialog.open(AddPartitionPopupComponent, {
      width: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'إضافة مخزن',
        branches: this.AllBranches,
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
    this.branchForm.setValue({
      storeId: null,
      storeCode: null,
      storeDescA: null,
      storeDescE: null,
      branch_offical: null,
      phone: null,
      Treasury: null,
      branch_location: null,
      main: null,
    });
    this.updateDisabledState();
    this.SaveDisable = false;
    this.EditDisable = true;
    this.DeleteDisable = true;

  }

  onSumbit() {
    console.log(this.branchForm.value)
    this.definitionService.AddBranch(this.branchForm.value).subscribe(res=>{
      this.getAllBranches();

    });
  }

  updateBranch() {
    this.definitionService
      .UpdateBranch(this.branchForm.value)
      .subscribe((res) => {
        this.getAllBranches();
      });
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
              this.getAllBranches();
              this.branchForm.setValue({
                storeId: null,
                storeCode: null,
                storeDescA: null,
                storeDescE: null,
                branch_offical: null,
                phone: null,
                Treasury: null,
                branch_location: null,
                main: null,
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
            this.getAllBranches();
            const row = this.dataSource.data.find(
              (item: any) => item.partCode === partCode
            );
            if (row) {
              console.log(row.isHidden);
              row.isHidden = true; // Set isHidden to true to hide the row
            }
          });
      }
    });
  }

  getLastBranch() {
    const LastBranch = this.AllBranches[this.AllBranches.length - 1];
    if (LastBranch) {
      this.branchForm.enable();
      this.branchForm.setValue({
        storeId: LastBranch.storeId,
        storeCode: LastBranch.storeCode,
        storeDescA: LastBranch.storeDescA,
        storeDescE: LastBranch.storeDescE,
        branch_offical: null,
        phone: null,
        Treasury: null,
        branch_location: null,
        main: null,
      });

      this.getPartition_of_StoreId(LastBranch.storeId);
      this.Disable_Left_button = false ;
      this.Disable_right_button = true ;
      this.readonly_field = true;

      this.EditDisable = false;
      this.DeleteDisable = false;
      
    }
  }

  getFirstBranch() {
    const firstBranch = this.AllBranches[0];
    if (firstBranch) {
      this.branchForm.enable();
      this.branchForm.setValue({
        storeId: firstBranch.storeId,
        storeCode: firstBranch.storeCode,
        storeDescA: firstBranch.storeDescA,
        storeDescE: firstBranch.storeDescE,
        branch_offical: null,
        phone: null,
        Treasury: null,
        branch_location: null,
        main: null,
      });

      this.getPartition_of_StoreId(firstBranch.storeId);

      this.Disable_Left_button = true ;
      this.Disable_right_button = false;
      this.readonly_field = true;

      this.EditDisable = false;
      this.DeleteDisable = false;
    }
  }

  getNextBranch() {
    const index = this.AllBranches.findIndex(
      (p) => p.storeId == this.branchForm.value.storeId
    );
    const nextItem = this.AllBranches[index + 1];
    if (nextItem) {
      this.branchForm.enable();
      this.branchForm.setValue({
        storeId: nextItem.storeId,
        storeCode: nextItem.storeCode,
        storeDescA: nextItem.storeDescA,
        storeDescE: nextItem.storeDescE,
        branch_offical: null,
        phone: null,
        Treasury: null,
        branch_location: null,
        main: null,
      });

      this.getPartition_of_StoreId(nextItem.storeId);

      this.Disable_Left_button = false;
      this.readonly_field = true;


      const Last_index = this.AllBranches.findIndex(
        (p) => p.storeId == this.branchForm.value.storeId
      );
  
      if (Last_index === this.AllBranches.length - 1) {
        this.Disable_right_button = true;
      }

      this.EditDisable = false;
      this.DeleteDisable = false;
    }

    
  }

  getPrevBranch() {
    const index = this.AllBranches.findIndex(
      (p) => p.storeId == this.branchForm.value.storeId
    );
    const prevItem = this.AllBranches[index - 1];
    if (prevItem) {
      this.branchForm.enable();
      this.branchForm.setValue({
        storeId: prevItem.storeId,
        storeCode: prevItem.storeCode,
        storeDescA: prevItem.storeDescA,
        storeDescE: prevItem.storeDescE,
        branch_offical: null,
        phone: null,
        Treasury: null,
        branch_location: null,
        main: null,
      });

      this.readonly_field = true;

      this.getPartition_of_StoreId(prevItem.storeId);

      this.Disable_right_button = false;
      const first_index = this.AllBranches.findIndex(
        (p) => p.storeId == this.branchForm.value.storeId
      );

      if (first_index === 0) {
        this.Disable_Left_button = true;
      }

      this.EditDisable = false;
      this.DeleteDisable = false;
    }
  }
}
