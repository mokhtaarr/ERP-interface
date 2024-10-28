import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/account/account.service';
import { DefinitionService } from 'src/app/definition/definition.service';
import { PurchasesServicesService } from 'src/app/purchases/purchases-services.service';
import { SalesService } from 'src/app/sales/sales.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent {
  ItemData: any;
  itemCollectionDataForm: any;
  AddItemCollection_Response: any;
  ReadonlyCode: boolean = false;
  itemUnits:any[] = [];
  AllStores : any[] = [];
  AllPartitions : any[] = [];
  userStoreId : any;
  AllCurrency:any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateAccountComponent>,
    private purchasesServices: PurchasesServicesService,
    private fb: FormBuilder,
    private definitionService:DefinitionService,
    private accountService : AccountService,
    private salesService : SalesService
  ) {}


  ngOnInit(): void {
    this.itemCollectionDataForm = this.data.itemCollectionData;
    this.fillForm();
    this.GetAllCurrency();
  }


  itemCollectionForm = this.fb.group({
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
   this.definitionService.GetItemUnitsForItemCollection(this.itemCollectionForm.value.accountId).subscribe(res=>{
    this.itemUnits = res
   })
  }


  onSumbit(){
    // this.itemUnits = this.itemUnits.filter(u=>u.unitId == this.itemCollectionForm.value.unitId)
    // this.itemCollectionForm.get('unitNam')?.setValue(this.itemUnits[0].unitNam)

    // this.AllStores = this.AllStores.filter(s=>s.storeId == this.itemCollectionForm.value.storeId)
    // this.itemCollectionForm.get('storeCode')?.setValue(this.AllStores[0].storeCode)
    // this.itemCollectionForm.get('storeDescA')?.setValue(this.AllStores[0].storeDescA)

    // this.AllPartitions = this.AllPartitions.filter(p=>p.storePartId == this.itemCollectionForm.value.storePartId)
    // this.itemCollectionForm.get('partCode')?.setValue(this.AllPartitions[0]?.partCode)
    // this.itemCollectionForm.get('partDescA')?.setValue(this.AllPartitions[0]?.partDescA)


    this.AddItemCollection_Response = this.itemCollectionForm.value;
    this.closepopup();
  }

  closepopup(){
    this.ref.close(this.AddItemCollection_Response);
  }

   onCurrencyChange(event: MatSelectChange){
    const selectedCurrency = this.AllCurrency.find((currency) => currency.currencyId === event.value);
    this.itemCollectionForm.get('rate')?.setValue(selectedCurrency.rate);
    this.itemCollectionForm.get('currencyCode')?.setValue(selectedCurrency.currencyCode);
    this.itemCollectionForm.get('currencyDescA')?.setValue(selectedCurrency.currencyDescA);
  }

 

  //  getUserInfo(){
  //   this.accountService.currentUser$.subscribe(res =>{
  //     this.userStoreId = res?.storeId;

  //     this.salesService.GetUserStores(this.userStoreId).subscribe((res : any)=>{
  //       this.AllStores = res
  //       this.itemCollectionForm.get('storeId')?.setValue(this.AllStores[0].storeId)
  //     });

  //     this.salesService.GetUserPartition(this.userStoreId).subscribe(res=>{
  //       this.AllPartitions = res
  //     })
  //     })
  // }

  GetAllCurrency(){
    this.purchasesServices.GetAllCurrency().subscribe(res=>{
      this.AllCurrency = res;
    })
  }

  
}

