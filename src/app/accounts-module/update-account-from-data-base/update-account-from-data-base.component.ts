import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';
import { DefinitionService } from 'src/app/definition/definition.service';
import { PurchasesServicesService } from 'src/app/purchases/purchases-services.service';
import { SalesService } from 'src/app/sales/sales.service';
import { AccountsModuleServicesService } from '../accounts-module-services.service';

@Component({
  selector: 'app-update-account-from-data-base',
  templateUrl: './update-account-from-data-base.component.html',
  styleUrls: ['./update-account-from-data-base.component.scss']
})

export class UpdateAccountFromDataBaseComponent implements OnInit{
  ItemData: any;
  itemCollectionDataForm: any;
  AddItemCollection_Response: any;
  ReadonlyCode: boolean = false;
  itemUnits:any[] = [];
  AllStores : any[] = [];
  AllPartitions : any[] = [];
  userStoreId : any;
  AllCurrency:any[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateAccountFromDataBaseComponent>,
    private purchasesServices: PurchasesServicesService,
    private fb: FormBuilder,
    private definitionService:DefinitionService,
    public accountService : AccountService,
    private salesService : SalesService,
    private accountModuleService : AccountsModuleServicesService
  ) {}

  ngOnInit(): void {
    this.itemCollectionDataForm = this.data.itemCollectionData;
    this.fillForm();
    this.GetAllCurrency();
  }


  itemCollectionForm = this.fb.group({
    jurnalDetailId:[],
    accountId:[],
    accountCode:[''],
    accountNameA:[''],
    accDesc:[''],
    currencyId:[],
    currencyCode:[],
    currencyDescA:[],
    rate:[''],
  });



  fillForm(){
    if(this.itemCollectionDataForm){
      this.itemCollectionForm.setValue({
        jurnalDetailId: this.itemCollectionDataForm.jurnalDetailId ?? null,
        accountId: this.itemCollectionDataForm.accountId ?? null,
        accountCode: this.itemCollectionDataForm.accountCode ?? null,
        accountNameA: this.itemCollectionDataForm.accountNameA ?? null,
        accDesc: this.itemCollectionDataForm.accDesc ?? null,
        currencyId: this.itemCollectionDataForm.currencyId ?? null,
        currencyCode: this.itemCollectionDataForm.currencyCode ?? null,
        currencyDescA: this.itemCollectionDataForm.currencyDescA ?? null,
        rate: this.itemCollectionDataForm.rate ?? null,
      });
      this.ReadonlyCode = true
      this.GetItemUnitsForItemCollection();
    }
  }

  GetItemUnitsForItemCollection(){
   this.definitionService.GetItemUnitsForItemCollection(this.itemCollectionForm.value.jurnalDetailId).subscribe(res=>{
    this.itemUnits = res
   })
  }


  
  onCurrencyChange(event: MatSelectChange){
    const selectedCurrency = this.AllCurrency.find((currency) => currency.currencyId === event.value);
    this.itemCollectionForm.get('rate')?.setValue(selectedCurrency.rate);
    this.itemCollectionForm.get('currencyCode')?.setValue(selectedCurrency.currencyCode);
    this.itemCollectionForm.get('currencyDescA')?.setValue(selectedCurrency.currencyDescA);
  }


   onSumbit(){
    this.accountModuleService.updateCalJurnalDetail(this.itemCollectionForm.value).subscribe(res=>{
      if(res.status){
        this.closepopup();
      }
    })
   }

   closepopup(){
    this.ref.close(true);
   }


   cansel(){
    this.ref.close();
   }

   GetAllCurrency(){
    this.purchasesServices.GetAllCurrency().subscribe(res=>{
      this.AllCurrency = res;
    })
  }
  
}

