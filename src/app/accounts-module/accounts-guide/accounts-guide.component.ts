import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AccountsModuleServicesService } from '../accounts-module-services.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-accounts-guide',
  templateUrl: './accounts-guide.component.html',
  styleUrls: ['./accounts-guide.component.scss']
})
export class AccountsGuideComponent implements OnInit {

  tableDataSource : any;
  AllAccountUsers : any[] = [];
  displayedColumns: string[] = ['AccountName', 'UserName', 'ApprovedBy', 'remarks1','delete'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  allAccountsGuide : any[] = [];
  dataSource: any;
  allAccountsForSelect : any[] = [];
  AllCurrency : any[] = [];
  AllUsers : any[] = [];
    
  DisabledPrevButton: boolean = false;
  DisabledNextButton: boolean = false;
  firstRow: boolean = false;
  lastRow: boolean = false;
  DeleteDisable :boolean = true;
  SaveDisable : boolean = true;
  UpdateDisable : boolean = true;

  EditReadonly : boolean = false;
  reloadDisabled : boolean = false;
  UndoDisabled : boolean = true;
  undoIndex!: number;
  undoItem:any;

  currentIndex: number = 0;
  currentChildIndex: number = -1;

  CalcMethodDisable : boolean = false;
  DataFilter :any;

  currentlevel !: number ;
  AccountItem : any;

 
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      accountId: node.accountId,
      accountCode:node.accountCode,
      mainAccountId:node.mainAccountId,
      accountNameA : node.accountNameA,
      accountNameE : node.accountNameE,
      accountLevel : node.accountLevel,
      accountType : node.accountType,
      accountNature:node.accountNature,
      accountGroup:node.accountGroup,
      accCashFlow:node.accCashFlow,
      calcMethod:node.calcMethod,
      currencyId:node.currencyId,
      // costCentersDistribute:node.costCentersDistribute,
      // currencyReevaluation:node.currencyReevaluation,
      accountStopped:node.accountStopped,
      remarksA:node.remarksA,
      remarksE:node.remarksE,
      openningBalanceDepit:node.openningBalanceDepit,
      openningBalanceCredit:node.openningBalanceCredit,
      accCurrTrancCredit:node.accCurrTrancCredit,
      accCurrTrancDepit:node.accCurrTrancDepit,
      accTotaCredit:node.accTotaCredit,
      accTotalDebit:node.accTotalDebit,
      balanceDebitLocal:node.balanceDebitLocal,
      balanceCreditLocal:node.balanceCreditLocal,
      openningBalanceCreditCurncy:node.openningBalanceCreditCurncy,
      openningBalanceDepitCurncy:node.openningBalanceDepitCurncy,
      accCurrTrancCreditCurncy:node.accCurrTrancCreditCurncy,
      accCurrTrancDepitCurncy:node.accCurrTrancDepitCurncy,
      accTotaCreditCurncy:node.accTotaCreditCurncy,
      accTotalDebitCurncy:node.accTotalDebitCurncy,
      balanceCreditCurncy:node.balanceCreditCurncy,
      balanceDebitCurncy:node.balanceDebitCurncy,
      // accApproxim:node.accApproxim,
      rate:node.rate
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,   
  );

  @ViewChild('tree') tree !: MatTree<any>;

  constructor(private AccountsService : AccountsModuleServicesService,private fb:FormBuilder,private dialog: MatDialog){

  }

  hasChild = (_: number, node: any) => node.expandable;

  ngOnInit(): void {
    this.AccountGuideForm.disable();
    this.GetAllAccountsGuide();
    this.GetAllAccountsGuideForSelect();
    this.GetAllCurrency();
  }

