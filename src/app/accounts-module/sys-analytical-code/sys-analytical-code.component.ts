import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AccountsModuleServicesService } from '../accounts-module-services.service';
import { Observable, map, startWith } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DeleteConfirmComponent } from 'src/app/definition/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-sys-analytical-code',
  templateUrl: './sys-analytical-code.component.html',
  styleUrls: ['./sys-analytical-code.component.scss']
})
export class SysAnalyticalCodeComponent implements OnInit {

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
  dataSource : any;
  allSysAnalyticalCodes : any[] = [];
  AllSysAnalyticalCodeForSelect : any[] = [];
  DataFilter :any;
  allCostCenterForSelect : any[] =[];
  allAccountsForSelect: any[] = [] ;
  Allcustomer:any[] = [] ;
  
  myControl = new FormControl('');
  options: any[] = [];
  filteredOptions ?: Observable<any[]>;
  AllEmployees : any[] = [];
  AllAssets:any[] = [];
  AllVendors:any[] = [];


  SysAnalyticalCodeItem : any;

  


  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      aid: node.aid,
      parentAid:node.parentAid,
      codeLevel:node.codeLevel,
      codeLevelType : node.codeLevelType,
      code : node.code,
      descA : node.descA,
      descE : node.descE,
      stopped : node.stopped,
      accountId : node.accountId,
      costCenterId : node.costCenterId,
      assetId : node.assetId,
      empId : node.empId,
      bspartnerId : node.bspartnerId,
      customerId : node.customerId,
      vendorId : node.vendorId,
      itemCardId : node.itemCardId,
      addField1 : node.addField1,
      addField2 : node.addField2,
      addField3 : node.addField3,
      addField4 : node.addField4,
      addField5 : node.addField5,
      addField6 : node.addField6,
      addField7 : node.addField7,
      addField8 : node.addField8,
      addField9 : node.addField9,
      addField10 : node.addField10,
      addField11 : node.addField11,
      addField12 : node.addField12,
      addField13 : node.addField13,
      addField14 : node.addField14,
      addField15 : node.addField15,
      addField16 : node.addField16,
      addField17 : node.addField17,
      addField18 : node.addField18,
      addField19 : node.addField19,
      addField20 : node.addField20,
      addField21 : node.addField21,
      addField22 : node.addField22,
      addField23 : node.addField23,
      addField24 : node.addField24,
      addField25 : node.addField25,
      remarksA : node.remarksA,
      remarksE : node.remarksE,
      accomulatAid : node.accomulatAid,
      anDate1 : node.anDate1,
      anDate2 : node.anDate2,
      anDate3 : node.anDate3,
      isNotify1 : node.isNotify1,
      notifyDate1 : node.notifyDate1,
      isNotify2 : node.isNotify2,
      notifyDate2 : node.notifyDate2,
      isNotify3 : node.isNotify3,
      notifyDate3 : node.notifyDate3,
      addField26 : node.addField26,
      addField27 : node.addField27,
      addField28 : node.addField28,
      addField29 : node.addField29,
      addField30 : node.addField30,
      
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
  ngOnInit(): void {
    this.SysAnalyticalCodeForm.disable();
    this.GetAllSysAnalyticalCode();
    this.GetAllCostCenterForSelect();
    this.GetAllSysAnalyticalCodeForSelect();
    this.GetAllAccountsForSelect();

  }

