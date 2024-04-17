import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { Items } from 'src/app/shared/models/items';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})




export class ItemsComponent implements OnInit{

  tabsBgColor : string = "blue" ;
  items : Items[] = []
  getItemNextItem : Items | undefined
  displayedColumns: string[] = ['position', 'name'];
    


  dataSource:any

  selectFile ?: File ;
  selectedImage: any;
  getRow !: Items
  
  DisabledPrevButton : boolean = false;
  DisabledNextButton : boolean = false;


  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private definitionService:DefinitionService,private fb:FormBuilder){
    
   
  }

  

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(){
    this.definitionService.getAllItems().subscribe((data: Items[]) => {
      this.items = data; 
      this.dataSource = new MatTableDataSource<Items>(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  itemForm = this.fb.group({
    ItemCardId:[], 
    ItemCode: ['',Validators.required], 
    itemDescA: ['',Validators.required], 
    itemDescE: ['',Validators.required], 
    ImgDesc1: [''], 
    ImgDesc2: [''], 
    Image: [''], 

  })


  onFileSelected(event:any){
    this.selectFile = <File> event.target.files[0];

    if (this.selectFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(this.selectFile);
    }


   }

  onSumbit(){
    const formData = new FormData();
    const value_ItemCardId = this.itemForm.value.ItemCardId ?? ""; 
    const value_itemCode = this.itemForm.value.ItemCode ?? "";
    const Value_itemDescA = this.itemForm.value.itemDescA ?? "";
    const Value_itemDescE = this.itemForm.value.itemDescE ?? "";
    const value_ImgDesc1 = this.itemForm.value.ImgDesc1 ?? "";
    const value_ImgDesc2 = this.itemForm.value.ImgDesc2 ?? "";
    const file: Blob = this.selectFile ?? new Blob();
    
    formData.append('ItemCardId', value_ItemCardId);
    formData.append('ItemCode', value_itemCode);
    formData.append('itemDescA', Value_itemDescA);
    formData.append('itemDescE', Value_itemDescE);
    formData.append('ImgDesc1', value_ImgDesc1);
    formData.append('ImgDesc2', value_ImgDesc2);
    formData.append('image', file, this.selectFile?.name);

    this.definitionService.addItem(formData).subscribe({
      next: () => {
        this.loadItems();
      }    
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  fillForm(row: Items) {
    this.getRow = row
    this.itemForm.setValue({
      ItemCardId : row.itemCardId,
      ItemCode: null,
      itemDescA: row.itemDescA,
      itemDescE: null,
      ImgDesc1: null,
      ImgDesc2: null,
      Image: null,
    });
    window.scrollTo({ top: 40, behavior: 'smooth' });
  }

 


  getFirstRowData(){
    this.items = this.dataSource.filteredData
    const FirstItem = this.items[0];

    this.itemForm.setValue({
      ItemCardId: FirstItem.itemCardId,
      ItemCode: null,
      itemDescA: FirstItem.itemDescA,
      itemDescE: null,
      ImgDesc1: null,
      ImgDesc2: null,
      Image: null
    })   

    this.DisabledPrevButton = false;
    this.DisabledNextButton = false;

  }

  getLastRowData(){
    this.items = this.dataSource.filteredData
    const LastItem = this.items[this.items.length-1];

    this.itemForm.setValue({
      ItemCardId: LastItem.itemCardId,
      ItemCode: null,
      itemDescA: LastItem.itemDescA,
      itemDescE: null,
      ImgDesc1: null,
      ImgDesc2: null,
      Image: null
    })   

    this.DisabledPrevButton = false;
    this.DisabledNextButton = false;

  }

  getNextRowData() {
      this.items = this.dataSource.filteredData

      const index = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);
      const nextItem = this.items[index + 1];

      this.itemForm.setValue({
        ItemCardId: nextItem.itemCardId,
        ItemCode: null,
        itemDescA: nextItem.itemDescA,
        itemDescE: null,
        ImgDesc1: null,
        ImgDesc2: null,
        Image: null
      })   

      this.DisabledPrevButton = false;

      const LastItem = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);

      if(this.items.length -1 === LastItem){
        this.DisabledNextButton = true
      }

}

getPrevRowData() {
  this.items = this.dataSource.filteredData
  const index = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);
  const PrevItem = this.items[index - 1];
  if(PrevItem != null){
    this.itemForm.setValue({
      ItemCardId: PrevItem.itemCardId,
      ItemCode: null,
      itemDescA: PrevItem.itemDescA,
      itemDescE: null,
      ImgDesc1: null,
      ImgDesc2: null,
      Image: null
    })   
  }
  const Firstindex = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);
  if(Firstindex === 0){
    this.DisabledPrevButton = true;
  }

  this.DisabledNextButton = false;


 
}



  
}
