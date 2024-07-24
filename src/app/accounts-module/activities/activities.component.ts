import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';
import { AccountsModuleServicesService } from '../accounts-module-services.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit{

  allActivities : any[] = [];
  dataSource:any;
  AllCurrency:any[]=[];

  DisabledPrevButton: boolean = false;
  DisabledNextButton: boolean = false;
  firstRow: boolean = false;
  lastRow: boolean = false;
  DeleteDisable :boolean = true;
  SaveDisable : boolean = true;
  UpdateDisable : boolean = true;

  EditReadonly : boolean = false;
  reloadDisabled : boolean = true;
  UndoDisabled : boolean = true;
  undoIndex!: number;
  undoItem:any;

  DataFilter :any;
  allActivitiesForSelect : any[] = [];
  AllSysAnalyticalCodes : any[] = [];

  CostCenterItem : any;
  
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      activeId: node.activeId,
      activeCode:node.activeCode,
      mainActiveId:node.mainActiveId,
      activeNameA : node.activeNameA,
      activeNameE : node.activeNameE,
      activeLevel : node.activeLevel,
      activeCategory : node.activeCategory,
      activeType : node.activeType,
      cashFlowList:node.cashFlowList,
      remarksA:node.remarksA,
      rate:node.rate,
      jopDesc:node.jopDesc,
      currencyId:node.currencyId,
      accActiveId:node.accActiveId,
      openningBalanceDepit: node.openningBalanceDepit,
      openningBalanceCredit: node.openningBalanceCredit,
      activeCurrTrancDepit: node.activeCurrTrancDepit,
      activeCurrTrancCredit: node.activeCurrTrancCredit,
      activeTotalDebit: node.activeTotalDebit,
      balanceDebitLocal: node.balanceDebitLocal,
      balanceCreditLocal: node.balanceCreditLocal,
      openningBalanceDepitCurncy: node.openningBalanceDepitCurncy,
      openningBalanceCreditCurncy: node.openningBalanceCreditCurncy,
      activeTotalDebitCurncy: node.activeTotalDebitCurncy,
      balanceDebitCurncy: node.balanceDebitCurncy,
      balanceCreditCurncy: node.balanceCreditCurncy,
      activeTotaCredit: node.activeTotaCredit,
      activeCurrTrancDepitCurncy: node.activeCurrTrancDepitCurncy,
      activeCurrTrancCreditCurncy: node.activeCurrTrancCreditCurncy,
      activeTotaCreditCurncy: node.activeTotaCreditCurncy,
      aid:node.aid,
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



  constructor(private AccountsService : AccountsModuleServicesService,private fb:FormBuilder,private dialog: MatDialog){

  }

  hasChild = (_: number, node: any) => node.expandable;


  ngOnInit(): void {
    this.ActivityForm.disable();
    this.GetAllCurrency();
    this.GetAllActivities();
    this.GetAllActivitiesForSelect();
    this.GetAllSys_AnalyticalCodes();
  }

  ActivityForm = this.fb.group({
    activeId:[],
    activeCode :[,Validators.required],
    activeNameA :['',Validators.required],
    activeNameE :[''],
    mainActiveId:[],
    activeLevel:[],
    activeCategory:[1],
    activeType:[1],
    cashFlowList:[1],
    jopDesc:[1],
    accActiveId:[],
    openningBalanceDepit:[],
    openningBalanceCredit:[],
    activeCurrTrancDepit:[],
    activeCurrTrancCredit:[],
    activeTotalDebit:[],
    activeTotaCredit:[],
    balanceDebitLocal:[],
    balanceCreditLocal:[],
    openningBalanceDepitCurncy:[],
    openningBalanceCreditCurncy:[],
    activeCurrTrancDepitCurncy:[],
    activeCurrTrancCreditCurncy:[],
    activeTotalDebitCurncy:[],
    activeTotaCreditCurncy:[],
    balanceDebitCurncy:[],
    balanceCreditCurncy:[],
    remarksA:[''],
    currencyId:[,Validators.required],
    rate:[],
    aid:[],
  })

  
  GetAllActivities(){
    this.AccountsService.GetAllActivities().subscribe(res=>{
      this.allActivities = res;
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = this.allActivities;
    })
  }

  GetAllCurrency(){
    this.AccountsService.GetAllCurrency().subscribe(res=>{
      this.AllCurrency=res;
    })
   }



  getLastRowData(){
    const LastItem = this.allActivities[this.allActivities.length-1];
    if(LastItem){
      this.ActivityForm.setValue({
        activeId: LastItem.activeId,
        activeCode: LastItem.activeCode,
        activeNameA: LastItem.activeNameA,
        activeNameE: LastItem.activeNameE,
        mainActiveId: LastItem.mainActiveId,
        activeLevel: LastItem.activeLevel,
        activeCategory: LastItem.activeCategory,
        activeType: LastItem.activeType,
        cashFlowList: LastItem.cashFlowList,
        jopDesc: LastItem.jopDesc,
        accActiveId: LastItem.accActiveId,
        openningBalanceDepit: LastItem.openningBalanceDepit,
        openningBalanceCredit: LastItem.openningBalanceCredit,
        activeCurrTrancDepit: LastItem.activeCurrTrancDepit,
        activeCurrTrancCredit: LastItem.activeCurrTrancCredit,
        activeTotalDebit: LastItem.activeTotalDebit,
        activeTotaCredit: LastItem.activeTotaCredit,
        balanceDebitLocal: LastItem.balanceDebitLocal,
        balanceCreditLocal: LastItem.balanceCreditLocal,
        openningBalanceDepitCurncy: LastItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: LastItem.openningBalanceCreditCurncy,
        activeCurrTrancDepitCurncy: LastItem.activeCurrTrancDepitCurncy,
        activeCurrTrancCreditCurncy: LastItem.activeCurrTrancCreditCurncy,
        activeTotalDebitCurncy: LastItem.activeTotalDebitCurncy,
        activeTotaCreditCurncy: LastItem.activeTotaCreditCurncy,
        balanceDebitCurncy: LastItem.balanceDebitCurncy,
        balanceCreditCurncy: LastItem.balanceCreditCurncy,
        remarksA: LastItem.remarksA,
        currencyId: LastItem.currencyId,
        rate: LastItem.rate,
        aid: LastItem.aid
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
    const index = this.allActivities.findIndex(p=>p.activeId == this.ActivityForm.value.activeId);
    const nextItem = this.allActivities[index + 1];
    if(nextItem){
      this.ActivityForm.setValue({
        activeId: nextItem.activeId,
        activeCode: nextItem.activeCode,
        activeNameA: nextItem.activeNameA,
        activeNameE: nextItem.activeNameE,
        mainActiveId: nextItem.mainActiveId,
        activeLevel: nextItem.activeLevel,
        activeCategory: nextItem.activeCategory,
        activeType: nextItem.activeType,
        cashFlowList: nextItem.cashFlowList,
        jopDesc: nextItem.jopDesc,
        accActiveId: nextItem.accActiveId,
        openningBalanceDepit: nextItem.openningBalanceDepit,
        openningBalanceCredit: nextItem.openningBalanceCredit,
        activeCurrTrancDepit: nextItem.activeCurrTrancDepit,
        activeCurrTrancCredit: nextItem.activeCurrTrancCredit,
        activeTotalDebit: nextItem.activeTotalDebit,
        activeTotaCredit: nextItem.activeTotaCredit,
        balanceDebitLocal: nextItem.balanceDebitLocal,
        balanceCreditLocal: nextItem.balanceCreditLocal,
        openningBalanceDepitCurncy: nextItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: nextItem.openningBalanceCreditCurncy,
        activeCurrTrancDepitCurncy: nextItem.activeCurrTrancDepitCurncy,
        activeCurrTrancCreditCurncy: nextItem.activeCurrTrancCreditCurncy,
        activeTotalDebitCurncy: nextItem.activeTotalDebitCurncy,
        activeTotaCreditCurncy: nextItem.activeTotaCreditCurncy,
        balanceDebitCurncy: nextItem.balanceDebitCurncy,
        balanceCreditCurncy: nextItem.balanceCreditCurncy,
        remarksA: nextItem.remarksA,
        currencyId: nextItem.currencyId,
        rate: nextItem.rate,
        aid: nextItem.aid
      });
     this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
  
      const LastItem = this.allActivities.findIndex(p=>p.activeId == this.ActivityForm.value.activeId);
  
      if(this.allActivities.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;
      }
      this.DisabledPrevButton = false;
    }

  }


  getPrevRowData(){
    const index = this.allActivities.findIndex(p=>p.activeId == this.ActivityForm.value.activeId);
    const PrevItem = this.allActivities[index - 1];
    if(PrevItem == null){
      this.DisabledPrevButton = true;
    }
    
    if(PrevItem){
      this.ActivityForm.setValue({
        activeId: PrevItem.activeId,
        activeCode: PrevItem.activeCode,
        activeNameA: PrevItem.activeNameA,
        activeNameE: PrevItem.activeNameE,
        mainActiveId: PrevItem.mainActiveId,
        activeLevel: PrevItem.activeLevel,
        activeCategory: PrevItem.activeCategory,
        activeType: PrevItem.activeType,
        cashFlowList: PrevItem.cashFlowList,
        jopDesc: PrevItem.jopDesc,
        accActiveId: PrevItem.accActiveId,
        openningBalanceDepit: PrevItem.openningBalanceDepit,
        openningBalanceCredit: PrevItem.openningBalanceCredit,
        activeCurrTrancDepit: PrevItem.activeCurrTrancDepit,
        activeCurrTrancCredit: PrevItem.activeCurrTrancCredit,
        activeTotalDebit: PrevItem.activeTotalDebit,
        activeTotaCredit: PrevItem.activeTotaCredit,
        balanceDebitLocal: PrevItem.balanceDebitLocal,
        balanceCreditLocal: PrevItem.balanceCreditLocal,
        openningBalanceDepitCurncy: PrevItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: PrevItem.openningBalanceCreditCurncy,
        activeCurrTrancDepitCurncy: PrevItem.activeCurrTrancDepitCurncy,
        activeCurrTrancCreditCurncy: PrevItem.activeCurrTrancCreditCurncy,
        activeTotalDebitCurncy: PrevItem.activeTotalDebitCurncy,
        activeTotaCreditCurncy: PrevItem.activeTotaCreditCurncy,
        balanceDebitCurncy: PrevItem.balanceDebitCurncy,
        balanceCreditCurncy: PrevItem.balanceCreditCurncy,
        remarksA: PrevItem.remarksA,
        currencyId: PrevItem.currencyId,
        rate: PrevItem.rate,
        aid: PrevItem.aid
      });
   
    this.firstRow = false;
    this.lastRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const firstItem = this.allActivities.findIndex(p=>p.activeId == this.ActivityForm.value.activeId);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
     
    this.DisabledNextButton = false;
    }

    
  }

  getFirstRowData(){
    const firstItem = this.allActivities[0];
    if(firstItem){
      this.ActivityForm.setValue({
        activeId: firstItem.activeId,
        activeCode: firstItem.activeCode,
        activeNameA: firstItem.activeNameA,
        activeNameE: firstItem.activeNameE,
        mainActiveId: firstItem.mainActiveId,
        activeLevel: firstItem.activeLevel,
        activeCategory: firstItem.activeCategory,
        activeType: firstItem.activeType,
        cashFlowList: firstItem.cashFlowList,
        jopDesc: firstItem.jopDesc,
        accActiveId: firstItem.accActiveId,
        openningBalanceDepit: firstItem.openningBalanceDepit,
        openningBalanceCredit: firstItem.openningBalanceCredit,
        activeCurrTrancDepit: firstItem.activeCurrTrancDepit,
        activeCurrTrancCredit: firstItem.activeCurrTrancCredit,
        activeTotalDebit: firstItem.activeTotalDebit,
        activeTotaCredit: firstItem.activeTotaCredit,
        balanceDebitLocal: firstItem.balanceDebitLocal,
        balanceCreditLocal: firstItem.balanceCreditLocal,
        openningBalanceDepitCurncy: firstItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: firstItem.openningBalanceCreditCurncy,
        activeCurrTrancDepitCurncy: firstItem.activeCurrTrancDepitCurncy,
        activeCurrTrancCreditCurncy: firstItem.activeCurrTrancCreditCurncy,
        activeTotalDebitCurncy: firstItem.activeTotalDebitCurncy,
        activeTotaCreditCurncy: firstItem.activeTotaCreditCurncy,
        balanceDebitCurncy: firstItem.balanceDebitCurncy,
        balanceCreditCurncy: firstItem.balanceCreditCurncy,
        remarksA: firstItem.remarksA,
        currencyId: firstItem.currencyId,
        rate: firstItem.rate,
        aid: firstItem.aid
      });
      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
    }


  }

  Open_delete_confirm() {
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.AccountsService.DeleteActivity(this.ActivityForm.value.activeId).subscribe(res=>{
          if(res){
            this.GetAllActivities();
            this.GetAllActivitiesForSelect();
            this.ActivityForm.setValue({
              activeId: null,
              activeCode: null,
              activeNameA: null,
              activeNameE: null,
              mainActiveId: null,
              activeLevel: null,
              activeCategory: null,
              activeType: null,
              cashFlowList: null,
              jopDesc: null,
              accActiveId: null,
              openningBalanceDepit: null,
              openningBalanceCredit: null,
              activeCurrTrancDepit: null,
              activeCurrTrancCredit: null,
              activeTotalDebit: null,
              activeTotaCredit: null,
              balanceDebitLocal: null,
              balanceCreditLocal: null,
              openningBalanceDepitCurncy: null,
              openningBalanceCreditCurncy: null,
              activeCurrTrancDepitCurncy: null,
              activeCurrTrancCreditCurncy: null,
              activeTotalDebitCurncy: null,
              activeTotaCreditCurncy: null,
              balanceDebitCurncy: null,
              balanceCreditCurncy: null,
              remarksA: null,
              currencyId: null,
              rate: null,
              aid: null
            })
            this.DeleteDisable = true;
            this.UpdateDisable = true;
            
          }
        })
           
      }
    });
  }
  

  undo(){
    this.ActivityForm.disable();
    if(this.undoItem){
      this.ActivityForm.setValue({
        activeId: this.undoItem.activeId,
        activeCode: this.undoItem.activeCode,
        activeNameA: this.undoItem.activeNameA,
        activeNameE: this.undoItem.activeNameE,
        mainActiveId: this.undoItem.mainActiveId,
        activeLevel: this.undoItem.activeLevel,
        activeCategory: this.undoItem.activeCategory,
        activeType: this.undoItem.activeType,
        cashFlowList: this.undoItem.cashFlowList,
        jopDesc: this.undoItem.jopDesc,
        accActiveId: this.undoItem.accActiveId,
        openningBalanceDepit: this.undoItem.openningBalanceDepit,
        openningBalanceCredit: this.undoItem.openningBalanceCredit,
        activeCurrTrancDepit: this.undoItem.activeCurrTrancDepit,
        activeCurrTrancCredit: this.undoItem.activeCurrTrancCredit,
        activeTotalDebit: this.undoItem.activeTotalDebit,
        activeTotaCredit: this.undoItem.activeTotaCredit,
        balanceDebitLocal: this.undoItem.balanceDebitLocal,
        balanceCreditLocal: this.undoItem.balanceCreditLocal,
        openningBalanceDepitCurncy: this.undoItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: this.undoItem.openningBalanceCreditCurncy,
        activeCurrTrancDepitCurncy: this.undoItem.activeCurrTrancDepitCurncy,
        activeCurrTrancCreditCurncy: this.undoItem.activeCurrTrancCreditCurncy,
        activeTotalDebitCurncy: this.undoItem.activeTotalDebitCurncy,
        activeTotaCreditCurncy: this.undoItem.activeTotaCreditCurncy,
        balanceDebitCurncy: this.undoItem.balanceDebitCurncy,
        balanceCreditCurncy: this.undoItem.balanceCreditCurncy,
        remarksA: this.undoItem.remarksA,
        currencyId: this.undoItem.currencyId,
        rate: this.undoItem.rate,
        aid: this.undoItem.aid
      });
    }else{
      this.ActivityForm.setValue({
        activeId: null,
        activeCode: null,
        activeNameA: null,
        activeNameE: null,
        mainActiveId: null,
        activeLevel: null,
        activeCategory: null,
        activeType: null,
        cashFlowList: null,
        jopDesc: null,
        accActiveId: null,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        activeCurrTrancDepit: null,
        activeCurrTrancCredit: null,
        activeTotalDebit: null,
        activeTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        activeCurrTrancDepitCurncy: null,
        activeCurrTrancCreditCurncy: null,
        activeTotalDebitCurncy: null,
        activeTotaCreditCurncy: null,
        balanceDebitCurncy: null,
        balanceCreditCurncy: null,
        remarksA: null,
        currencyId: null,
        rate: null,
        aid: null
      })
    }
    
    this.UpdateDisable = false;
    this.DisabledNextButton = false;
    this.DisabledPrevButton = false;
    this.lastRow = false;
    this.firstRow = false;
    this.reloadDisabled = false;
    this.SaveDisable = true;
    this.UndoDisabled = true;
    this.DeleteDisable = false;
  }

  updateActivity(){
    this.ActivityForm.enable();
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
    this.undoItem = this.ActivityForm.value;
  }

  New(){
    this.ActivityForm.enable();
    this.undoItem = this.ActivityForm.value;
    if(this.CostCenterItem != null){
      this.ActivityForm.setValue({
        activeId: null,
        activeCode: this.CostCenterItem.activeCode + 1,
        activeNameA: this.CostCenterItem.activeNameA  + "-",
        activeNameE: this.CostCenterItem.activeNameE ? this.CostCenterItem.activeNameE + "-" : null,
        mainActiveId: this.CostCenterItem.activeId,
        activeLevel: this.CostCenterItem.level + 2,
        activeCategory: 1,
        activeType: 2,
        cashFlowList: 1,
        jopDesc: 1,
        accActiveId: null,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        activeCurrTrancDepit: null,
        activeCurrTrancCredit: null,
        activeTotalDebit: null,
        activeTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        activeCurrTrancDepitCurncy: null,
        activeCurrTrancCreditCurncy: null,
        activeTotalDebitCurncy: null,
        activeTotaCreditCurncy: null,
        balanceDebitCurncy: null,
        balanceCreditCurncy: null,
        remarksA: null,
        currencyId: null,
        rate: null,
        aid: null
      });
    }else{
      this.ActivityForm.setValue({
        activeId: null,
        activeCode: null,
        activeNameA: null,
        activeNameE: null,
        mainActiveId: null,
        activeLevel: null,
        activeCategory: null,
        activeType: 1,
        cashFlowList: 1,
        jopDesc: 1,
        accActiveId: null,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        activeCurrTrancDepit: null,
        activeCurrTrancCredit: null,
        activeTotalDebit: null,
        activeTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        activeCurrTrancDepitCurncy: null,
        activeCurrTrancCreditCurncy: null,
        activeTotalDebitCurncy: null,
        activeTotaCreditCurncy: null,
        balanceDebitCurncy: null,
        balanceCreditCurncy: null,
        remarksA: null,
        currencyId: null,
        rate: null,
        aid: null
      });
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

  
  handleNodeClick(node: any) {
    if(node){
      this.CostCenterItem = node,
      this.ActivityForm.setValue({
        activeId: node.activeId,
        activeCode: node.activeCode,
        activeNameA: node.activeNameA,
        activeNameE: node.activeNameE,
        mainActiveId: node.mainActiveId,
        activeLevel: node.level + 1,
        activeCategory: node.activeCategory,
        activeType: node.activeType,
        cashFlowList: node.cashFlowList,
        accActiveId: node.accActiveId,
        openningBalanceDepit: node.openningBalanceDepit,
        openningBalanceCredit: node.openningBalanceCredit,
        activeCurrTrancDepit: node.activeCurrTrancDepit,
        activeCurrTrancCredit: node.activeCurrTrancCredit,
        activeTotalDebit: node.activeTotalDebit,
        balanceDebitLocal: node.balanceDebitLocal,
        balanceCreditLocal: node.balanceCreditLocal,
        openningBalanceDepitCurncy: node.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: node.openningBalanceCreditCurncy,
        activeTotalDebitCurncy: node.activeTotalDebitCurncy,
        balanceDebitCurncy: node.balanceDebitCurncy,
        balanceCreditCurncy: node.balanceCreditCurncy,
        remarksA: node.remarksA,
        currencyId: node.currencyId,
        rate: node.rate,
        jopDesc: node.jopDesc,
        activeTotaCredit: node.activeTotaCredit,
        activeCurrTrancDepitCurncy: node.activeCurrTrancDepitCurncy,
        activeCurrTrancCreditCurncy: node.activeCurrTrancCreditCurncy,
        activeTotaCreditCurncy: node.activeTotaCreditCurncy,
        aid: node.aid,
      })
  
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      window.scrollTo({ top: 30, behavior: 'smooth' });

      const valuesToCheck = [
        node.openningBalanceDepit,
        node.openningBalanceCredit,
        node.activeCurrTrancDepit,
        node.accCurrTrancCredit,
        node.activeTotalDebit,
        node.accTotaCredit,
        node.balanceDebitLocal,
        node.balanceCreditLocal,
        node.openningBalanceDepitCurncy,
        node.openningBalanceCreditCurncy,
        node.activeCurrTrancDepitCurncy,
        node.accCurrTrancCreditCurncy,
        node.activeTotalDebitCurncy,
        node.accTotaCreditCurncy,
        node.balanceDebitCurncy,
        node.balanceCreditCurncy
      ];
      
      if (valuesToCheck.some(value => value !== 0)) {
        this.ActivityForm.controls['currencyId'].disable();
      }
      


    }
  }

  Filterchange(data: Event){
    const value = (data.target as HTMLInputElement).value;
    if (value.trim() === '') {
      this.dataSource.data = this.allActivities; 
    } else {
      this.DataFilter = this.allActivities
      .filter(i => i.activeNameA.includes(value));
      this.dataSource.data = this.DataFilter;
    }
  }

  GetAllActivitiesForSelect(){
    this.AccountsService.GetAllActivitiesForSelect().subscribe(res=>{
      this.allActivitiesForSelect = res;
    })
  }

  MainAccountData(account:any){
    // this.AccountGuideForm.get("calcMethod")?.setValue(account.calcMethod);
    // this.AccountGuideForm.get("accountType")?.setValue(4);

}

GetAllSys_AnalyticalCodes(){
  this.AccountsService.GetAllSys_AnalyticalCodes().subscribe(res=>{
    this.AllSysAnalyticalCodes = res;
  })
}


onSumbit(){
  this.AccountsService.AddActivity(this.ActivityForm.value).subscribe(res=>{
   if(res.status){
    this.GetAllActivities();
    this.GetAllActivitiesForSelect();
     this.ActivityForm.disable();
     this.CostCenterItem = this.ActivityForm.value
     this.ActivityForm.get('activeId')?.setValue(res.id)
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



}
