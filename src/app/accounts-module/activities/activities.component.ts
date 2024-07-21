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

  allCostCenter : any[] = [];
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
  allCostCenterForSelect : any[] = [];
  AllSysAnalyticalCodes : any[] = [];

  CostCenterItem : any;
  
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      costCenterId: node.costCenterId,
      costCenterCode:node.costCenterCode,
      mainCostCenterId:node.mainCostCenterId,
      costCenterNameA : node.costCenterNameA,
      costCenterNameE : node.costCenterNameE,
      costCenterLevel : node.costCenterLevel,
      centerCategory : node.centerCategory,
      costType : node.costType,
      cashFlowList:node.cashFlowList,
      remarksA:node.remarksA,
      rate:node.rate,
      jopDesc:node.jopDesc,
      currencyId:node.currencyId,
      accCostCenterId:node.accCostCenterId,
      openningBalanceDepit: node.openningBalanceDepit,
      openningBalanceCredit: node.openningBalanceCredit,
      costCenterCurrTrancDepit: node.costCenterCurrTrancDepit,
      costCenterCurrTrancCredit: node.costCenterCurrTrancCredit,
      costCenterTotalDebit: node.costCenterTotalDebit,
      balanceDebitLocal: node.balanceDebitLocal,
      balanceCreditLocal: node.balanceCreditLocal,
      openningBalanceDepitCurncy: node.openningBalanceDepitCurncy,
      openningBalanceCreditCurncy: node.openningBalanceCreditCurncy,
      costCenterTotalDebitCurncy: node.costCenterTotalDebitCurncy,
      balanceDebitCurncy: node.balanceDebitCurncy,
      balanceCreditCurncy: node.balanceCreditCurncy,
      costCenterTotaCredit: node.costCenterTotaCredit,
      costCenterCurrTrancDepitCurncy: node.costCenterCurrTrancDepitCurncy,
      costCenterCurrTrancCreditCurncy: node.costCenterCurrTrancCreditCurncy,
      costCenterTotaCreditCurncy: node.costCenterTotaCreditCurncy,
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
    this.calCostCenterForm.disable();
    this.GetAllCurrency();
    this.GetAllCostCenter();
    this.GetAllCostCenterForSelect();
    this.GetAllSys_AnalyticalCodes();
  }

  calCostCenterForm = this.fb.group({
    costCenterId:[],
    costCenterCode :[,Validators.required],
    costCenterNameA :['',Validators.required],
    costCenterNameE :[''],
    mainCostCenterId:[],
    costCenterLevel:[],
    centerCategory:[1],
    costType:[1],
    cashFlowList:[1],
    jopDesc:[1],
    accCostCenterId:[],
    openningBalanceDepit:[],
    openningBalanceCredit:[],
    costCenterCurrTrancDepit:[],
    costCenterCurrTrancCredit:[],
    costCenterTotalDebit:[],
    costCenterTotaCredit:[],
    balanceDebitLocal:[],
    balanceCreditLocal:[],
    openningBalanceDepitCurncy:[],
    openningBalanceCreditCurncy:[],
    costCenterCurrTrancDepitCurncy:[],
    costCenterCurrTrancCreditCurncy:[],
    costCenterTotalDebitCurncy:[],
    costCenterTotaCreditCurncy:[],
    balanceDebitCurncy:[],
    balanceCreditCurncy:[],
    remarksA:[''],
    currencyId:[,Validators.required],
    rate:[],
    aid:[],
  })

  
  GetAllCostCenter(){
    this.AccountsService.GEtAllCostCenter().subscribe(res=>{
      this.allCostCenter = res;
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = this.allCostCenter;
    })
  }

  GetAllCurrency(){
    this.AccountsService.GetAllCurrency().subscribe(res=>{
      this.AllCurrency=res;
    })
   }



  getLastRowData(){
    const LastItem = this.allCostCenter[this.allCostCenter.length-1];
    if(LastItem){
      this.calCostCenterForm.setValue({
        costCenterId: LastItem.costCenterId,
        costCenterCode: LastItem.costCenterCode,
        costCenterNameA: LastItem.costCenterNameA,
        costCenterNameE: LastItem.costCenterNameE,
        mainCostCenterId: LastItem.mainCostCenterId,
        costCenterLevel: LastItem.costCenterLevel,
        centerCategory: LastItem.centerCategory,
        costType: LastItem.costType,
        cashFlowList: LastItem.cashFlowList,
        jopDesc: LastItem.jopDesc,
        accCostCenterId: LastItem.accCostCenterId,
        openningBalanceDepit: LastItem.openningBalanceDepit,
        openningBalanceCredit: LastItem.openningBalanceCredit,
        costCenterCurrTrancDepit: LastItem.costCenterCurrTrancDepit,
        costCenterCurrTrancCredit: LastItem.costCenterCurrTrancCredit,
        costCenterTotalDebit: LastItem.costCenterTotalDebit,
        costCenterTotaCredit: LastItem.costCenterTotaCredit,
        balanceDebitLocal: LastItem.balanceDebitLocal,
        balanceCreditLocal: LastItem.balanceCreditLocal,
        openningBalanceDepitCurncy: LastItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: LastItem.openningBalanceCreditCurncy,
        costCenterCurrTrancDepitCurncy: LastItem.costCenterCurrTrancDepitCurncy,
        costCenterCurrTrancCreditCurncy: LastItem.costCenterCurrTrancCreditCurncy,
        costCenterTotalDebitCurncy: LastItem.costCenterTotalDebitCurncy,
        costCenterTotaCreditCurncy: LastItem.costCenterTotaCreditCurncy,
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
    const index = this.allCostCenter.findIndex(p=>p.costCenterId == this.calCostCenterForm.value.costCenterId);
    const nextItem = this.allCostCenter[index + 1];
    if(nextItem){
      this.calCostCenterForm.setValue({
        costCenterId: nextItem.costCenterId,
        costCenterCode: nextItem.costCenterCode,
        costCenterNameA: nextItem.costCenterNameA,
        costCenterNameE: nextItem.costCenterNameE,
        mainCostCenterId: nextItem.mainCostCenterId,
        costCenterLevel: nextItem.costCenterLevel,
        centerCategory: nextItem.centerCategory,
        costType: nextItem.costType,
        cashFlowList: nextItem.cashFlowList,
        jopDesc: nextItem.jopDesc,
        accCostCenterId: nextItem.accCostCenterId,
        openningBalanceDepit: nextItem.openningBalanceDepit,
        openningBalanceCredit: nextItem.openningBalanceCredit,
        costCenterCurrTrancDepit: nextItem.costCenterCurrTrancDepit,
        costCenterCurrTrancCredit: nextItem.costCenterCurrTrancCredit,
        costCenterTotalDebit: nextItem.costCenterTotalDebit,
        costCenterTotaCredit: nextItem.costCenterTotaCredit,
        balanceDebitLocal: nextItem.balanceDebitLocal,
        balanceCreditLocal: nextItem.balanceCreditLocal,
        openningBalanceDepitCurncy: nextItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: nextItem.openningBalanceCreditCurncy,
        costCenterCurrTrancDepitCurncy: nextItem.costCenterCurrTrancDepitCurncy,
        costCenterCurrTrancCreditCurncy: nextItem.costCenterCurrTrancCreditCurncy,
        costCenterTotalDebitCurncy: nextItem.costCenterTotalDebitCurncy,
        costCenterTotaCreditCurncy: nextItem.costCenterTotaCreditCurncy,
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
  
      const LastItem = this.allCostCenter.findIndex(p=>p.costCenterId == this.calCostCenterForm.value.costCenterId);
  
      if(this.allCostCenter.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;
      }
      this.DisabledPrevButton = false;
    }

  }


  getPrevRowData(){
    const index = this.allCostCenter.findIndex(p=>p.costCenterId == this.calCostCenterForm.value.costCenterId);
    const PrevItem = this.allCostCenter[index - 1];
    if(PrevItem == null){
      this.DisabledPrevButton = true;
    }
    
    if(PrevItem){
      this.calCostCenterForm.setValue({
        costCenterId: PrevItem.costCenterId,
        costCenterCode: PrevItem.costCenterCode,
        costCenterNameA: PrevItem.costCenterNameA,
        costCenterNameE: PrevItem.costCenterNameE,
        mainCostCenterId: PrevItem.mainCostCenterId,
        costCenterLevel: PrevItem.costCenterLevel,
        centerCategory: PrevItem.centerCategory,
        costType: PrevItem.costType,
        cashFlowList: PrevItem.cashFlowList,
        jopDesc: PrevItem.jopDesc,
        accCostCenterId: PrevItem.accCostCenterId,
        openningBalanceDepit: PrevItem.openningBalanceDepit,
        openningBalanceCredit: PrevItem.openningBalanceCredit,
        costCenterCurrTrancDepit: PrevItem.costCenterCurrTrancDepit,
        costCenterCurrTrancCredit: PrevItem.costCenterCurrTrancCredit,
        costCenterTotalDebit: PrevItem.costCenterTotalDebit,
        costCenterTotaCredit: PrevItem.costCenterTotaCredit,
        balanceDebitLocal: PrevItem.balanceDebitLocal,
        balanceCreditLocal: PrevItem.balanceCreditLocal,
        openningBalanceDepitCurncy: PrevItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: PrevItem.openningBalanceCreditCurncy,
        costCenterCurrTrancDepitCurncy: PrevItem.costCenterCurrTrancDepitCurncy,
        costCenterCurrTrancCreditCurncy: PrevItem.costCenterCurrTrancCreditCurncy,
        costCenterTotalDebitCurncy: PrevItem.costCenterTotalDebitCurncy,
        costCenterTotaCreditCurncy: PrevItem.costCenterTotaCreditCurncy,
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

    const firstItem = this.allCostCenter.findIndex(p=>p.costCenterId == this.calCostCenterForm.value.costCenterId);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
     
    this.DisabledNextButton = false;
    }

    
  }

  getFirstRowData(){
    const firstItem = this.allCostCenter[0];
    if(firstItem){
      this.calCostCenterForm.setValue({
        costCenterId: firstItem.costCenterId,
        costCenterCode: firstItem.costCenterCode,
        costCenterNameA: firstItem.costCenterNameA,
        costCenterNameE: firstItem.costCenterNameE,
        mainCostCenterId: firstItem.mainCostCenterId,
        costCenterLevel: firstItem.costCenterLevel,
        centerCategory: firstItem.centerCategory,
        costType: firstItem.costType,
        cashFlowList: firstItem.cashFlowList,
        jopDesc: firstItem.jopDesc,
        accCostCenterId: firstItem.accCostCenterId,
        openningBalanceDepit: firstItem.openningBalanceDepit,
        openningBalanceCredit: firstItem.openningBalanceCredit,
        costCenterCurrTrancDepit: firstItem.costCenterCurrTrancDepit,
        costCenterCurrTrancCredit: firstItem.costCenterCurrTrancCredit,
        costCenterTotalDebit: firstItem.costCenterTotalDebit,
        costCenterTotaCredit: firstItem.costCenterTotaCredit,
        balanceDebitLocal: firstItem.balanceDebitLocal,
        balanceCreditLocal: firstItem.balanceCreditLocal,
        openningBalanceDepitCurncy: firstItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: firstItem.openningBalanceCreditCurncy,
        costCenterCurrTrancDepitCurncy: firstItem.costCenterCurrTrancDepitCurncy,
        costCenterCurrTrancCreditCurncy: firstItem.costCenterCurrTrancCreditCurncy,
        costCenterTotalDebitCurncy: firstItem.costCenterTotalDebitCurncy,
        costCenterTotaCreditCurncy: firstItem.costCenterTotaCreditCurncy,
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
        this.AccountsService.DeleteCostCenter(this.calCostCenterForm.value.costCenterId).subscribe(res=>{
          if(res){
            this.GetAllCostCenter();
            this.GetAllCostCenterForSelect();
            this.calCostCenterForm.setValue({
              costCenterId: null,
              costCenterCode: null,
              costCenterNameA: null,
              costCenterNameE: null,
              mainCostCenterId: null,
              costCenterLevel: null,
              centerCategory: null,
              costType: null,
              cashFlowList: null,
              jopDesc: null,
              accCostCenterId: null,
              openningBalanceDepit: null,
              openningBalanceCredit: null,
              costCenterCurrTrancDepit: null,
              costCenterCurrTrancCredit: null,
              costCenterTotalDebit: null,
              costCenterTotaCredit: null,
              balanceDebitLocal: null,
              balanceCreditLocal: null,
              openningBalanceDepitCurncy: null,
              openningBalanceCreditCurncy: null,
              costCenterCurrTrancDepitCurncy: null,
              costCenterCurrTrancCreditCurncy: null,
              costCenterTotalDebitCurncy: null,
              costCenterTotaCreditCurncy: null,
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
    this.calCostCenterForm.disable();
    if(this.undoItem){
      this.calCostCenterForm.setValue({
        costCenterId: this.undoItem.costCenterId,
        costCenterCode: this.undoItem.costCenterCode,
        costCenterNameA: this.undoItem.costCenterNameA,
        costCenterNameE: this.undoItem.costCenterNameE,
        mainCostCenterId: this.undoItem.mainCostCenterId,
        costCenterLevel: this.undoItem.costCenterLevel,
        centerCategory: this.undoItem.centerCategory,
        costType: this.undoItem.costType,
        cashFlowList: this.undoItem.cashFlowList,
        jopDesc: this.undoItem.jopDesc,
        accCostCenterId: this.undoItem.accCostCenterId,
        openningBalanceDepit: this.undoItem.openningBalanceDepit,
        openningBalanceCredit: this.undoItem.openningBalanceCredit,
        costCenterCurrTrancDepit: this.undoItem.costCenterCurrTrancDepit,
        costCenterCurrTrancCredit: this.undoItem.costCenterCurrTrancCredit,
        costCenterTotalDebit: this.undoItem.costCenterTotalDebit,
        costCenterTotaCredit: this.undoItem.costCenterTotaCredit,
        balanceDebitLocal: this.undoItem.balanceDebitLocal,
        balanceCreditLocal: this.undoItem.balanceCreditLocal,
        openningBalanceDepitCurncy: this.undoItem.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: this.undoItem.openningBalanceCreditCurncy,
        costCenterCurrTrancDepitCurncy: this.undoItem.costCenterCurrTrancDepitCurncy,
        costCenterCurrTrancCreditCurncy: this.undoItem.costCenterCurrTrancCreditCurncy,
        costCenterTotalDebitCurncy: this.undoItem.costCenterTotalDebitCurncy,
        costCenterTotaCreditCurncy: this.undoItem.costCenterTotaCreditCurncy,
        balanceDebitCurncy: this.undoItem.balanceDebitCurncy,
        balanceCreditCurncy: this.undoItem.balanceCreditCurncy,
        remarksA: this.undoItem.remarksA,
        currencyId: this.undoItem.currencyId,
        rate: this.undoItem.rate,
        aid: this.undoItem.aid
      });
    }else{
      this.calCostCenterForm.setValue({
        costCenterId: null,
        costCenterCode: null,
        costCenterNameA: null,
        costCenterNameE: null,
        mainCostCenterId: null,
        costCenterLevel: null,
        centerCategory: null,
        costType: null,
        cashFlowList: null,
        jopDesc: null,
        accCostCenterId: null,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        costCenterCurrTrancDepit: null,
        costCenterCurrTrancCredit: null,
        costCenterTotalDebit: null,
        costCenterTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        costCenterCurrTrancDepitCurncy: null,
        costCenterCurrTrancCreditCurncy: null,
        costCenterTotalDebitCurncy: null,
        costCenterTotaCreditCurncy: null,
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

  updateCalCostCenter(){
    this.calCostCenterForm.enable();
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
    this.undoItem = this.calCostCenterForm.value;
  }

  New(){
    this.calCostCenterForm.enable();
    this.undoItem = this.calCostCenterForm.value;
    if(this.CostCenterItem != null){
      this.calCostCenterForm.setValue({
        costCenterId: null,
        costCenterCode: this.CostCenterItem.costCenterCode + 1,
        costCenterNameA: this.CostCenterItem.costCenterNameA  + "-",
        costCenterNameE: this.CostCenterItem.costCenterNameE ? this.CostCenterItem.costCenterNameE + "-" : null,
        mainCostCenterId: this.CostCenterItem.costCenterId,
        costCenterLevel: this.CostCenterItem.level + 2,
        centerCategory: 1,
        costType: 2,
        cashFlowList: 1,
        jopDesc: 1,
        accCostCenterId: null,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        costCenterCurrTrancDepit: null,
        costCenterCurrTrancCredit: null,
        costCenterTotalDebit: null,
        costCenterTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        costCenterCurrTrancDepitCurncy: null,
        costCenterCurrTrancCreditCurncy: null,
        costCenterTotalDebitCurncy: null,
        costCenterTotaCreditCurncy: null,
        balanceDebitCurncy: null,
        balanceCreditCurncy: null,
        remarksA: null,
        currencyId: null,
        rate: null,
        aid: null
      });
    }else{
      this.calCostCenterForm.setValue({
        costCenterId: null,
        costCenterCode: null,
        costCenterNameA: null,
        costCenterNameE: null,
        mainCostCenterId: null,
        costCenterLevel: null,
        centerCategory: null,
        costType: 1,
        cashFlowList: 1,
        jopDesc: 1,
        accCostCenterId: null,
        openningBalanceDepit: null,
        openningBalanceCredit: null,
        costCenterCurrTrancDepit: null,
        costCenterCurrTrancCredit: null,
        costCenterTotalDebit: null,
        costCenterTotaCredit: null,
        balanceDebitLocal: null,
        balanceCreditLocal: null,
        openningBalanceDepitCurncy: null,
        openningBalanceCreditCurncy: null,
        costCenterCurrTrancDepitCurncy: null,
        costCenterCurrTrancCreditCurncy: null,
        costCenterTotalDebitCurncy: null,
        costCenterTotaCreditCurncy: null,
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
      this.calCostCenterForm.setValue({
        costCenterId: node.costCenterId,
        costCenterCode: node.costCenterCode,
        costCenterNameA: node.costCenterNameA,
        costCenterNameE: node.costCenterNameE,
        mainCostCenterId: node.mainCostCenterId,
        costCenterLevel: node.level + 1,
        centerCategory: node.centerCategory,
        costType: node.costType,
        cashFlowList: node.cashFlowList,
        accCostCenterId: node.accCostCenterId,
        openningBalanceDepit: node.openningBalanceDepit,
        openningBalanceCredit: node.openningBalanceCredit,
        costCenterCurrTrancDepit: node.costCenterCurrTrancDepit,
        costCenterCurrTrancCredit: node.costCenterCurrTrancCredit,
        costCenterTotalDebit: node.costCenterTotalDebit,
        balanceDebitLocal: node.balanceDebitLocal,
        balanceCreditLocal: node.balanceCreditLocal,
        openningBalanceDepitCurncy: node.openningBalanceDepitCurncy,
        openningBalanceCreditCurncy: node.openningBalanceCreditCurncy,
        costCenterTotalDebitCurncy: node.costCenterTotalDebitCurncy,
        balanceDebitCurncy: node.balanceDebitCurncy,
        balanceCreditCurncy: node.balanceCreditCurncy,
        remarksA: node.remarksA,
        currencyId: node.currencyId,
        rate: node.rate,
        jopDesc: node.jopDesc,
        costCenterTotaCredit: node.costCenterTotaCredit,
        costCenterCurrTrancDepitCurncy: node.costCenterCurrTrancDepitCurncy,
        costCenterCurrTrancCreditCurncy: node.costCenterCurrTrancCreditCurncy,
        costCenterTotaCreditCurncy: node.costCenterTotaCreditCurncy,
        aid: node.aid,
      })
  
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      window.scrollTo({ top: 30, behavior: 'smooth' });

      const valuesToCheck = [
        node.openningBalanceDepit,
        node.openningBalanceCredit,
        node.costCenterCurrTrancDepit,
        node.accCurrTrancCredit,
        node.costCenterTotalDebit,
        node.accTotaCredit,
        node.balanceDebitLocal,
        node.balanceCreditLocal,
        node.openningBalanceDepitCurncy,
        node.openningBalanceCreditCurncy,
        node.costCenterCurrTrancDepitCurncy,
        node.accCurrTrancCreditCurncy,
        node.costCenterTotalDebitCurncy,
        node.accTotaCreditCurncy,
        node.balanceDebitCurncy,
        node.balanceCreditCurncy
      ];
      
      if (valuesToCheck.some(value => value !== 0)) {
        this.calCostCenterForm.controls['currencyId'].disable();
      }
      


    }
  }

  Filterchange(data: Event){
    const value = (data.target as HTMLInputElement).value;
    if (value.trim() === '') {
      this.dataSource.data = this.allCostCenter; 
    } else {
      this.DataFilter = this.allCostCenter
      .filter(i => i.costCenterNameA.includes(value));
      this.dataSource.data = this.DataFilter;
    }
  }

  GetAllCostCenterForSelect(){
    this.AccountsService.GetAllCostCenterForSelect().subscribe(res=>{
      this.allCostCenterForSelect = res;
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
  this.AccountsService.AddCalCostCenter(this.calCostCenterForm.value).subscribe(res=>{
   if(res.status){
    this.GetAllCostCenter();
    this.GetAllCostCenterForSelect();
     this.calCostCenterForm.disable();
     this.CostCenterItem = this.calCostCenterForm.value
     this.calCostCenterForm.get('costCenterId')?.setValue(res.id)
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
