import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ExampleFlatNode} from 'src/app/shared/models/tree';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})


export class JobsComponent {
  dataSource: any;
  allHrJobs : any[] = [];

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      jobId: node.jobId,
      nameEn : node.nameEn,
      jname1 : node.jname1
    };
    
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
    

  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,   
  );


 


  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){

      this.definitionService.GEtAllHrJobs().subscribe(res=>{
        this.allHrJobs = res;
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.dataSource.data = this.allHrJobs;
      })
 
  }




  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  
  displayNodeData(node: any) {
    console.log('Node data:', node);
  }
 
  displayNodeData2(node: any) {
    console.log('Node data 22222 :', node);
  }

  handleNodeClick(node: any) {
    console.log('Node data:', node);
  }
}
