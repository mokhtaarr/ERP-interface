import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';

@Component({
  selector: 'app-movement-book',
  templateUrl: './movement-book.component.html',
  styleUrls: ['./movement-book.component.scss']
})
export class MovementBookComponent implements OnInit{

  dataSource: any;
  displayedColumns: string[] = ['prefixCode', 'bookNameAr', 'bookNameEn', 'termType','startNum','endNum'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  AllSysBooks:any[] = [];
  constructor(private definitionService: DefinitionService , private fb:FormBuilder,private dialog: MatDialog){
  }
   

  ngOnInit(): void {
    this.GetAllSysBooks();
  }

  SysBooksForm = this.fb.group({
    bookId:[],
    prefixCode:[''],
    bookNameAr:[''],
    bookNameEn:[''],
    termType:[],
    // bookNameEn:[''],
    // bookNameEn:[''],
    // bookNameEn:[''],
    // bookNameEn:[''],
    // bookNameEn:[''],
    // bookNameEn:[''],
  })

  GetAllSysBooks(){
    this.definitionService.GetAllSysBooks().subscribe(res=>{
      this.AllSysBooks = res;
      this.dataSource = new MatTableDataSource<any>(this.AllSysBooks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    })
  }


  fillForm(row:any){
    console.log(row);
    if(row){

    }
  }
  
 
}