  AccountGuideForm = this.fb.group({
    accountId:[],
    accountCode :[,Validators.required],
    accountNameA :['',Validators.required],
    accountNameE :[''],
    mainAccountId:[],
    accountLevel:[],
    accountNature:[1],
    accountType:[1],
    accountGroup:[1],
    accCashFlow:[1],
    calcMethod:[true],
    openningBalanceDepit:[],
    openningBalanceCredit:[],
    accCurrTrancDepit:[],
    accCurrTrancCredit:[],
    accTotalDebit:[],
    accTotaCredit:[],
    balanceDebitLocal:[],
    balanceCreditLocal:[],
    openningBalanceDepitCurncy:[],
    openningBalanceCreditCurncy:[],
    accCurrTrancDepitCurncy:[],
    accCurrTrancCreditCurncy:[],
    accTotalDebitCurncy:[],
    accTotaCreditCurncy:[],
    balanceDebitCurncy:[],
    balanceCreditCurncy:[],
    remarksA:[''],
    remarksE:[''],
    currencyId:[,Validators.required],
    accountStopped:[],
    rate:[]
  })

  CalAccountUsersForm = this.fb.group({
    accUserId:[],
    accountId:[],
    userId:[,Validators.required],
    approvedBy:[,Validators.required],
    remarks1:[''],
    accountCode:[],
    accountName:['']
  })



  GetAllAccountsGuide(){
    this.AccountsService.GEtAllAccountsGuide().subscribe(res=>{
      this.allAccountsGuide = res;
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = this.allAccountsGuide;
      if (this.tree && this.tree.treeControl) {
        this.tree.treeControl.expandAll();
      }
    })
  }

  GetAllAccountsGuideForSelect(){
    this.AccountsService.GEtAllAccountsGuideForSelect().subscribe(res=>{
      this.allAccountsForSelect = res;
    })
  }

  GetAllCurrency(){
    this.AccountsService.GetAllCurrency().subscribe(res=>{
      this.AllCurrency=res;
    })
   }
  
  handleNodeClick(node: any) {
    if(node){
      this.AccountItem = node,
      this.AccountGuideForm.setValue({
        accountId: node.accountId,
        accountCode: node.accountCode,
        accountNameA: node.accountNameA,
        accountNameE: node.accountNameE,
        mainAccountId: node.mainAccountId,
        accountLevel: node.level + 1,
        accountNature: node.accountNature,
        accountType: node.accountType,
        accountGroup: node.accountGroup,
        accCashFlow: node.accCashFlow,
        calcMethod: node.calcMethod,
        openningBalanceDepit: node.openningBalanceDepit,
        openningBalanceCredit: node.openningBalanceCredit,
        accCurrTrancDepit: node.accCurrTrancDepit,
        accCurrTrancCredit: node.accCurrTrancCredit,
        accTotalDebit: node.accTotalDebit,
        accTotaCredit: node.accTotaCredit,
        balanceDebitLocal: node.balanceDebitLocal,
        balanceCreditLocal: node.balanceCreditLocal,
        openningBalanceDepitCurncy: node.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: node.openningBalanceCreditCurncy,
        accCurrTrancDepitCurncy: node.accCurrTrancDepitCurncy,
        accCurrTrancCreditCurncy: node.accCurrTrancCreditCurncy,
        accTotalDebitCurncy: node.accTotalDebitCurncy,
        accTotaCreditCurncy: node.accTotaCreditCurncy,
        balanceDebitCurncy: node.balanceDebitCurncy,
        balanceCreditCurncy: node.balanceCreditCurncy,
        remarksA: node.remarksA,
        remarksE: node.remarksE,
        currencyId: node.currencyId,
        accountStopped: node.accountStopped,
        rate: node.rate
      })
  
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      window.scrollTo({ top: 30, behavior: 'smooth' });

      const valuesToCheck = [
        node.openningBalanceDepit,
        node.openningBalanceCredit,
        node.accCurrTrancDepit,
        node.accCurrTrancCredit,
        node.accTotalDebit,
        node.accTotaCredit,
        node.balanceDebitLocal,
        node.balanceCreditLocal,
        node.openningBalanceDepitCurncy,
        node.openningBalanceCreditCurncy,
        node.accCurrTrancDepitCurncy,
        node.accCurrTrancCreditCurncy,
        node.accTotalDebitCurncy,
        node.accTotaCreditCurncy,
        node.balanceDebitCurncy,
        node.balanceCreditCurncy
      ];
      
      if (valuesToCheck.some(value => value !== 0)) {
        this.AccountGuideForm.controls['currencyId'].disable();
      }
      


    }
  }

