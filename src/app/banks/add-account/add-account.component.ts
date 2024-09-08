import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { BanksService } from '../banks.service';
import { SearchAccountsComponent } from '../search-accounts/search-accounts.component';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit {
  AllAccounts: any[] = [];
  AllCurrency: any[] = [];
  AllBanks: any[] = [];

  AllAccountChrtId: any[] = [];
  filteredAccountChrtId: any[] = [];

  AllChequndercollectId: any[] = [];
  filteredAllChequndercollectId: any[] = [];

  AllRetAccountId: any[] = [];
  filteredAllRetAccountId: any[] = [];

  AllBankExpensAccId: any[] = [];
  filteredAllBankExpensAccId: any[] = [];

  receiveAccountData : any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddAccountComponent>,
    private BankService: BanksService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.receiveAccountData = this.data.AccountData
    this.GetAllCurrency();
    this.GetAllAccount();
    this.fillform();
  }

  AccountForm = this.fb.group({
    boxId: [],
    AccountId: [],
    AccountCode: ['', Validators.required],
    AccounntNameA: ['', Validators.required],
    AccounntNameE: [''],
    boxCurrencyId: [],
    currencyId: [],
    accountChrtId: [, Validators.required],
    chequndercollectId: [],
    retAccountId: [],
    bankExpensAccId: [],
  });

  closepopup() {
    this.ref.close();
  }

  onSumbit() {
    this.AccountForm.value.boxId = this.data.BankId;
    this.BankService.AddBankAccount(this.AccountForm.value).subscribe(res=>{
      if(res.status){
       this.closepopup();
      }
    })
  }

  GetAllBanks() {
    this.BankService.GetAllBanks().subscribe((res) => {
      this.AllBanks = res;
    });
  }

  GetAllAccount() {
    this.BankService.GetAllAccounts().subscribe((res) => {
      this.AllAccounts = res;

      this.AllAccountChrtId = res;
      this.filteredAccountChrtId = res;

      this.AllChequndercollectId = res;
      this.filteredAllChequndercollectId = res;

      this.filteredAllRetAccountId = res;
      this.AllRetAccountId = res;

      this.filteredAllBankExpensAccId = res;
      this.AllBankExpensAccId = res;
    });
  }

  GetAllCurrency() {
    this.BankService.GetAllCurrency().subscribe((res) => {
      this.AllCurrency = res;
    });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchAccount(searchValue);
  }

  searchAccount(searchValue: string): void {
    if (!searchValue) {
      this.filteredAccountChrtId = this.AllAccountChrtId;
      return;
    }

    this.filteredAccountChrtId = this.AllAccountChrtId.filter((acc) =>
      acc.accountCode.toString().includes(searchValue)
    );

    if (this.filteredAccountChrtId.length === 0) {
      this.filteredAccountChrtId = this.AllAccountChrtId.filter((acc) =>
        acc.accountNameA.toString().includes(searchValue)
      );
    }

    if (this.filteredAccountChrtId.length > 0) {
      this.AccountForm.get('accountChrtId')?.setValue(
        this.filteredAccountChrtId[0].accountId
      );
      this.AccountForm.get('currencyId')?.setValue(
        this.filteredAccountChrtId[0].currencyId
      );
    }
  }

  onSearchCheq(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchAccountCheq(searchValue);
  }

  searchAccountCheq(searchValue: string): void {
    if (!searchValue) {
      this.filteredAllChequndercollectId = this.AllChequndercollectId;
      return;
    }

    this.filteredAllChequndercollectId = this.AllChequndercollectId.filter(
      (acc) => acc.accountCode.toString().includes(searchValue)
    );

    if (this.filteredAllChequndercollectId.length === 0) {
      this.filteredAllChequndercollectId = this.AllChequndercollectId.filter(
        (acc) => acc.accountNameA.toString().includes(searchValue)
      );
    }

    if (this.filteredAllChequndercollectId.length > 0) {
      this.AccountForm.get('chequndercollectId')?.setValue(
        this.filteredAllChequndercollectId[0].accountId
      );
    }
  }

  onSearchRet(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchAccountRet(searchValue);
  }

  searchAccountRet(searchValue: string): void {
    if (!searchValue) {
      this.filteredAllRetAccountId = this.AllRetAccountId;
      return;
    }

    this.filteredAllRetAccountId = this.AllRetAccountId.filter((acc) =>
      acc.accountCode.toString().includes(searchValue)
    );

    if (this.filteredAllRetAccountId.length === 0) {
      this.filteredAllRetAccountId = this.AllRetAccountId.filter((acc) =>
        acc.accountNameA.toString().includes(searchValue)
      );
    }

    if (this.filteredAllRetAccountId.length > 0) {
      this.AccountForm.get('retAccountId')?.setValue(
        this.filteredAllRetAccountId[0].accountId
      );
    }
  }

  onSearchBank(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchAccountBank(searchValue);
  }

  searchAccountBank(searchValue: string): void {
    if (!searchValue) {
      this.filteredAllBankExpensAccId = this.AllBankExpensAccId;
      return;
    }

    this.filteredAllBankExpensAccId = this.AllBankExpensAccId.filter((acc) =>
      acc.accountCode.toString().includes(searchValue)
    );

    if (this.filteredAllBankExpensAccId.length === 0) {
      this.filteredAllBankExpensAccId = this.AllBankExpensAccId.filter((acc) =>
        acc.accountNameA.toString().includes(searchValue)
      );
    }

    if (this.filteredAllBankExpensAccId.length > 0) {
      this.AccountForm.get('bankExpensAccId')?.setValue(
        this.filteredAllBankExpensAccId[0].accountId
      );
    }
  }

  onAccountSelect(event: MatSelectChange): void {
    const selectedAccount = this.filteredAccountChrtId.find(
      (acc) => acc.accountId === event.value
    );
    this.AccountForm.get('currencyId')?.setValue(selectedAccount.currencyId);
  }

  fillform(){
    if(this.receiveAccountData != undefined){
      this.AccountForm.setValue({
        boxId: this.receiveAccountData.boxId,
        AccountId: this.receiveAccountData.accountId,
        AccountCode: this.receiveAccountData.accountCode,
        AccounntNameA: this.receiveAccountData.accountNameA,
        AccounntNameE: this.receiveAccountData.accountNameE,
        boxCurrencyId: this.receiveAccountData.boxCurrencyId,
        currencyId: this.receiveAccountData.currencyId,
        accountChrtId: this.receiveAccountData.accountChrtId,
        chequndercollectId: this.receiveAccountData.chequndercollectId,
        retAccountId: this.receiveAccountData.retAccountId,
        bankExpensAccId: this.receiveAccountData.bankExpensAccId
      })
    }
  }
}