  hasChild = (_: number, node: any) => node.expandable;
  

  
 SysAnalyticalCodeForm = this.fb.group({
  aid: [],
  parentAid:[],
  codeLevel:[],
  codeLevelType : [1,Validators.required],
  code : ['',Validators.required],
  descA : ['',Validators.required],
  descE : [''],
  stopped : [],
  accountId : [],
  costCenterId : [],
  assetId : [],
  empId : [],
  bspartnerId : [],
  customerId : [],
  vendorId : [],
  itemCardId : [],
  addField1 : [""],
  addField2 : [""],
  addField3 : [""],
  addField4 : [""],
  addField5 : [""],
  addField6 : [""],
  addField7 : [""],
  addField8 : [""],
  addField9 : [""],
  addField10 : [""],
  addField11 : [""],
  addField12 : [""],
  addField13 : [""],
  addField14 : [""],
  addField15 : [""],
  addField16 : [""],
  addField17 : [""],
  addField18 : [""],
  addField19 : [""],
  addField20 : [""],
  addField21 : [""],
  addField22 : [""],
  addField23 : [""],
  addField24 : [""],
  addField25 : [""],
  remarksA : [""],
  remarksE : [""],
  accomulatAid : [],
  anDate1 : [new Date()],
  anDate2 : [],
  anDate3 : [],
  isNotify1 : [],
  notifyDate1 : [],
  isNotify2 : [],
  notifyDate2 : [],
  isNotify3 : [],
  notifyDate3 : [],
  addField26 : [''],
  addField27 : [''],
  addField28 : [''],
  addField29 : [''],
  addField30 : [''],
 })


  GetAllSysAnalyticalCode(){
    this.AccountsService.GetAllSysAnalyticalCode().subscribe(res=>{
      this.allSysAnalyticalCodes = res;
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = this.allSysAnalyticalCodes;
    })
  }

