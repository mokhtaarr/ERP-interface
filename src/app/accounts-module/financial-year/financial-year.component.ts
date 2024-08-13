import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountsModuleServicesService } from '../accounts-module-services.service';
import {
  CellClickedEvent,
  ColDef,
  ICellRendererParams,
} from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { CheckboxRendererComponent } from '../checkbox-renderer/checkbox-renderer.component';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-financial-year',
  templateUrl: './financial-year.component.html',
  styleUrls: ['./financial-year.component.scss'],
})
export class FinancialYearComponent implements OnInit {
  items: any[] = [];
  modifiedRows: any[] = []; // متغير لتعقب الصفوف المعدلة
  paginationPageSize: number = 10;

  DisabledPrevButton: boolean = false;
  DisabledNextButton: boolean = false;
  firstRow: boolean = false;
  lastRow: boolean = false;
  DeleteDisable: boolean = true;
  SaveDisable: boolean = true;
  UpdateDisable: boolean = true;

  EditReadonly: boolean = false;
  reloadDisabled: boolean = false;
  UndoDisabled: boolean = true;
  undoIndex!: number;

  SysFinancialYears: any[] = [];
  dateRanges: any = [];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    editable: true,
    resizable: true,
    headerClass: 'ag-right-aligned-header',
    cellClass: 'ag-right-aligned-cell',
  };

  colDefs: ColDef[] = [
    {
      field: 'isActive',
      headerName: 'فعال',
      editable: true,
      cellRenderer: (params: ICellRendererParams) => {
        return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
      },
    },
    {
      field: 'isClosed',
      headerName: 'مغلق',
      cellRenderer: (params: ICellRendererParams) => {
        return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
      },
  },
    {
      field: 'endingDate',
      headerName: 'تاريخ النهاية',
      // valueFormatter: this.dateFormatter,
    },
    {
      // field: 'startingFrom',
      // headerName: 'تاريخ البداية',
      // valueFormatter: this.dateFormatter,

      field: 'startingFrom',
      headerName: 'تاريخ البداية',
      // valueFormatter: (params) => {
      //   const date = new Date(params.value);
      //   return date.toLocaleString();
      // }
    },
    { field: 'monthNameE', headerName: 'اسم الفتره 2' },
    { field: 'monthNameA', headerName: 'اسم الفتره 1' },
    { field: 'financialIntervalCode', headerName: 'كود الفتره' },
  ];

  dateFormatter(params: any) {
    const date = new Date(params.value);
    //  التنسيق "dd/MM/yyyy, hh:mm:ss"
    // return date.toLocaleString('en-GB');

     return date.toLocaleDateString('en-GB'); // استخدام التنسيق "dd/MM/yyyy"
  }

  constructor(
    private AccountsService: AccountsModuleServicesService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.FinancialForm.disable();
    this.GetAllSysFinancialYears();
  }

  FinancialForm = this.fb.group({
    financialYearsId: [],
    financialYearsCode: [, Validators.required],
    financialYearNameA: ['', Validators.required],
    financialYearNameE: [''],
    noOfIntervals: [],
    startingFrom: [, Validators.required],
    endTo: [, Validators.required],
    closingDate: [],
    SysFinancialIntervalList: [[]],
  });

  

  onCellClicked(event: CellClickedEvent) {
    console.log(event.data);
  }

  saveChanges() {
    console.log('this.modifiedRows', this.modifiedRows);
  }

  onCellValueChanged(event: any) {
    const modifiedRow = event.data;
    if (!this.modifiedRows.includes(modifiedRow)) {
      this.modifiedRows.push(modifiedRow);
    }
  }

  onSumbit() {
    if (this.dateRanges != null) {
      this.FinancialForm.get('SysFinancialIntervalList')!.setValue(
        this.dateRanges
      );
    }

    this.AccountsService.addfinancialYear(this.FinancialForm.value).subscribe(
      (res) => {
        if (res.status) {
          this.GetAllSysFinancialYears();
          this.FinancialForm.disable();
          this.FinancialForm.get('financialYearsId')?.setValue(res.id);
          this.DisabledNextButton = false;
          this.DisabledPrevButton = false;
          this.lastRow = false;
          this.firstRow = false;
          this.SaveDisable = true;
          this.UpdateDisable = false;
          this.UndoDisabled = true;
          this.DeleteDisable = false;
        }
      }
    );
  }

  getFirstRowData(){
    const FirstItem = this.SysFinancialYears[0];
      if(FirstItem){
     this.FinancialForm.setValue({
       financialYearsId: FirstItem.financialYearsId,
       financialYearsCode: FirstItem.financialYearsCode,
       financialYearNameA: FirstItem.financialYearNameA,
       financialYearNameE: FirstItem.financialYearNameE,
       noOfIntervals: FirstItem.noOfIntervals,
       startingFrom: FirstItem.startingFrom,
       endTo: FirstItem.endTo,
       closingDate: FirstItem.closingDate,
       SysFinancialIntervalList: null
     })
     this.AccountsService.GetSysFinancialIntervals(FirstItem.financialYearsId).subscribe((res) => {
      this.dateRanges = res;
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
    const LastItem = this.SysFinancialYears[this.SysFinancialYears.length-1];
      if(LastItem){
        this.FinancialForm.setValue({
          financialYearsId: LastItem.financialYearsId,
          financialYearsCode: LastItem.financialYearsCode,
          financialYearNameA: LastItem.financialYearNameA,
          financialYearNameE: LastItem.financialYearNameE,
          noOfIntervals: LastItem.noOfIntervals,
          startingFrom: LastItem.startingFrom,
          endTo: LastItem.endTo,
          closingDate: LastItem.closingDate,
          SysFinancialIntervalList: null
        })
        this.AccountsService.GetSysFinancialIntervals(LastItem.financialYearsId).subscribe((res) => {
         this.dateRanges = res;
       });
      this.firstRow = false;
      this.lastRow = true;
      this.DisabledPrevButton = false;
      this.DisabledNextButton = true;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      }
  }

  getNextRowData(){
    
    const index = this.SysFinancialYears.findIndex(p=>p.financialYearsId == this.FinancialForm.value.financialYearsId);

    const nextItem = this.SysFinancialYears[index + 1];

    if(nextItem){
      this.FinancialForm.setValue({
        financialYearsId: nextItem.financialYearsId,
        financialYearsCode: nextItem.financialYearsCode,
        financialYearNameA: nextItem.financialYearNameA,
        financialYearNameE: nextItem.financialYearNameE,
        noOfIntervals: nextItem.noOfIntervals,
        startingFrom: nextItem.startingFrom,
        endTo: nextItem.endTo,
        closingDate: nextItem.closingDate,
        SysFinancialIntervalList: null
      })
      this.AccountsService.GetSysFinancialIntervals(nextItem.financialYearsId).subscribe((res) => {
       this.dateRanges = res;
     });
    
      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      const LastItem = this.SysFinancialYears.findIndex(p=>p.financialYearsId == this.FinancialForm.value.financialYearsId);

      if(this.SysFinancialYears.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;
      }
      this.DisabledPrevButton = false;
    }

  }

  getPrevRowData(){
  const index = this.SysFinancialYears.findIndex(p=>p.financialYearsId == this.FinancialForm.value.financialYearsId);
  const PrevItem = this.SysFinancialYears[index - 1];

  if(index === 0){
    this.DisabledPrevButton = true;
    this.firstRow = true;
 }

  if(PrevItem){
    this.FinancialForm.setValue({
      financialYearsId: PrevItem.financialYearsId,
      financialYearsCode: PrevItem.financialYearsCode,
      financialYearNameA: PrevItem.financialYearNameA,
      financialYearNameE: PrevItem.financialYearNameE,
      noOfIntervals: PrevItem.noOfIntervals,
      startingFrom: PrevItem.startingFrom,
      endTo: PrevItem.endTo,
      closingDate: PrevItem.closingDate,
      SysFinancialIntervalList: null
    })
    this.AccountsService.GetSysFinancialIntervals(PrevItem.financialYearsId).subscribe((res) => {
     this.dateRanges = res;
   });
    this.firstRow = false;
    this.lastRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const firstItem = this.SysFinancialYears.findIndex(p=>p.financialYearsId == this.FinancialForm.value.financialYearsId);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
     
    this.DisabledNextButton = false;
  }
  }


  

  undo(){
    this.FinancialForm.disable();
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.SaveDisable = true;
    this.UndoDisabled = true;

    if(this.undoIndex != -1){
      const undoItem = this.SysFinancialYears[this.undoIndex]

      if(undoItem){
        this.FinancialForm.setValue({
          financialYearsId: undoItem.financialYearsId,
          financialYearsCode: undoItem.financialYearsCode,
          financialYearNameA: undoItem.financialYearNameA,
          financialYearNameE: undoItem.financialYearNameE,
          noOfIntervals: undoItem.noOfIntervals,
          startingFrom: undoItem.startingFrom,
          endTo: undoItem.endTo,
          closingDate: undoItem.closingDate,
          SysFinancialIntervalList: null
        })
        this.AccountsService.GetSysFinancialIntervals(undoItem.financialYearsId).subscribe((res) => {
         this.dateRanges = res;
       });

      this.UpdateDisable = false;
      this.DeleteDisable = false;
      }
    }
  }




  New() {
    this.FinancialForm.enable();
     this.undoIndex = this.SysFinancialYears.findIndex(p=>p.financialYearsId == this.FinancialForm.value.financialYearsId);
    this.FinancialForm.setValue({
      financialYearsId: null,
      financialYearsCode: null,
      financialYearNameA: null,
      financialYearNameE: null,
      noOfIntervals: null,
      startingFrom: null,
      endTo: null,
      closingDate: null,
      SysFinancialIntervalList: null,
    });

    this.dateRanges = [];
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

  GetAllSysFinancialYears() {
    this.AccountsService.GetSysFinancialYears().subscribe((res) => {
      this.SysFinancialYears = res;
    });
  }

  calculateDateRanges() {
    const startDate = this.FinancialForm.value.startingFrom;
    const endDate = this.FinancialForm.value.endTo;

    if (startDate && endDate) {
      try {
        this.dateRanges = [];
        this.dateRanges = this.AccountsService.getDateRanges(
          new Date(startDate),
          new Date(endDate),
          this.FinancialForm.value.financialYearsCode
        );
        this.FinancialForm.get('noOfIntervals')?.setValue(
          this.dateRanges.length
        );
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      alert('يرجى إدخال تاريخ البداية وتاريخ النهاية.');
    }
  }

  onRowClick(financial: any) {
    if (financial) {
      this.FinancialForm.setValue({
        financialYearsId: financial.financialYearsId,
        financialYearsCode: financial.financialYearsCode,
        financialYearNameA: financial.financialYearNameA,
        financialYearNameE: financial.financialYearNameE,
        noOfIntervals: financial.noOfIntervals,
        startingFrom: financial.startingFrom,
        endTo: financial.endTo,
        closingDate: financial.closingDate,
        SysFinancialIntervalList: null,
      });
      this.AccountsService.GetSysFinancialIntervals(financial.financialYearsId).subscribe((res) => {
        this.dateRanges = res;
      });

      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
    }
  }

  updateFinancial() {
    this.FinancialForm.enable();
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
    this.undoIndex = this.SysFinancialYears.findIndex(p=>p.fi == this.FinancialForm.value.financialYearsId);
  }


  Open_delete_confirm() {
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.AccountsService.DeleteFinance(this.FinancialForm.value.financialYearsId).subscribe(res=>{
          if(res){
            this.GetAllSysFinancialYears();
           this.FinancialForm.setValue({
             financialYearsId: null,
             financialYearsCode: null,
             financialYearNameA: null,
             financialYearNameE: null,
             noOfIntervals: null,
             startingFrom: null,
             endTo: null,
             closingDate: null,
             SysFinancialIntervalList: null
           })
            this.DeleteDisable = true;
            this.UpdateDisable = true;
          }
        })
      }
    });
  }



}
