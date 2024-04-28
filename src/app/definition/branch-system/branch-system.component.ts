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

@Component({
  selector: 'app-branch-system',
  templateUrl: './branch-system.component.html',
  styleUrls: ['./branch-system.component.scss'],
})
export class BranchSystemComponent implements OnInit {
  AllBranches: Branches[] = [];
  branch!: Branches;
  readonly_field : boolean = false;
  Disabled_field : boolean = true;
  Disable_button : boolean = true;

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
    this.updateDisabledState()
  }

  branchForm = this.fb.group({
    storeId: [0],
    storeCode: ['', Validators.required],
    storeDescA: ['', Validators.required],
    storeDescE: ['', Validators.required],
    branch_offical:[''],
    phone:[''],
    Treasury:[''],
    branch_location:[''],
    main:[false]
  });

  
  updateDisabledState() {
    if(this.Disabled_field){
      this.branchForm.disable()
      this.branchForm.get('storeCode')?.enable();

    }else{
      this.branchForm.enable()
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
        branch_offical : '',
        phone :'',
        Treasury:'',
        branch_location:'',
        main:false
      });
    });
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
  }

  open_AddPartition_Popup(){
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

  
  New(){
    this.Disabled_field = false;
    this.readonly_field = false;
    this.updateDisabledState();

  }

  onSumbit(){
    console.log(this.branchForm.value)
    this.definitionService.AddBranch(this.branchForm.value).subscribe()
  }

  updateBranch(){
    console.log(this.branchForm.value)
   }
}
