import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DefinitionService } from '../definition.service';
import { MatTableDataSource } from '@angular/material/table';
import { Items } from 'src/app/shared/models/items';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { courseNode } from 'src/app/shared/models/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-branch-system',
  templateUrl: './branch-system.component.html',
  styleUrls: ['./branch-system.component.scss']
})
export class BranchSystemComponent implements OnInit {

  private _transformer = (node: courseNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  dataSource: any;
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  items : Items[] = []

    Tree_DATA: courseNode[] = [
    {
      name : 'angular tree',
      children :[
        {name : 'ang 1'},
        {name : 'ang 2'},
        {name : 'ang 3'}
      ]
    }
  ];
  
  nestedDataSource = new MatTreeNestedDataSource<courseNode>();
  nestedTreeControl = new NestedTreeControl<courseNode>(node=>node.children);
  
  constructor(){}


  ngOnInit(): void {
    this.nestedDataSource.data = this.Tree_DATA;
  }

  hasNestedChild(index:number,node:courseNode){
    return node.children!.length > 0  ;
  }

 
  
}