  New(){
    this.SysAnalyticalCodeForm.enable();
    this.undoItem = this.SysAnalyticalCodeForm.value;
    if(this.SysAnalyticalCodeItem != null){
      this.SysAnalyticalCodeForm.setValue({
        aid: null,
        parentAid: this.SysAnalyticalCodeItem.aid,
        codeLevel: null,
        codeLevelType: 2,
        code: this.SysAnalyticalCodeItem.code + 1,
        descA: this.SysAnalyticalCodeItem.descA + "-",
        descE:  this.SysAnalyticalCodeItem.descE ? this.SysAnalyticalCodeItem.descE + "-" : null,
        stopped: null,
        accountId: null,
        costCenterId: null,
        assetId: null,
        empId: null,
        bspartnerId: null,
        customerId: null,
        vendorId: null,
        itemCardId: null,
        addField1: null,
        addField2: null,
        addField3: null,
        addField4: null,
        addField5: null,
        addField6: null,
        addField7: null,
        addField8: null,
        addField9: null,
        addField10: null,
        addField11: null,
        addField12: null,
        addField13: null,
        addField14: null,
        addField15: null,
        addField16: null,
        addField17: null,
        addField18: null,
        addField19: null,
        addField20: null,
        addField21: null,
        addField22: null,
        addField23: null,
        addField24: null,
        addField25: null,
        remarksA: null,
        remarksE: null,
        accomulatAid: null,
        anDate1: new Date() ,
        anDate2: null,
        anDate3: null,
        isNotify1: null,
        notifyDate1: null,
        isNotify2: null,
        notifyDate2: null,
        isNotify3: null,
        notifyDate3: null,
        addField26: null,
        addField27: null,
        addField28: null,
        addField29: null,
        addField30: null
      })
    }else{
      this.SysAnalyticalCodeForm.setValue({
        aid: null,
        parentAid: null,
        codeLevel: null,
        codeLevelType: 1,
        code: null,
        descA: null,
        descE: null,
        stopped: null,
        accountId: null,
        costCenterId: null,
        assetId: null,
        empId: null,
        bspartnerId: null,
        customerId: null,
        vendorId: null,
        itemCardId: null,
        addField1: null,
        addField2: null,
        addField3: null,
        addField4: null,
        addField5: null,
        addField6: null,
        addField7: null,
        addField8: null,
        addField9: null,
        addField10: null,
        addField11: null,
        addField12: null,
        addField13: null,
        addField14: null,
        addField15: null,
        addField16: null,
        addField17: null,
        addField18: null,
        addField19: null,
        addField20: null,
        addField21: null,
        addField22: null,
        addField23: null,
        addField24: null,
        addField25: null,
        remarksA: null,
        remarksE: null,
        accomulatAid: null,
        anDate1: null,
        anDate2: null,
        anDate3: null,
        isNotify1: null,
        notifyDate1: null,
        isNotify2: null,
        notifyDate2: null,
        isNotify3: null,
        notifyDate3: null,
        addField26: null,
        addField27: null,
        addField28: null,
        addField29: null,
        addField30: null
      })
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

  updateSysAnalyticalCode(){
    this.SysAnalyticalCodeForm.enable();
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
    this.undoItem = this.SysAnalyticalCodeForm.value;
  }

  undo(){
    this.SysAnalyticalCodeForm.disable();
    if(this.undoItem){
      this.SysAnalyticalCodeForm.setValue({
        aid: this.undoItem.aid,
        parentAid: this.undoItem.parentAid,
        codeLevel: this.undoItem.codeLevel,
        codeLevelType: this.undoItem.codeLevelType,
        code: this.undoItem.code,
        descA: this.undoItem.descA,
        descE: this.undoItem.descE,
        stopped: this.undoItem.stopped,
        accountId: this.undoItem.accountId,
        costCenterId: this.undoItem.costCenterId,
        assetId: this.undoItem.assetId,
        empId: this.undoItem.empId,
        bspartnerId: this.undoItem.bspartnerId,
        customerId: this.undoItem.customerId,
        vendorId: this.undoItem.vendorId,
        itemCardId: this.undoItem.itemCardId,
        addField1: this.undoItem.addField1,
        addField2: this.undoItem.addField2,
        addField3: this.undoItem.addField3,
        addField4: this.undoItem.addField4,
        addField5: this.undoItem.addField5,
        addField6: this.undoItem.addField6,
        addField7: this.undoItem.addField7,
        addField8: this.undoItem.addField8,
        addField9: this.undoItem.addField9,
        addField10: this.undoItem.addField10,
        addField11: this.undoItem.addField11,
        addField12: this.undoItem.addField12,
        addField13: this.undoItem.addField13,
        addField14: this.undoItem.addField14,
        addField15: this.undoItem.addField15,
        addField16: this.undoItem.addField16,
        addField17: this.undoItem.addField17,
        addField18: this.undoItem.addField18,
        addField19: this.undoItem.addField19,
        addField20: this.undoItem.addField20,
        addField21: this.undoItem.addField21,
        addField22: this.undoItem.addField22,
        addField23: this.undoItem.addField23,
        addField24: this.undoItem.addField24,
        addField25: this.undoItem.addField25,
        remarksA: this.undoItem.remarksA,
        remarksE: this.undoItem.remarksE,
        accomulatAid: this.undoItem.accomulatAid,
        anDate1: this.undoItem.anDate1,
        anDate2: this.undoItem.anDate2,
        anDate3: this.undoItem.anDate3,
        isNotify1: this.undoItem.isNotify1,
        notifyDate1: this.undoItem.notifyDate1,
        isNotify2: this.undoItem.isNotify2,
        notifyDate2: this.undoItem.notifyDate2,
        isNotify3: this.undoItem.isNotify3,
        notifyDate3: this.undoItem.notifyDate3,
        addField26: this.undoItem.addField26,
        addField27: this.undoItem.addField27,
        addField28: this.undoItem.addField28,
        addField29: this.undoItem.addField29,
        addField30: this.undoItem.addField30
      });
    }else{
      this.SysAnalyticalCodeForm.setValue({
        aid: null,
        parentAid: null,
        codeLevel: null,
        codeLevelType: null,
        code: null,
        descA: null,
        descE: null,
        stopped: null,
        accountId: null,
        costCenterId: null,
        assetId: null,
        empId: null,
        bspartnerId: null,
        customerId: null,
        vendorId: null,
        itemCardId: null,
        addField1: null,
        addField2: null,
        addField3: null,
        addField4: null,
        addField5: null,
        addField6: null,
        addField7: null,
        addField8: null,
        addField9: null,
        addField10: null,
        addField11: null,
        addField12: null,
        addField13: null,
        addField14: null,
        addField15: null,
        addField16: null,
        addField17: null,
        addField18: null,
        addField19: null,
        addField20: null,
        addField21: null,
        addField22: null,
        addField23: null,
        addField24: null,
        addField25: null,
        remarksA: null,
        remarksE: null,
        accomulatAid: null,
        anDate1: null,
        anDate2: null,
        anDate3: null,
        isNotify1: null,
        notifyDate1: null,
        isNotify2: null,
        notifyDate2: null,
        isNotify3: null,
        notifyDate3: null,
        addField26: null,
        addField27: null,
        addField28: null,
        addField29: null,
        addField30: null
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


  
  Open_delete_confirm() {
    var _popup = this.dialog.open(DeleteConfirmComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((response) => {
      if (response) {
        this.AccountsService.DeleteSysAnalyticalCode(this.SysAnalyticalCodeForm.value.aid).subscribe(res=>{
          if(res){
            this.GetAllSysAnalyticalCode();
            this.GetAllSysAnalyticalCodeForSelect();
            this.SysAnalyticalCodeForm.setValue({
              aid: null,
              parentAid: null,
              codeLevel: null,
              codeLevelType: null,
              code: null,
              descA: null,
              descE: null,
              stopped: null,
              accountId: null,
              costCenterId: null,
              assetId: null,
              empId: null,
              bspartnerId: null,
              customerId: null,
              vendorId: null,
              itemCardId: null,
              addField1: null,
              addField2: null,
              addField3: null,
              addField4: null,
              addField5: null,
              addField6: null,
              addField7: null,
              addField8: null,
              addField9: null,
              addField10: null,
              addField11: null,
              addField12: null,
              addField13: null,
              addField14: null,
              addField15: null,
              addField16: null,
              addField17: null,
              addField18: null,
              addField19: null,
              addField20: null,
              addField21: null,
              addField22: null,
              addField23: null,
              addField24: null,
              addField25: null,
              remarksA: null,
              remarksE: null,
              accomulatAid: null,
              anDate1: null,
              anDate2: null,
              anDate3: null,
              isNotify1: null,
              notifyDate1: null,
              isNotify2: null,
              notifyDate2: null,
              isNotify3: null,
              notifyDate3: null,
              addField26: null,
              addField27: null,
              addField28: null,
              addField29: null,
              addField30: null
            })
            this.DeleteDisable = true;
            this.UpdateDisable = true;
            
          }
        })
           
      }
    });
  }


  getFirstRowData(){
    const firstItem = this.allSysAnalyticalCodes[0];
    if(firstItem){
      this.SysAnalyticalCodeForm.setValue({
        aid: firstItem.aid,
        parentAid: firstItem.parentAid,
        codeLevel: firstItem.codeLevel,
        codeLevelType: firstItem.codeLevelType,
        code: firstItem.code,
        descA: firstItem.descA,
        descE: firstItem.descE,
        stopped: firstItem.stopped,
        accountId: firstItem.accountId,
        costCenterId: firstItem.costCenterId,
        assetId: firstItem.assetId,
        empId: firstItem.empId,
        bspartnerId: firstItem.bspartnerId,
        customerId: firstItem.customerId,
        vendorId: firstItem.vendorId,
        itemCardId: firstItem.itemCardId,
        addField1: firstItem.addField1,
        addField2: firstItem.addField2,
        addField3: firstItem.addField3,
        addField4: firstItem.addField4,
        addField5: firstItem.addField5,
        addField6: firstItem.addField6,
        addField7: firstItem.addField7,
        addField8: firstItem.addField8,
        addField9: firstItem.addField9,
        addField10: firstItem.addField10,
        addField11: firstItem.addField11,
        addField12: firstItem.addField12,
        addField13: firstItem.addField13,
        addField14: firstItem.addField14,
        addField15: firstItem.addField15,
        addField16: firstItem.addField16,
        addField17: firstItem.addField17,
        addField18: firstItem.addField18,
        addField19: firstItem.addField19,
        addField20: firstItem.addField20,
        addField21: firstItem.addField21,
        addField22: firstItem.addField22,
        addField23: firstItem.addField23,
        addField24: firstItem.addField24,
        addField25: firstItem.addField25,
        remarksA: firstItem.remarksA,
        remarksE: firstItem.remarksE,
        accomulatAid: firstItem.accomulatAid,
        anDate1: firstItem.anDate1,
        anDate2: firstItem.anDate2,
        anDate3: firstItem.anDate3,
        isNotify1: firstItem.isNotify1,
        notifyDate1: firstItem.notifyDate1,
        isNotify2: firstItem.isNotify2,
        notifyDate2: firstItem.notifyDate2,
        isNotify3: firstItem.isNotify3,
        notifyDate3: firstItem.notifyDate3,
        addField26: firstItem.addField26,
        addField27: firstItem.addField27,
        addField28: firstItem.addField28,
        addField29: firstItem.addField29,
        addField30: firstItem.addField30
      });
      this.firstRow = true;
      this.lastRow = false;
      this.DisabledPrevButton = true;
      this.DisabledNextButton = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

    }

  }

  getPrevRowData(){
    const index = this.allSysAnalyticalCodes.findIndex(p=>p.aid == this.SysAnalyticalCodeForm.value.aid);
    const PrevItem = this.allSysAnalyticalCodes[index - 1];
    if(PrevItem == null){
      this.DisabledPrevButton = true;
    }
    
    if(PrevItem){
      this.SysAnalyticalCodeForm.setValue({
        aid: PrevItem.aid,
        parentAid: PrevItem.parentAid,
        codeLevel: PrevItem.codeLevel,
        codeLevelType: PrevItem.codeLevelType,
        code: PrevItem.code,
        descA: PrevItem.descA,
        descE: PrevItem.descE,
        stopped: PrevItem.stopped,
        accountId: PrevItem.accountId,
        costCenterId: PrevItem.costCenterId,
        assetId: PrevItem.assetId,
        empId: PrevItem.empId,
        bspartnerId: PrevItem.bspartnerId,
        customerId: PrevItem.customerId,
        vendorId: PrevItem.vendorId,
        itemCardId: PrevItem.itemCardId,
        addField1: PrevItem.addField1,
        addField2: PrevItem.addField2,
        addField3: PrevItem.addField3,
        addField4: PrevItem.addField4,
        addField5: PrevItem.addField5,
        addField6: PrevItem.addField6,
        addField7: PrevItem.addField7,
        addField8: PrevItem.addField8,
        addField9: PrevItem.addField9,
        addField10: PrevItem.addField10,
        addField11: PrevItem.addField11,
        addField12: PrevItem.addField12,
        addField13: PrevItem.addField13,
        addField14: PrevItem.addField14,
        addField15: PrevItem.addField15,
        addField16: PrevItem.addField16,
        addField17: PrevItem.addField17,
        addField18: PrevItem.addField18,
        addField19: PrevItem.addField19,
        addField20: PrevItem.addField20,
        addField21: PrevItem.addField21,
        addField22: PrevItem.addField22,
        addField23: PrevItem.addField23,
        addField24: PrevItem.addField24,
        addField25: PrevItem.addField25,
        remarksA: PrevItem.remarksA,
        remarksE: PrevItem.remarksE,
        accomulatAid: PrevItem.accomulatAid,
        anDate1: PrevItem.anDate1,
        anDate2: PrevItem.anDate2,
        anDate3: PrevItem.anDate3,
        isNotify1: PrevItem.isNotify1,
        notifyDate1: PrevItem.notifyDate1,
        isNotify2: PrevItem.isNotify2,
        notifyDate2: PrevItem.notifyDate2,
        isNotify3: PrevItem.isNotify3,
        notifyDate3: PrevItem.notifyDate3,
        addField26: PrevItem.addField26,
        addField27: PrevItem.addField27,
        addField28: PrevItem.addField28,
        addField29: PrevItem.addField29,
        addField30: PrevItem.addField30
      });
   
    this.firstRow = false;
    this.lastRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const firstItem = this.allSysAnalyticalCodes.findIndex(p=>p.aid == this.SysAnalyticalCodeForm.value.aid);

     if(firstItem === 0){
          this.DisabledPrevButton = true;
          this.firstRow = true;
     }
     
    this.DisabledNextButton = false;
    }

    
  }

  getNextRowData(){
    const index = this.allSysAnalyticalCodes.findIndex(p=>p.aid == this.SysAnalyticalCodeForm.value.aid);
    const nextItem = this.allSysAnalyticalCodes[index + 1];
    if(nextItem){
      this.SysAnalyticalCodeForm.setValue({
        aid: nextItem.aid,
        parentAid: nextItem.parentAid,
        codeLevel: nextItem.codeLevel,
        codeLevelType: nextItem.codeLevelType,
        code: nextItem.code,
        descA: nextItem.descA,
        descE: nextItem.descE,
        stopped: nextItem.stopped,
        accountId: nextItem.accountId,
        costCenterId: nextItem.costCenterId,
        assetId: nextItem.assetId,
        empId: nextItem.empId,
        bspartnerId: nextItem.bspartnerId,
        customerId: nextItem.customerId,
        vendorId: nextItem.vendorId,
        itemCardId: nextItem.itemCardId,
        addField1: nextItem.addField1,
        addField2: nextItem.addField2,
        addField3: nextItem.addField3,
        addField4: nextItem.addField4,
        addField5: nextItem.addField5,
        addField6: nextItem.addField6,
        addField7: nextItem.addField7,
        addField8: nextItem.addField8,
        addField9: nextItem.addField9,
        addField10: nextItem.addField10,
        addField11: nextItem.addField11,
        addField12: nextItem.addField12,
        addField13: nextItem.addField13,
        addField14: nextItem.addField14,
        addField15: nextItem.addField15,
        addField16: nextItem.addField16,
        addField17: nextItem.addField17,
        addField18: nextItem.addField18,
        addField19: nextItem.addField19,
        addField20: nextItem.addField20,
        addField21: nextItem.addField21,
        addField22: nextItem.addField22,
        addField23: nextItem.addField23,
        addField24: nextItem.addField24,
        addField25: nextItem.addField25,
        remarksA: nextItem.remarksA,
        remarksE: nextItem.remarksE,
        accomulatAid: nextItem.accomulatAid,
        anDate1: nextItem.anDate1,
        anDate2: nextItem.anDate2,
        anDate3: nextItem.anDate3,
        isNotify1: nextItem.isNotify1,
        notifyDate1: nextItem.notifyDate1,
        isNotify2: nextItem.isNotify2,
        notifyDate2: nextItem.notifyDate2,
        isNotify3: nextItem.isNotify3,
        notifyDate3: nextItem.notifyDate3,
        addField26: nextItem.addField26,
        addField27: nextItem.addField27,
        addField28: nextItem.addField28,
        addField29: nextItem.addField29,
        addField30: nextItem.addField30
      });
     this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
  
      const LastItem = this.allSysAnalyticalCodes.findIndex(p=>p.aid == this.SysAnalyticalCodeForm.value.aid);
  
      if(this.allSysAnalyticalCodes.length -1 === LastItem){
        this.DisabledNextButton = true;
        this.lastRow = true;
      }
      this.DisabledPrevButton = false;
    }

  }

  getLastRowData(){
    const LastItem = this.allSysAnalyticalCodes[this.allSysAnalyticalCodes.length-1];
    if(LastItem){
      this.SysAnalyticalCodeForm.setValue({
        aid: LastItem.aid,
        parentAid: LastItem.parentAid,
        codeLevel: LastItem.codeLevel,
        codeLevelType: LastItem.codeLevelType,
        code: LastItem.code,
        descA: LastItem.descA,
        descE: LastItem.descE,
        stopped: LastItem.stopped,
        accountId: LastItem.accountId,
        costCenterId: LastItem.costCenterId,
        assetId: LastItem.assetId,
        empId: LastItem.empId,
        bspartnerId: LastItem.bspartnerId,
        customerId: LastItem.customerId,
        vendorId: LastItem.vendorId,
        itemCardId: LastItem.itemCardId,
        addField1: LastItem.addField1,
        addField2: LastItem.addField2,
        addField3: LastItem.addField3,
        addField4: LastItem.addField4,
        addField5: LastItem.addField5,
        addField6: LastItem.addField6,
        addField7: LastItem.addField7,
        addField8: LastItem.addField8,
        addField9: LastItem.addField9,
        addField10: LastItem.addField10,
        addField11: LastItem.addField11,
        addField12: LastItem.addField12,
        addField13: LastItem.addField13,
        addField14: LastItem.addField14,
        addField15: LastItem.addField15,
        addField16: LastItem.addField16,
        addField17: LastItem.addField17,
        addField18: LastItem.addField18,
        addField19: LastItem.addField19,
        addField20: LastItem.addField20,
        addField21: LastItem.addField21,
        addField22: LastItem.addField22,
        addField23: LastItem.addField23,
        addField24: LastItem.addField24,
        addField25: LastItem.addField25,
        remarksA: LastItem.remarksA,
        remarksE: LastItem.remarksE,
        accomulatAid: LastItem.accomulatAid,
        anDate1: LastItem.anDate1,
        anDate2: LastItem.anDate2,
        anDate3: LastItem.anDate3,
        isNotify1: LastItem.isNotify1,
        notifyDate1: LastItem.notifyDate1,
        isNotify2: LastItem.isNotify2,
        notifyDate2: LastItem.notifyDate2,
        isNotify3: LastItem.isNotify3,
        notifyDate3: LastItem.notifyDate3,
        addField26: LastItem.addField26,
        addField27: LastItem.addField27,
        addField28: LastItem.addField28,
        addField29: LastItem.addField29,
        addField30: LastItem.addField30
      });
    
      this.firstRow = false;
      this.lastRow = true;
      this.DisabledPrevButton = false;
      this.DisabledNextButton = true;
      this.UpdateDisable = false;
      this.DeleteDisable = false;

    }

  }

  handleNodeClick(node:any){
    if(node){
      this.SysAnalyticalCodeItem  = node;
      this.SysAnalyticalCodeForm.setValue({
        aid: node.aid,
        parentAid: node.parentAid,
        codeLevel: node.level + 1,
        codeLevelType: node.codeLevelType,
        code: node.code,
        descA: node.descA,
        descE: node.descE,
        stopped: node.stopped,
        accountId: node.accountId,
        costCenterId: node.costCenterId,
        assetId: node.assetId,
        empId: node.empId,
        bspartnerId: node.bspartnerId,
        customerId: node.customerId,
        vendorId: node.vendorId,
        itemCardId: node.itemCardId,
        addField1: node.addField1,
        addField2: node.addField2,
        addField3: node.addField3,
        addField4: node.addField4,
        addField5: node.addField5,
        addField6: node.addField6,
        addField7: node.addField7,
        addField8: node.addField8,
        addField9: node.addField9,
        addField10: node.addField10,
        addField11: node.addField11,
        addField12: node.addField12,
        addField13: node.addField13,
        addField14: node.addField14,
        addField15: node.addField15,
        addField16: node.addField16,
        addField17: node.addField17,
        addField18: node.addField18,
        addField19: node.addField19,
        addField20: node.addField20,
        addField21: node.addField21,
        addField22: node.addField22,
        addField23: node.addField23,
        addField24: node.addField24,
        addField25: node.addField25,
        remarksA: node.remarksA,
        remarksE: node.remarksE,
        accomulatAid: node.accomulatAid,
        anDate1: node.anDate1,
        anDate2: node.anDate2,
        anDate3: node.anDate3,
        isNotify1: node.isNotify1,
        notifyDate1: node.notifyDate1,
        isNotify2: node.isNotify2,
        notifyDate2: node.notifyDate2,
        isNotify3: node.isNotify3,
        notifyDate3: node.notifyDate3,
        addField26: node.addField26,
        addField27: node.addField27,
        addField28: node.addField28,
        addField29: node.addField29,
        addField30: node.addField30
      })

      this.UpdateDisable = false;
      this.DeleteDisable = false;
      window.scrollTo({ top: 30, behavior: 'smooth' });
    }
  }

  Filterchange(data: Event){
    const value = (data.target as HTMLInputElement).value;
    if (value.trim() === '') {
      this.dataSource.data = this.allSysAnalyticalCodes; 
    } else {
      this.DataFilter = this.allSysAnalyticalCodes
      .filter(i => i.descA.includes(value));
      this.dataSource.data = this.DataFilter;
    }
  }

  OnSumbit(){
    this.AccountsService.AddSysAnalyticalCode(this.SysAnalyticalCodeForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllSysAnalyticalCode();
        this.GetAllSysAnalyticalCodeForSelect();
        this.SysAnalyticalCodeForm.disable();
        this.SysAnalyticalCodeItem = this.SysAnalyticalCodeForm.value
        this.SysAnalyticalCodeForm.get('aid')?.setValue(res.id)
        this.DisabledNextButton = false;
        this.DisabledPrevButton = false;
        this.lastRow = false;
        this.firstRow = false;
        this.SaveDisable=true;
        this.UpdateDisable = false;
        this.UndoDisabled = true;
        this.DeleteDisable=false;
   
      }
    })  }

  GetAllSysAnalyticalCodeForSelect(){
    this.AccountsService.GetAllSysAnalyticalCodeForSelect().subscribe(res=>{
      this.AllSysAnalyticalCodeForSelect = res;
    })
  }

  GetAllCostCenterForSelect(){
    this.AccountsService.GetAll_CostCenterForSelect().subscribe(res=>{
      this.allCostCenterForSelect = res;
    })
  }

  GetAllAccountsForSelect(){
    this.AccountsService.GetAllAccountsForSelect().subscribe(res=>{
      this.allAccountsForSelect = res;
    })
  }


  // GetAllCustomer(){
  //   this.AccountsService.GetAllCustomer().subscribe({
  //     next : (res)=>{
  //       this.options = res;
  //     },
  //     complete:()=>{
  //       this.filteredOptions = this.myControl.valueChanges.pipe(
  //         startWith(''),
  //         map(value => this._filter(value || '')),
  //       );
  //     }
  //   })
  // }

  GetAllCustomer(){
    this.AccountsService.GetAllCustomer().subscribe(res=>{
      this.Allcustomer = res;
    })
  }

  GetAllEmployees(){
    this.AccountsService.GetAllHrEmployees().subscribe(res=>{
      this.AllEmployees = res;
    })
  }

  
  GetAllAssets(){
    this.AccountsService.GetAllAssets().subscribe(res=>{
      this.AllAssets = res;
    })
  }

  GetAllVendors(){
    this.AccountsService.GetAllVendors().subscribe(res=>{
      this.AllVendors = res;
    })
  }






  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.customerCode.toLowerCase().includes(filterValue) ||
      (option.customerDescA.toLowerCase().includes(filterValue))
    );
  }

  // private _filter(value: any): any[] {
  //   const filterValue = value && typeof value === 'string' ? value.toLowerCase() : '';
  //   return this.options.filter(option => 
  //     option.customerCode.toLowerCase().includes(filterValue) ||
  //     option.customerDescA.toLowerCase().includes(filterValue)
  //   );
  // }

  
  

  
 onTabChanged(event: MatTabChangeEvent) {
  if (event.tab.textLabel === 'جهات عمل') {
    this.GetAllCustomer();
    this.GetAllEmployees();
    this.GetAllAssets();
    this.GetAllVendors();
  }
}

onOptionSelected(event: any) {
  const selectedOption = event.option.value;
  console.log('Selected option:', selectedOption);
  const option = this.options.find(o => o.customerId === selectedOption);
  if (option) {
    console.log('Selected option details:', option);
  }
}

}
