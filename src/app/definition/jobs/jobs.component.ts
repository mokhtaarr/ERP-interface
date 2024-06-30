import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ExampleFlatNode, JobTree} from 'src/app/shared/models/tree';
import { DefinitionService } from '../definition.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})


export class JobsComponent implements OnInit {
  dataSource: any;
  allHrJobs : any[] = [];
  allHrJobsForSelect : any[] = [];
  AllHrDepartment : any[] = [];


  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      jobId: node.jobId,
      departMentId:node.departMentId,
      parentId:node.parentId,
      jcode:node.jcode,
      jname1 : node.jname1,
      jname2 : node.jname2,
      remarks : node.remarks,
      jresponsibilities : node.jresponsibilities,
      jqualifications:node.jqualifications,
      jdesc:node.jdesc,
      jduties:node.jduties,
      standardMonthlyWage:node.standardMonthlyWage,
      standardHolyDays:node.standardHolyDays,
      standardDailyWage:node.standardDailyWage,
      standardDailyWorkHours:node.standardDailyWorkHours,
      standardHourlyWage:node.standardHourlyWage,
      numberAvailable:node.numberAvailable
    };
    
  };

  treeControl = new FlatTreeControl<JobTree>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,   
  );


  
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
  HrDepartmentsForm: any;

 


  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
}
  ngOnInit(): void {
    this.HrJobsForm.disable();
    this.GetAllHrJobs();
    this.getAllHrDepartments();
    this.GetAllHrJobsForSelect();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  HrJobsForm = this.fb.group({
    jobId :[],
    departMentId :[],
    jcode :['',Validators.required],
    jname1 :['',Validators.required],
    jname2:[''],
    jdesc:[''],
    jresponsibilities:[''],
    jqualifications:[''],
    jduties:[''],
    remarks:[''],
    parentId:[],
    standardMonthlyWage:[],
    standardHolyDays:[],
    standardDailyWage:[],
    standardDailyWorkHours:[],
    standardHourlyWage:[],
    numberAvailable:[]
   })

  GetAllHrJobs(){
    this.definitionService.GEtAllHrJobs().subscribe(res=>{
      this.allHrJobs = res;
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = this.allHrJobs;
    })
  }

  GetAllHrJobsForSelect(){
    this.definitionService.GEtAllHrJobsForJobs().subscribe(res=>{
      this.allHrJobsForSelect = res;
    })
  }

  getAllHrDepartments(){
    this.definitionService.getAllHrDepartments().subscribe(res=>{
      this.AllHrDepartment = res;
    })
  }


  handleNodeClick(node: any) {
    if(node){
      this.HrJobsForm.setValue({
        jobId: node.jobId,
        departMentId: node.departMentId,
        jcode: node.jcode,
        jname1: node.jname1,
        jname2: node.jname2 ?? node.jname1,
        jdesc: node.jdesc,
        jresponsibilities: node.jresponsibilities,
        jqualifications: node.jqualifications,
        jduties: node.jduties,
        remarks: node.remarks,
        parentId: node.parentId,
        standardMonthlyWage: node.standardMonthlyWage,
        standardHolyDays: node.standardHolyDays,
        standardDailyWage: node.standardDailyWage,
        standardDailyWorkHours: node.standardDailyWorkHours,
        standardHourlyWage: node.standardHourlyWage,
        numberAvailable: node.numberAvailable
      })

      this.UpdateDisable = false;
      this.DeleteDisable = false;
      this.UndoDisabled = true;
    }
  }

  onSumbit(){
    this.definitionService.AddHrJob(this.HrJobsForm.value).subscribe(res=>{
      if(res.status){
        this.GetAllHrJobs();
        this.GetAllHrJobsForSelect();
        this.HrJobsForm.disable();
        this.HrJobsForm.get('jobId')?.setValue(res.id);
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

  getFirstRowData(){
    const FirstItem = this.allHrJobs[0];
      if(FirstItem){
     this.HrJobsForm.setValue({
       jobId: FirstItem.jobId,
       departMentId: FirstItem.departMentId,
       jcode: FirstItem.jcode,
       jname1: FirstItem.jname1,
       jname2: FirstItem.jname2,
       jdesc: FirstItem.jdesc,
       jresponsibilities: FirstItem.jresponsibilities,
       jqualifications: FirstItem.jqualifications,
       jduties: FirstItem.jduties,
       remarks: FirstItem.remarks,
       parentId: FirstItem.parentId,
       standardMonthlyWage: FirstItem.standardMonthlyWage,
       standardHolyDays: FirstItem.standardHolyDays,
       standardDailyWage: FirstItem.standardDailyWage,
       standardDailyWorkHours: FirstItem.standardDailyWorkHours,
       standardHourlyWage: FirstItem.standardHourlyWage,
       numberAvailable: FirstItem.numberAvailable
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
    const LastItem = this.allHrJobs[this.allHrJobs.length-1];
    if(LastItem){
      this.HrJobsForm.setValue({
        jobId: LastItem.jobId,
        departMentId: LastItem.departMentId,
        jcode: LastItem.jcode,
        jname1: LastItem.jname1,
        jname2: LastItem.jname2,
        jdesc: LastItem.jdesc,
        jresponsibilities: LastItem.jresponsibilities,
        jqualifications: LastItem.jqualifications,
        jduties: LastItem.jduties,
        remarks: LastItem.remarks,
        parentId: LastItem.parentId,
        standardMonthlyWage: LastItem.standardMonthlyWage,
        standardHolyDays: LastItem.standardHolyDays,
        standardDailyWage: LastItem.standardDailyWage,
        standardDailyWorkHours: LastItem.standardDailyWorkHours,
        standardHourlyWage: LastItem.standardHourlyWage,
        numberAvailable: LastItem.numberAvailable
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
    const index = this.allHrJobs.findIndex(p=>p.jobId == this.HrJobsForm.value.jobId);
    const PrevItem = this.allHrJobs[index - 1];
    if(PrevItem){
      this.HrJobsForm.setValue({
        jobId: PrevItem.jobId,
        departMentId: PrevItem.departMentId,
        jcode: PrevItem.jcode,
        jname1: PrevItem.jname1,
        jname2: PrevItem.jname2,
        jdesc: PrevItem.jdesc,
        jresponsibilities: PrevItem.jresponsibilities,
        jqualifications: PrevItem.jqualifications,
        jduties: PrevItem.jduties,
        remarks: PrevItem.remarks,
        parentId: PrevItem.parentId,
        standardMonthlyWage: PrevItem.standardMonthlyWage,
        standardHolyDays: PrevItem.standardHolyDays,
        standardDailyWage: PrevItem.standardDailyWage,
        standardDailyWorkHours: PrevItem.standardDailyWorkHours,
        standardHourlyWage: PrevItem.standardHourlyWage,
        numberAvailable: PrevItem.numberAvailable
      });

      this.firstRow = false;
      this.lastRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;


      const firstItem = this.allHrJobs.findIndex(p=>p.jobId == this.HrJobsForm.value.jobId);

       if(firstItem === 0){
            this.DisabledPrevButton = true;
            this.firstRow = true;
       }
       
     
      this.DisabledNextButton = false;

    }
}

getNextRowData(){
  const index = this.allHrJobs.findIndex(p=>p.jobId == this.HrJobsForm.value.jobId);

  const nextItem = this.allHrJobs[index + 1];

  if(nextItem){
    this.HrJobsForm.setValue({
      jobId: nextItem.jobId,
      departMentId: nextItem.departMentId,
      jcode: nextItem.jcode,
      jname1: nextItem.jname1,
      jname2: nextItem.jname2,
      jdesc: nextItem.jdesc,
      jresponsibilities: nextItem.jresponsibilities,
      jqualifications: nextItem.jqualifications,
      jduties: nextItem.jduties,
      remarks: nextItem.remarks,
      parentId: nextItem.parentId,
      standardMonthlyWage: nextItem.standardMonthlyWage,
      standardHolyDays: nextItem.standardHolyDays,
      standardDailyWage: nextItem.standardDailyWage,
      standardDailyWorkHours: nextItem.standardDailyWorkHours,
      standardHourlyWage: nextItem.standardHourlyWage,
      numberAvailable: nextItem.numberAvailable
    });

    
    this.firstRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const LastItem = this.allHrJobs.findIndex(p=>p.jobId == this.HrJobsForm.value.jobId);

    if(this.allHrJobs.length -1 === LastItem){
      this.DisabledNextButton = true;
      this.lastRow = true;

    }

    this.DisabledPrevButton = false;

  }
}

Open_delete_confirm(){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.definitionService.DeleteHrJob(this.HrJobsForm.value.jobId).subscribe(res=>{
        if(res){
          this.GetAllHrJobs();
         this.HrJobsForm.setValue({
           jobId: null,
           departMentId: null,
           jcode: null,
           jname1: null,
           jname2: null,
           jdesc: null,
           jresponsibilities: null,
           jqualifications: null,
           jduties: null,
           remarks: null,
           parentId: null,
           standardMonthlyWage: null,
           standardHolyDays: null,
           standardDailyWage: null,
           standardDailyWorkHours: null,
           standardHourlyWage: null,
           numberAvailable: null
         })

          this.DeleteDisable = true;
          this.UpdateDisable = true;
        }
      })
         
    }
  });
}

undo(){
  this.HrJobsForm.disable();

  if(this.undoIndex != -1){
    const undoItem = this.allHrJobs[this.undoIndex]

    if(undoItem){
      this.HrJobsForm.setValue({
        jobId: undoItem.jobId,
        departMentId: undoItem.departMentId,
        jcode: undoItem.jcode,
        jname1: undoItem.jname1,
        jname2: undoItem.jname2,
        jdesc: undoItem.jdesc,
        jresponsibilities: undoItem.jresponsibilities,
        jqualifications: undoItem.jqualifications,
        jduties: undoItem.jduties,
        remarks: undoItem.remarks,
        parentId: undoItem.parentId,
        standardMonthlyWage: undoItem.standardMonthlyWage,
        standardHolyDays: undoItem.standardHolyDays,
        standardDailyWage: undoItem.standardDailyWage,
        standardDailyWorkHours: undoItem.standardDailyWorkHours,
        standardHourlyWage: undoItem.standardHourlyWage,
        numberAvailable: undoItem.numberAvailable
      });
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
  }
}

updateHrJob(){
  this.HrJobsForm.enable();
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
  this.undoIndex = this.allHrJobs.findIndex(p=>p.jobId == this.HrJobsForm.value.jobId);
}


New(){
  this.HrJobsForm.enable();
  this.undoIndex = this.allHrJobs.findIndex(p=>p.jobId == this.HrJobsForm.value.jobId);
  this.HrJobsForm.setValue({
    jobId: null,
    departMentId: null,
    jcode: null,
    jname1: null,
    jname2: null,
    jdesc: null,
    jresponsibilities: null,
    jqualifications: null,
    jduties: null,
    remarks: null,
    parentId: null,
    standardMonthlyWage: null,
    standardHolyDays: null,
    standardDailyWage: null,
    standardDailyWorkHours: null,
    standardHourlyWage: null,
    numberAvailable: null
  })

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



}
