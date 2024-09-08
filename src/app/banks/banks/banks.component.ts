import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from 'src/app/definition/definition.service';
import { BanksService } from '../banks.service';
import { AddAccountComponent } from '../add-account/add-account.component';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit {
  dataSource: any;
  dataSourceTabl2: any;
  displayedColumns: string[] = [
    'acounntNameA',
    'accountChrtName',
    'currencyName',
    'rate',
    'retAccountName',
    'chequnderCollectName',
    'bankExpensAccName',
    'edit',
    'delete',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  readonlyTable: boolean = true;
  newDisable: boolean = false;

  
  AllBanks: any[] = [];
  BankAccounts: any[] = [];
  dataSourceAccounts: any;
  AddAccountDisable:boolean = true;


  constructor(
    private BankService: BanksService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.BankForm.disable();
    this.GetAllBanks();
  }

  BankForm = this.fb.group({
    boxId: [],
    boxCode: ['', Validators.required],
    desca: ['', Validators.required],
    desce: [''],
    bankTel: [''],
    bankMobile: [''],
    bankFax: [''],
    bankResposableName: [''],
    isActive: [true],
  });

  GetAllBanks() {
    this.BankService.GetAllBanks().subscribe((res) => {
      this.AllBanks = res;
    });
  }

  GetBankAccounts() {
    this.BankService.GetBankAccounts(this.BankForm.value.boxId).subscribe(
      (res) => {
        this.BankAccounts = res;
        this.dataSourceAccounts = new MatTableDataSource<any>(
          this.BankAccounts
        );
        this.dataSourceAccounts.paginator = this.paginator;
        this.dataSourceAccounts.sort = this.sort;
      }
    );
  }

  onSumbit() {
    this.BankService.AddBank(this.BankForm.value).subscribe((res) => {
      if (res.status) {
        this.GetAllBanks();
        this.GetBankAccounts();
        this.BankForm.disable();
        this.BankForm.get('boxId')?.setValue(res.id);
        this.DisabledNextButton = false;
        this.DisabledPrevButton = false;
        this.lastRow = false;
        this.firstRow = false;
        this.SaveDisable = true;
        this.UpdateDisable = false;
        this.UndoDisabled = true;
        this.DeleteDisable = false;
      }
    });
  }

  updateBank() {
    this.BankForm.enable();
    this.AddAccountDisable = false;
    this.readonlyTable = false;
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
    this.undoIndex = this.AllBanks.findIndex(
      (p) => p.boxId == this.BankForm.value.boxId
    );
  }

  New() {
    this.BankForm.enable();
    this.readonlyTable = true;
    this.newDisable = true;

    this.undoIndex = this.AllBanks.findIndex(
      (p) => p.boxId == this.BankForm.value.boxId
    );
    this.BankForm.setValue({
      boxId: null,
      boxCode: null,
      desca: null,
      desce: null,
      bankTel: null,
      bankMobile: null,
      bankFax: null,
      bankResposableName: null,
      isActive: true,
    });
    this.AddAccountDisable = true;

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

  getLastRowData() {
    const LastItem = this.AllBanks[this.AllBanks.length - 1];
    if (LastItem) {
      this.BankForm.setValue({
        boxId: LastItem.boxId,
        boxCode: LastItem.boxCode,
        desca: LastItem.desca,
        desce: LastItem.desce,
        bankTel: LastItem.bankTel,
        bankMobile: LastItem.bankMobile,
        bankFax: LastItem.bankFax,
        bankResposableName: LastItem.bankResposableName,
        isActive: null,
      });

      this.GetBankAccounts();
      this.firstRow = false;
      this.lastRow = true;
      this.DisabledPrevButton = false;
      this.DisabledNextButton = true;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
    }
  }

  getNextRowData() {
    const index = this.AllBanks.findIndex(
      (p) => p.boxId == this.BankForm.value.boxId
    );

    const nextItem = this.AllBanks[index + 1];

    if (nextItem) {
      this.BankForm.setValue({
        boxId: nextItem.boxId,
        boxCode: nextItem.boxCode,
        desca: nextItem.desca,
        desce: nextItem.desce,
        bankTel: nextItem.bankTel,
        bankMobile: nextItem.bankMobile,
        bankFax: nextItem.bankFax,
        bankResposableName: nextItem.bankResposableName,
        isActive: null,
      });

      this.GetBankAccounts();

      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      const LastItem = this.AllBanks.findIndex(
        (p) => p.boxId == this.BankForm.value.boxId
      );

      if (this.AllBanks.length - 1 === LastItem) {
        this.DisabledNextButton = true;
        this.lastRow = true;
      }

      this.DisabledPrevButton = false;
    }
  }

  getPrevRowData() {
    const index = this.AllBanks.findIndex(
      (p) => p.boxId == this.BankForm.value.boxId
    );

    if (index === 0 || index === -1) {
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }

    const PrevItem = this.AllBanks[index - 1];

    if (PrevItem) {
      this.BankForm.setValue({
        boxId: PrevItem.boxId,
        boxCode: PrevItem.boxCode,
        desca: PrevItem.desca,
        desce: PrevItem.desce,
        bankTel: PrevItem.bankTel,
        bankMobile: PrevItem.bankMobile,
        bankFax: PrevItem.bankFax,
        bankResposableName: PrevItem.bankResposableName,
        isActive: null,
      });

      this.GetBankAccounts();

      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

      const firstItem = this.AllBanks.findIndex(
        (p) => p.boxId == this.BankForm.value.boxId
      );

      if (firstItem === 0) {
        this.DisabledPrevButton = true;
        this.firstRow = true;
      }

      this.DisabledNextButton = false;
    }
  }

  getFirstRowData() {
    const FirstItem = this.AllBanks[0];
    if (FirstItem) {
      this.BankForm.setValue({
        boxId: FirstItem.boxId,
        boxCode: FirstItem.boxCode,
        desca: FirstItem.desca,
        desce: FirstItem.desce,
        bankTel: FirstItem.bankTel,
        bankMobile: FirstItem.bankMobile,
        bankFax: FirstItem.bankFax,
        bankResposableName: FirstItem.bankResposableName,
        isActive: null,
      });

      this.GetBankAccounts();

      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
    }
  }


  undo() {
    this.BankForm.disable();
    this.readonlyTable = true;
    this.newDisable = false;
    this.AddAccountDisable = true;

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
      const undoItem = this.AllBanks[this.undoIndex];

      if (undoItem.boxId != null) {
        this.DeleteDisable = false;
        this.UpdateDisable = false;

        this.BankForm.setValue({
          boxId: undoItem.boxId,
          boxCode: undoItem.boxCode,
          desca: undoItem.desca,
          desce: undoItem.desce,
          bankTel: undoItem.bankTel,
          bankMobile: undoItem.bankMobile,
          bankFax: undoItem.bankFax,
          bankResposableName: undoItem.bankResposableName,
          isActive: null,
        });

        this.GetBankAccounts();
      }
    }
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSourceAccounts.filter = value;
  }

  AddAccount() {
    var _popup = this.dialog.open(AddAccountComponent, {
      width: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'أضافه حساب',
        BankId: this.BankForm.value.boxId,
      },
    });
    _popup.afterClosed().subscribe(() => {
      this.GetBankAccounts();
    });
  }

  UpdateAccount(elemant: any) {
    var _popup = this.dialog.open(AddAccountComponent, {
      width: '80%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        Title: 'أضافه حساب',
        BankId: this.BankForm.value.boxId,
        AccountData: elemant,
      },
    });
    _popup.afterClosed().subscribe(() => {
      this.GetBankAccounts();
    });
  }

  DeleteAccount(boxCurrencyId: any) {
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.BankService.DeleteAccount(boxCurrencyId).subscribe((res) => {
          this.GetBankAccounts();
        });
      }
    });
  }

  Open_delete_confirm() {
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });

    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.BankService.DeleteBank(this.BankForm.value.boxId).subscribe((res) => {
          if(res){
            this.GetAllBanks();
            this.BankForm.setValue({
              boxId: null,
              boxCode: null,
              desca: null,
              desce: null,
              bankTel: null,
              bankMobile: null,
              bankFax: null,
              bankResposableName: null,
              isActive: null
            });
            this.DeleteDisable = true;
            this.UpdateDisable = true;
          }
        });
      }
    });
  }
}