  onSumbit(){
   this.AccountsService.AddCalAccountChart(this.AccountGuideForm.value).subscribe(res=>{
    if(res.status){
      this.GetAllAccountsGuide();
      this.GetAllAccountsGuideForSelect();
      this.AccountGuideForm.disable();
      this.AccountGuideForm.get('accountId')?.setValue(res.id)
      this.AccountItem = this.AccountGuideForm.value
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

  MainAccountData(account:any){
      this.AccountGuideForm.get("calcMethod")?.setValue(account.calcMethod);
      // this.AccountGuideForm.controls['calcMethod'].disable();
      this.AccountGuideForm.get("accountType")?.setValue(4);
  
  }

  getLastRowData(){
    const LastItem = this.allAccountsGuide[this.allAccountsGuide.length-1];
    if(LastItem){
      this.AccountGuideForm.setValue({
        accountId: LastItem.accountId,
        accountCode: LastItem.accountCode,
        accountNameA: LastItem.accountNameA,
        accountNameE: LastItem.accountNameE,
        mainAccountId: LastItem.mainAccountId,
        accountLevel: null,
        accountNature: LastItem.accountNature,
        accountType: LastItem.accountType,
        accountGroup: LastItem.accountGroup,
        accCashFlow: LastItem.accCashFlow,
        calcMethod: LastItem.calcMethod,
        openningBalanceDepit: LastItem.openningBalanceDepit,
        openningBalanceCredit: LastItem.openningBalanceCredit,
        accCurrTrancDepit: LastItem.accCurrTrancDepit,
        accCurrTrancCredit: LastItem.accCurrTrancCredit,
        accTotalDebit: LastItem.accTotalDebit,
        accTotaCredit: LastItem.accTotaCredit,
        balanceDebitLocal: LastItem.balanceDebitLocal,
        balanceCreditLocal: LastItem.balanceCreditLocal,
        openningBalanceDepitCurncy: LastItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: LastItem.openningBalanceCreditCurncy,
        accCurrTrancDepitCurncy: LastItem.accCurrTrancDepitCurncy,
        accCurrTrancCreditCurncy: LastItem.accCurrTrancCreditCurncy,
        accTotalDebitCurncy: LastItem.accTotalDebitCurncy,
        accTotaCreditCurncy: LastItem.accTotaCreditCurncy,
        balanceDebitCurncy: LastItem.balanceDebitCurncy,
        balanceCreditCurncy: LastItem.balanceCreditCurncy,
        remarksA: LastItem.remarksA,
        remarksE: LastItem.remarksE,
        currencyId: LastItem.currencyId,
        accountStopped: LastItem.accountStopped,
        rate: LastItem.rate
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
    const index = this.allAccountsGuide.findIndex(p=>p.accountId == this.AccountGuideForm.value.accountId);

    if(index === 0 || index === -1){
      this.DisabledPrevButton = true;
      this.firstRow = true;
   }


    const PrevItem = this.allAccountsGuide[index - 1];
    if(PrevItem == null){
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }
    
    if(PrevItem){
      this.AccountGuideForm.setValue({
        accountId: PrevItem.accountId,
        accountCode: PrevItem.accountCode,
        accountNameA: PrevItem.accountNameA,
        accountNameE: PrevItem.accountNameE,
        mainAccountId: PrevItem.mainAccountId,
        accountLevel: null,
        accountNature: PrevItem.accountNature,
        accountType: PrevItem.accountType,
        accountGroup: PrevItem.accountGroup,
        accCashFlow: PrevItem.accCashFlow,
        calcMethod: PrevItem.calcMethod,
        openningBalanceDepit: PrevItem.openningBalanceDepit,
        openningBalanceCredit: PrevItem.openningBalanceCredit,
        accCurrTrancDepit: PrevItem.accCurrTrancDepit,
        accCurrTrancCredit: PrevItem.accCurrTrancCredit,
        accTotalDebit: PrevItem.accTotalDebit,
        accTotaCredit: PrevItem.accTotaCredit,
        balanceDebitLocal: PrevItem.balanceDebitLocal,
        balanceCreditLocal: PrevItem.balanceCreditLocal,
        openningBalanceDepitCurncy: PrevItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: PrevItem.openningBalanceCreditCurncy,
        accCurrTrancDepitCurncy: PrevItem.accCurrTrancDepitCurncy,
        accCurrTrancCreditCurncy: PrevItem.accCurrTrancCreditCurncy,
        accTotalDebitCurncy: PrevItem.accTotalDebitCurncy,
        accTotaCreditCurncy: PrevItem.accTotaCreditCurncy,
        balanceDebitCurncy: PrevItem.balanceDebitCurncy,
        balanceCreditCurncy: PrevItem.balanceCreditCurncy,
        remarksA: PrevItem.remarksA,
        remarksE: PrevItem.remarksE,
        currencyId: PrevItem.currencyId,
        accountStopped: PrevItem.accountStopped,
        rate: PrevItem.rate
      });

    this.firstRow = false;
    this.lastRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const firstItem = this.allAccountsGuide.findIndex(p=>p.accountId == this.AccountGuideForm.value.accountId);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
     
    this.DisabledNextButton = false;
    }

    
  }

  // getNextRowData(){
  //   const index = this.allAccountsGuide.find(p=>p.accountId == this.AccountGuideForm.value.accountId);
  //   const currentItem = this.allAccountsGuide[index];
  //   if(currentItem == null){
  //     console.log("currentItem empty i will get parent Type")
  //     const nextItem = this.allAccountsGuide[index + 1];
  //     console.log(nextItem)
  //     if(nextItem){
  //       this.AccountGuideForm.setValue({
  //         accountId: nextItem.accountId,
  //         accountCode: nextItem.accountCode,
  //         accountNameA: nextItem.accountNameA,
  //         accountNameE: nextItem.accountNameE,
  //         mainAccountId: nextItem.mainAccountId,
  //         accountLevel: null,
  //         accountNature: nextItem.accountNature,
  //         accountType: nextItem.accountType,
  //         accountGroup: nextItem.accountGroup,
  //         accCashFlow: nextItem.accCashFlow,
  //         calcMethod: nextItem.calcMethod,
  //         openningBalanceDepit: nextItem.openningBalanceDepit,
  //         openningBalanceCredit: nextItem.openningBalanceCredit,
  //         accCurrTrancDepit: nextItem.accCurrTrancDepit,
  //         accCurrTrancCredit: nextItem.accCurrTrancCredit,
  //         accTotalDebit: nextItem.accTotalDebit,
  //         accTotaCredit: nextItem.accTotaCredit,
  //         balanceDebitLocal: nextItem.balanceDebitLocal,
  //         balanceCreditLocal: nextItem.balanceCreditLocal,
  //         openningBalanceDepitCurncy: nextItem.openningBalanceDepitCurncy,
  //         openningBalanceCreditCurncy: nextItem.openningBalanceCreditCurncy,
  //         accCurrTrancDepitCurncy: nextItem.accCurrTrancDepitCurncy,
  //         accCurrTrancCreditCurncy: nextItem.accCurrTrancCreditCurncy,
  //         accTotalDebitCurncy: nextItem.accTotalDebitCurncy,
  //         accTotaCreditCurncy: nextItem.accTotaCreditCurncy,
  //         balanceDebitCurncy: nextItem.balanceDebitCurncy,
  //         balanceCreditCurncy: nextItem.balanceCreditCurncy,
  //         remarksA: nextItem.remarksA,
  //         remarksE: nextItem.remarksE,
  //         currencyId: nextItem.currencyId,
  //         accountStopped: nextItem.accountStopped,
  //         rate: nextItem.rate
  //       });
  //     }

  //   }
   
  //   if(currentItem.type == "parent"){
  //     console.log("child1")
  //   }
   
  //   // if(nextItem.type = "parent")
  //   // if(nextItem){
  //   //   this.AccountGuideForm.setValue({
  //   //     accountId: nextItem.accountId,
  //   //     accountCode: nextItem.accountCode,
  //   //     accountNameA: nextItem.accountNameA,
  //   //     accountNameE: nextItem.accountNameE,
  //   //     mainAccountId: nextItem.mainAccountId,
  //   //     accountLevel: null,
  //   //     accountNature: nextItem.accountNature,
  //   //     accountType: nextItem.accountType,
  //   //     accountGroup: nextItem.accountGroup,
  //   //     accCashFlow: nextItem.accCashFlow,
  //   //     calcMethod: nextItem.calcMethod,
  //   //     openningBalanceDepit: nextItem.openningBalanceDepit,
  //   //     openningBalanceCredit: nextItem.openningBalanceCredit,
  //   //     accCurrTrancDepit: nextItem.accCurrTrancDepit,
  //   //     accCurrTrancCredit: nextItem.accCurrTrancCredit,
  //   //     accTotalDebit: nextItem.accTotalDebit,
  //   //     accTotaCredit: nextItem.accTotaCredit,
  //   //     balanceDebitLocal: nextItem.balanceDebitLocal,
  //   //     balanceCreditLocal: nextItem.balanceCreditLocal,
  //   //     openningBalanceDepitCurncy: nextItem.openningBalanceDepitCurncy,
  //   //     openningBalanceCreditCurncy: nextItem.openningBalanceCreditCurncy,
  //   //     accCurrTrancDepitCurncy: nextItem.accCurrTrancDepitCurncy,
  //   //     accCurrTrancCreditCurncy: nextItem.accCurrTrancCreditCurncy,
  //   //     accTotalDebitCurncy: nextItem.accTotalDebitCurncy,
  //   //     accTotaCreditCurncy: nextItem.accTotaCreditCurncy,
  //   //     balanceDebitCurncy: nextItem.balanceDebitCurncy,
  //   //     balanceCreditCurncy: nextItem.balanceCreditCurncy,
  //   //     remarksA: nextItem.remarksA,
  //   //     remarksE: nextItem.remarksE,
  //   //     currencyId: nextItem.currencyId,
  //   //     accountStopped: nextItem.accountStopped,
  //   //     rate: nextItem.rate
  //   //   });
  //   // }

  // }

  getNextRowData(){
    const index = this.allAccountsGuide.findIndex(p=>p.accountId == this.AccountGuideForm.value.accountId);
    const nextItem = this.allAccountsGuide[index + 1];
    if(nextItem){
      this.AccountGuideForm.setValue({
        accountId: nextItem.accountId,
        accountCode: nextItem.accountCode,
        accountNameA: nextItem.accountNameA,
        accountNameE: nextItem.accountNameE,
        mainAccountId: nextItem.mainAccountId,
        accountLevel: null,
        accountNature: nextItem.accountNature,
        accountType: nextItem.accountType,
        accountGroup: nextItem.accountGroup,
        accCashFlow: nextItem.accCashFlow,
        calcMethod: nextItem.calcMethod,
        openningBalanceDepit: nextItem.openningBalanceDepit,
        openningBalanceCredit: nextItem.openningBalanceCredit,
        accCurrTrancDepit: nextItem.accCurrTrancDepit,
        accCurrTrancCredit: nextItem.accCurrTrancCredit,
        accTotalDebit: nextItem.accTotalDebit,
        accTotaCredit: nextItem.accTotaCredit,
        balanceDebitLocal: nextItem.balanceDebitLocal,
        balanceCreditLocal: nextItem.balanceCreditLocal,
        openningBalanceDepitCurncy: nextItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: nextItem.openningBalanceCreditCurncy,
        accCurrTrancDepitCurncy: nextItem.accCurrTrancDepitCurncy,
        accCurrTrancCreditCurncy: nextItem.accCurrTrancCreditCurncy,
        accTotalDebitCurncy: nextItem.accTotalDebitCurncy,
        accTotaCreditCurncy: nextItem.accTotaCreditCurncy,
        balanceDebitCurncy: nextItem.balanceDebitCurncy,
        balanceCreditCurncy: nextItem.balanceCreditCurncy,
        remarksA: nextItem.remarksA,
        remarksE: nextItem.remarksE,
        currencyId: nextItem.currencyId,
        accountStopped: nextItem.accountStopped,
        rate: nextItem.rate
      });
      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
  
      const LastItem = this.allAccountsGuide.findIndex(p=>p.accountId == this.AccountGuideForm.value.accountId);
  
      if(this.allAccountsGuide.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;
      }
      this.DisabledPrevButton = false;
    }

  }


  // getNextRowData(){
  //   const index = this.allAccountsGuide.findIndex(p=>p.accountId == this.AccountGuideForm.value.accountId);
  //   const currentAccount = this.allAccountsGuide[index + 1];

  //   console.log("currentAccount",currentAccount);

  //   if (currentAccount.children && this.currentChildIndex < currentAccount.children.length - 1) {
  //     this.currentChildIndex++;
  //     const nextChildAccount = currentAccount.children[this.currentChildIndex];
  //     console.log("nextChildAccount",nextChildAccount)
  //     this.AccountGuideForm.patchValue({ accountId: nextChildAccount.accountId });
  //   } else {
  //     // Move to the next parent account
  //     this.currentIndex++;
  //     this.currentChildIndex = -1; // Reset child index for the new parent

  //     if (this.currentIndex < this.allAccountsGuide.length) {
  //       const nextParentAccount = this.allAccountsGuide[this.currentIndex];
  //       this.AccountGuideForm.patchValue({ accountId: nextParentAccount.accountId });
  //     } else {
  //       // Reset to start if at the end of the array
  //       this.currentIndex = 0;
  //       this.AccountGuideForm.patchValue({ accountId: this.allAccountsGuide[this.currentIndex].accountId });
  //     }
  //   }
  // }

 

  getFirstRowData(){
  const firstItem = this.allAccountsGuide[0];
  if(firstItem){
    this.AccountGuideForm.setValue({
      accountId: firstItem.accountId,
      accountCode: firstItem.accountCode,
      accountNameA: firstItem.accountNameA,
      accountNameE: firstItem.accountNameE,
      mainAccountId: firstItem.mainAccountId,
      accountLevel: null,
      accountNature: firstItem.accountNature,
      accountType: firstItem.accountType,
      accountGroup: firstItem.accountGroup,
      accCashFlow: firstItem.accCashFlow,
      calcMethod: firstItem.calcMethod,
      openningBalanceDepit: firstItem.openningBalanceDepit,
      openningBalanceCredit: firstItem.openningBalanceCredit,
      accCurrTrancDepit: firstItem.accCurrTrancDepit,
      accCurrTrancCredit: firstItem.accCurrTrancCredit,
      accTotalDebit: firstItem.accTotalDebit,
      accTotaCredit: firstItem.accTotaCredit,
      balanceDebitLocal: firstItem.balanceDebitLocal,
      balanceCreditLocal: firstItem.balanceCreditLocal,
      openningBalanceDepitCurncy: firstItem.openningBalanceDepitCurncy,
      openningBalanceCreditCurncy: firstItem.openningBalanceCreditCurncy,
      accCurrTrancDepitCurncy: firstItem.accCurrTrancDepitCurncy,
      accCurrTrancCreditCurncy: firstItem.accCurrTrancCreditCurncy,
      accTotalDebitCurncy: firstItem.accTotalDebitCurncy,
      accTotaCreditCurncy: firstItem.accTotaCreditCurncy,
      balanceDebitCurncy: firstItem.balanceDebitCurncy,
      balanceCreditCurncy: firstItem.balanceCreditCurncy,
      remarksA: firstItem.remarksA,
      remarksE: firstItem.remarksE,
      currencyId: firstItem.currencyId,
      accountStopped: firstItem.accountStopped,
      rate: firstItem.rate
    });
    this.firstRow = true;
    this.lastRow = false;
    this.DisabledPrevButton = true;
    this.DisabledNextButton = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;
  }
  }

  undo(){
    this.AccountGuideForm.disable();
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.DeleteDisable = true;
    this.UpdateDisable = true;
    this.SaveDisable = true;
    this.UndoDisabled = true;

    if(this.undoItem.accountId != null){
      this.DeleteDisable = false;
      this.UpdateDisable = false;
      this.AccountGuideForm.setValue({
        accountId: this.undoItem.accountId,
        accountCode: this.undoItem.accountCode,
        accountNameA: this.undoItem.accountNameA,
        accountNameE: this.undoItem.accountNameE,
        mainAccountId: this.undoItem.mainAccountId,
        accountLevel: null,
        accountNature: this.undoItem.accountNature,
        accountType: this.undoItem.accountType,
        accountGroup: this.undoItem.accountGroup,
        accCashFlow: this.undoItem.accCashFlow,
        calcMethod: this.undoItem.calcMethod,
        openningBalanceDepit: this.undoItem.openningBalanceDepit,
        openningBalanceCredit: this.undoItem.openningBalanceCredit,
        accCurrTrancDepit: this.undoItem.accCurrTrancDepit,
        accCurrTrancCredit: this.undoItem.accCurrTrancCredit,
        accTotalDebit: this.undoItem.accTotalDebit,
        accTotaCredit: this.undoItem.accTotaCredit,
        balanceDebitLocal: this.undoItem.balanceDebitLocal,
        balanceCreditLocal: this.undoItem.balanceCreditLocal,
        openningBalanceDepitCurncy: this.undoItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: this.undoItem.openningBalanceCreditCurncy,
        accCurrTrancDepitCurncy: this.undoItem.accCurrTrancDepitCurncy,
        accCurrTrancCreditCurncy: this.undoItem.accCurrTrancCreditCurncy,
        accTotalDebitCurncy: this.undoItem.accTotalDebitCurncy,
        accTotaCreditCurncy: this.undoItem.accTotaCreditCurncy,
        balanceDebitCurncy: this.undoItem.balanceDebitCurncy,
        balanceCreditCurncy: this.undoItem.balanceCreditCurncy,
        remarksA: this.undoItem.remarksA,
        remarksE: this.undoItem.remarksE,
        currencyId: this.undoItem.currencyId,
        accountStopped: this.undoItem.accountStopped,
        rate: this.undoItem.rate
      });
    }
  }

  updateAccount(){
    this.AccountGuideForm.enable();
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
    this.undoItem = this.AccountGuideForm.value;
  }

  New(){
    this.AccountGuideForm.enable();
    this.undoItem = this.AccountGuideForm.value;
    if(this.AccountItem != null){
      this.AccountGuideForm.setValue({
        accountId: null,
        accountCode: this.AccountItem.accountCode + 1,
        accountNameA: this.AccountItem.accountNameA + "-",
        accountNameE:  this.AccountItem.accountNameE ? this.AccountItem.accountNameE + "-" : null,
        mainAccountId: this.AccountItem.accountId,
        accountLevel: this.AccountItem.level + 2,
        accountNature: 1,
        accountType: 4,
        accountGroup: 1,
        accCashFlow: 1,
        calcMethod: this.AccountItem.calcMethod,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        accCurrTrancDepit: null,
        accCurrTrancCredit: null,
        accTotalDebit: null,
        accTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        accCurrTrancDepitCurncy: null,
        accCurrTrancCreditCurncy: null,
        accTotalDebitCurncy: null,
        accTotaCreditCurncy: null,
        balanceDebitCurncy: null,
        balanceCreditCurncy: null,
        remarksA: null,
        remarksE: null,
        currencyId: null,
        accountStopped: null,
        rate: null
      });
      // this.AccountGuideForm.controls['calcMethod'].disable();

    }else{
      this.AccountGuideForm.setValue({
        accountId: null,
        accountCode: null,
        accountNameA: null,
        accountNameE: null,
        mainAccountId: null,
        accountLevel: null,
        accountNature: 1,
        accountType: 1,
        accountGroup: 1,
        accCashFlow: 1,
        calcMethod: true,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        accCurrTrancDepit: null,
        accCurrTrancCredit: null,
        accTotalDebit: null,
        accTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        accCurrTrancDepitCurncy: null,
        accCurrTrancCreditCurncy: null,
        accTotalDebitCurncy: null,
        accTotaCreditCurncy: null,
        balanceDebitCurncy: null,
        balanceCreditCurncy: null,
        remarksA: null,
        remarksE: null,
        currencyId: null,
        accountStopped: null,
        rate: null
      });
      // this.AccountGuideForm.controls['calcMethod'].enable();

    }
   
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

 
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    if (value.trim() === '') {
      this.dataSource.data = this.allAccountsGuide; 
    } else {
      this.DataFilter = this.allAccountsGuide
      .filter(i => i.accountNameA.includes(value));
      this.dataSource.data = this.DataFilter;
    }
  }
  
  getAllUsers(){
    this.AccountsService.GetAllUsers().subscribe(res=>{
      this.AllUsers = res
    })
  }

  
 Open_delete_confirm() {
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.AccountsService.DeleteAccountChart(this.AccountGuideForm.value.accountId).subscribe(res=>{
        if(res){
          this.GetAllAccountsGuide();
          this.AccountGuideForm.setValue({
            accountId: null,
            accountCode: null,
            accountNameA: null,
            accountNameE: null,
            mainAccountId: null,
            accountLevel: null,
            accountNature: null,
            accountType: null,
            accountGroup: null,
            accCashFlow: null,
            calcMethod: null,
            openningBalanceDepit: null,
            openningBalanceCredit: null,
            accCurrTrancDepit: null,
            accCurrTrancCredit: null,
            accTotalDebit: null,
            accTotaCredit: null,
            balanceDebitLocal: null,
            balanceCreditLocal: null,
            openningBalanceDepitCurncy: null,
            openningBalanceCreditCurncy: null,
            accCurrTrancDepitCurncy: null,
            accCurrTrancCreditCurncy: null,
            accTotalDebitCurncy: null,
            accTotaCreditCurncy: null,
            balanceDebitCurncy: null,
            balanceCreditCurncy: null,
            remarksA: null,
            remarksE: null,
            currencyId: null,
            accountStopped: null,
            rate: null
          })
          this.DeleteDisable = true;
          this.UpdateDisable = true;
          
        }
      })
         
    }
  });
}

onTabChanged(event: MatTabChangeEvent) {
  if (event.tab.textLabel === 'المستخدمين') {
    this.getAllUsers();
    this.GetAllAccountUsers();
  }
}

CalAccountUsersFormSumbit(){

  const accountId = this.AccountGuideForm.get('accountId')?.value;
  if (accountId !== null && accountId !== undefined) {
    this.CalAccountUsersForm.get('accountId')?.setValue(accountId);
  }
  this.AccountsService.AddCalAccountUser(this.CalAccountUsersForm.value).subscribe(res=>{
    if(res.status){
      this.GetAllAccountUsers();
    }
  })
}

GetAllAccountUsers() {
  this.AccountsService.GetAllAccountUsers().subscribe({
    next: (res) => {
      this.AllAccountUsers = res;
      this.tableDataSource = new MatTableDataSource<any>(this.AllAccountUsers);
      this.tableDataSource.sort = this.sort;
    },
    error: (err) => {
      console.error('Error occurred while fetching account users:', err);
    },
    complete: () => {
      this.tableDataSource.paginator = this.paginator;
    }
  });
}


fillForm(row:any){
 if(row){
  this.CalAccountUsersForm.setValue({
    accUserId: row.accUserId,
    accountId: row.accountId,
    userId: row.userId,
    approvedBy: row.approvedBy,
    remarks1: row.remarks1,
    accountCode: row.accountCode,
    accountName: row.accountName
  })
  window.scrollTo({ top: 30, behavior: 'smooth' });

 }
}

FilterTablechange(data: Event){
  const value = (data.target as HTMLInputElement).value;
  this.tableDataSource.filter = value;
}

deleteCalAccontUser(accUserId:number){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.AccountsService.DeleteAccountUser(this.CalAccountUsersForm.value.accUserId).subscribe(res=>{
        if(res){
          this.GetAllAccountUsers();
          this.CalAccountUsersForm.setValue({
            accUserId: null,
            accountId: null,
            userId: null,
            approvedBy: null,
            remarks1: null,
            accountCode: null,
            accountName: null
          })
        }
      })
         
    }
  });
}

}
