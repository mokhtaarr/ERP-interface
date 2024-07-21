import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefinitionService } from '../definition.service';
import { Items } from 'src/app/shared/models/items';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { AddItemUnitComponent } from '../add-item-unit/add-item-unit.component';
import { ProdBasicUnitsComponent } from '../prod-basic-units/prod-basic-units.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { GetItemCollectionsComponent } from '../get-item-collections/get-item-collections.component';
import { UpdateItemUnitComponent } from '../update-item-unit/update-item-unit.component';
import { environment } from 'src/environments/environment.prod';
import { ItemPartitionWithHisStoreComponent } from '../item-partition-with-his-store/item-partition-with-his-store.component';
import { UpdateItemCollectionComponent } from '../update-item-collection/update-item-collection.component';
import { UpdateItemCollectionFromDataBaseComponent } from '../update-item-collection-from-data-base/update-item-collection-from-data-base.component';
import { UpdateItemAlternativeComponent } from '../update-item-alternative/update-item-alternative.component';
import { UpdateItemAlternativeFromDatabaseComponent } from '../update-item-alternative-from-database/update-item-alternative-from-database.component';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})




export class ItemsComponent implements OnInit {

  tabsBgColor : string = "blue" ;
  items : any[] = []
  getItemNextItem : Items | undefined
  displayedColumns: string[] = ['position', 'name','nameEn','isExpir','isDimension','isAttributeItem','isCollection','isSerialItem'];
    
   
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

  itemUnitsSub : any[] = [];
  itemCollectionsData : any;
  dataSource:any

  selectFile ?: File ;
  selectedImage: any;
  getRow !: Items

  itemUnitReadOnly : boolean = false;
  
  AllItemCategory : any[] = [];
  AllPartitions : any[] = [];
  itemUnits : any[] = [];
  ItemsInListNull : any;
  ItemsPartitions : any;
  ItemAlternativesSendData : any;

  itemCollections : any[] = [];
  itemAlternatives : any[] = [];
  itemPartitionWithStores : any[] = [];
  imagePath = environment.ImageUrl;
  imageName:any;
  itemCollectionFromDataBase : any[] = [];
  itemDefaultPartitionsFromDataBase : any[] = [];
  itemAlternativesFromDataBase : any[] = []; 
  
  itemIsCollection : boolean = true;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild('tabGroup', { static: false }) tabGroup!: MatTabGroup;



  constructor(private definitionService:DefinitionService,private fb:FormBuilder,private dialog: MatDialog,
    public toastr: ToastrService){
    
  }

  

  ngOnInit(): void {
    this.itemForm.disable();
    this.loadItems();
    this.GetAllItemCategories();
    this.GetAllPartitions();
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
    list:[[]],
    ItemCode: ['',Validators.required], 
    itemDescA: ['',Validators.required], 
    itemDescE: [''], 
    ImgDesc1: [''], 
    ImgDesc2: [''], 
    Image: [''], 
    taxItemCode:[''],
    storePartId:[],
    itemCategoryId:[],
    itemType:[1],
    itemLimit:[],
    qtyInBox:[],
    purchasePrice:[],
    qtyInNotebook:[],
    qtyPartiation:[],
    coastAverage:[],
    beforLastCost:[],
    lastCost:[],
    lastSalePrice:[],
    lastPurchDate:[],
    warantyPeriod:[],
    isCollection:[false],
    isAttributeItem:[],
    isDimension:[],
    isSerialItem:[],
    serialNoPrefix:[''],
    isExpir:[],
    addField1:[''],
    addField2:[''],
    addField3:[''],
    addField4:[''],
    addField5:[''],
    addField6:[''],
    addField7:[''],
    addField8:[''],
    addField9:[''],
    addField10:[''],
    remarks:[''],
    basUnitId:[,Validators.required],
    unitCode:[''],
    unitNam:[''],
    itemCollections:[[]],
    unittRate:[],
    unitNameE:[''],
    etaxUnitCode:[''],
    cannotDevide:[''],
    symbol:[''],
    itemPartition:[[]],
    itemAlternatives:[[]],
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

   AddItemWitImage(){
    const formData = new FormData();
    const value_ItemCardId = this.itemForm.value.ItemCardId ?? ""; 
    const value_ImgDesc1 = this.itemForm.value.ImgDesc1 ?? "";
    const value_ImgDesc2 = this.itemForm.value.ImgDesc2 ?? "";
    const file: Blob = this.selectFile ?? new Blob();
    formData.append('ItemCardId', value_ItemCardId);
    formData.append('ImgDesc1', value_ImgDesc1);
    formData.append('ImgDesc2', value_ImgDesc2);
    formData.append('image', file, this.selectFile?.name);

    this.definitionService.AddItemWitImage(formData).subscribe(res=>{
      this.itemForm.disable();
    });
  }

  onSumbit(){
      this.ItemsInListNull = this.itemUnitsSub
      this.itemCollectionsData = this.itemCollections;
      this.ItemsPartitions = this.itemPartitionWithStores;
      this.ItemAlternativesSendData = this.itemAlternatives;
  
      if(this.ItemsInListNull != null){
        this.itemForm.get("list")!.setValue(this.ItemsInListNull) 
      }
  
      if(this.itemCollectionsData != null){
        this.itemForm.get("itemCollections")!.setValue(this.itemCollectionsData)
      }
  
      if(this.ItemsPartitions != null){
        this.itemForm.get("itemPartition")!.setValue(this.ItemsPartitions)
      }
  
      if(this.ItemAlternativesSendData != null){
        this.itemForm.get("itemAlternatives")!.setValue(this.ItemAlternativesSendData)
      }
      
       this.definitionService.AddMsItemCard(this.itemForm.value).subscribe(res=>{
        if(res.status){
          this.itemForm.disable();
          this.loadItems();
          this.itemForm.get('ItemCardId')?.setValue(res.id)
          this.AddItemWitImage();
          this.DisabledNextButton = false;
          this.DisabledPrevButton = false;
          this.lastRow = false;
          this.firstRow = false;
          this.SaveDisable=true;
          this.UpdateDisable = false;
          this.UndoDisabled = true;
          this.DeleteDisable=false;
          this.itemUnitsSub.splice(0, this.itemUnitsSub.length);
          this.itemCollections.splice(0, this.itemCollections.length);
          this.itemAlternatives.splice(0,this.itemAlternatives.length);
          this.itemPartitionWithStores.splice(0,this.itemPartitionWithStores.length);
          
          this.tabGroup.selectedIndex = 0;
  
        }
     })
  
  }
  


  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  fillForm(row: any) {
    this.getRow = row
    this.itemForm.setValue({
      ItemCardId: row.itemCardId,
      ItemCode: row.itemCode,
      itemDescA: row.itemDescA,
      itemDescE: row.itemDescE,
      ImgDesc1: null,
      ImgDesc2: null,
      Image: null,
      taxItemCode: row.taxItemCode,
      storePartId: row.storePartId,
      itemCategoryId: row.itemCategoryId,
      itemType: row.itemType,
      itemLimit: row.itemLimit,
      qtyInBox: row.qtyInBox,
      purchasePrice: row.purchasePrice,
      qtyInNotebook: row.qtyInNotebook,
      qtyPartiation: row.qtyPartiation,
      coastAverage: row.coastAverage,
      beforLastCost: row.beforLastCost,
      lastCost: row.lastCost,
      lastSalePrice: row.lastSalePrice,
      lastPurchDate: row.lastPurchDate,
      warantyPeriod: row.warantyPeriod,
      isCollection: row.isCollection,
      isAttributeItem: row.isAttributeItem,
      isDimension: row.isDimension,
      isSerialItem: row.isSerialItem,
      serialNoPrefix: row.serialNoPrefix,
      isExpir: row.isExpir,
      addField1: row.addField1,
      addField2: row.addField2,
      addField3: row.addField3,
      addField4: row.addField4,
      addField5: row.addField5,
      addField6: row.addField6,
      addField7: row.addField7,
      addField8: row.addField8,
      addField9: row.addField9,
      addField10: row.addField10,
      remarks: row.remarks,
      basUnitId: row.basUnitId,
      unitCode: null,
      unitNam: null,
      list: null,
      itemCollections: null,
      unittRate: null,
      unitNameE: null,
      etaxUnitCode: null,
      cannotDevide: null,
      symbol: null,
      itemPartition: null,
      itemAlternatives: null
    });
    this.itemUnitReadOnly = true;
    this.UpdateDisable = false;
    this.DeleteDisable = false;
    this.UndoDisabled = true;
    window.scrollTo({ top: 40, behavior: 'smooth' });
  }

 


  getFirstRowData(){
    this.items = this.dataSource.filteredData
    const FirstItem = this.items[0];

    this.itemForm.setValue({
      ItemCardId: FirstItem.itemCardId,
      ItemCode: FirstItem.itemCode,
      itemDescA: FirstItem.itemDescA,
      itemDescE: FirstItem.itemDescE,
      ImgDesc1: null,
      ImgDesc2: null,
      Image: null,
      taxItemCode: FirstItem.taxItemCode,
      storePartId: FirstItem.storePartId,
      itemCategoryId: FirstItem.itemCategoryId,
      itemType: FirstItem.itemType,
      itemLimit: FirstItem.itemLimit,
      qtyInBox: FirstItem.qtyInBox,
      purchasePrice: FirstItem.purchasePrice,
      qtyInNotebook: FirstItem.qtyInNotebook,
      qtyPartiation: FirstItem.qtyPartiation,
      coastAverage: FirstItem.coastAverage,
      beforLastCost: FirstItem.beforLastCost,
      lastCost: FirstItem.lastCost,
      lastSalePrice: FirstItem.lastSalePrice,
      lastPurchDate: FirstItem.lastPurchDate,
      warantyPeriod: FirstItem.warantyPeriod,
      isCollection: FirstItem.isCollection,
      isAttributeItem: FirstItem.isAttributeItem,
      isDimension: FirstItem.isDimension,
      isSerialItem: FirstItem.isSerialItem,
      serialNoPrefix: FirstItem.serialNoPrefix,
      isExpir: FirstItem.isExpir,
      addField1: FirstItem.addField1,
      addField2: FirstItem.addField2,
      addField3: FirstItem.addField3,
      addField4: FirstItem.addField4,
      addField5: FirstItem.addField5,
      addField6: FirstItem.addField6,
      addField7: FirstItem.addField7,
      addField8: FirstItem.addField8,
      addField9: FirstItem.addField9,
      addField10: FirstItem.addField10,
      remarks: FirstItem.remarks,
      basUnitId: FirstItem.basUnitId,
      unitCode: null,
      unitNam: null,
      list: null,
      itemCollections: null,
      unittRate: null,
      unitNameE: null,
      etaxUnitCode: null,
      cannotDevide: null,
      symbol: null,
      itemPartition: null,
      itemAlternatives: null
    })  

    this.firstRow = true;
    this.lastRow = false;
    this.DisabledPrevButton = true;
    this.DisabledNextButton = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

  }

  getLastRowData(){
    this.items = this.dataSource.filteredData
    const LastItem = this.items[this.items.length-1];
    this.itemForm.setValue({
      ItemCardId: LastItem.itemCardId,
      ItemCode: LastItem.itemCode,
      itemDescA: LastItem.itemDescA,
      itemDescE: LastItem.itemDescE,
      ImgDesc1: null,
      ImgDesc2: null,
      Image: null,
      taxItemCode: LastItem.taxItemCode,
      storePartId: LastItem.storePartId,
      itemCategoryId: LastItem.itemCategoryId,
      itemType: LastItem.itemType,
      itemLimit: LastItem.itemLimit,
      qtyInBox: LastItem.qtyInBox,
      purchasePrice: LastItem.purchasePrice,
      qtyInNotebook: LastItem.qtyInNotebook,
      qtyPartiation: LastItem.qtyPartiation,
      coastAverage: LastItem.coastAverage,
      beforLastCost: LastItem.beforLastCost,
      lastCost: LastItem.lastCost,
      lastSalePrice: LastItem.lastSalePrice,
      lastPurchDate: LastItem.lastPurchDate,
      warantyPeriod: LastItem.warantyPeriod,
      isCollection: LastItem.isCollection,
      isAttributeItem: LastItem.isAttributeItem,
      isDimension: LastItem.isDimension,
      isSerialItem: LastItem.isSerialItem,
      serialNoPrefix: LastItem.serialNoPrefix,
      isExpir: LastItem.isExpir,
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
      remarks: LastItem.remarks,
      basUnitId: LastItem.basUnitId,
      unitCode: null,
      unitNam: null,
      list: null,
      itemCollections: null,
      unittRate: null,
      unitNameE: null,
      etaxUnitCode: null,
      cannotDevide: null,
      symbol: null,
      itemPartition: null,
      itemAlternatives: null
    })  

    this.firstRow = false;
    this.lastRow = true;
    this.DisabledPrevButton = false;
    this.DisabledNextButton = true;
    this.UpdateDisable = false;
    this.DeleteDisable = false;
  }

  getNextRowData() {
      this.items = this.dataSource.filteredData

      const index = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);
      const nextItem = this.items[index + 1];

      this.itemForm.setValue({
        ItemCardId: nextItem.itemCardId,
        ItemCode: nextItem.itemCode,
        itemDescA: nextItem.itemDescA,
        itemDescE: nextItem.itemDescE,
        ImgDesc1: null,
        ImgDesc2: null,
        Image: null,
        taxItemCode: nextItem.taxItemCode,
        storePartId: nextItem.storePartId,
        itemCategoryId: nextItem.itemCategoryId,
        itemType: nextItem.itemType,
        itemLimit: nextItem.itemLimit,
        qtyInBox: nextItem.qtyInBox,
        purchasePrice: nextItem.purchasePrice,
        qtyInNotebook: nextItem.qtyInNotebook,
        qtyPartiation: nextItem.qtyPartiation,
        coastAverage: nextItem.coastAverage,
        beforLastCost: nextItem.beforLastCost,
        lastCost: nextItem.lastCost,
        lastSalePrice: nextItem.lastSalePrice,
        lastPurchDate: nextItem.lastPurchDate,
        warantyPeriod: nextItem.warantyPeriod,
        isCollection: nextItem.isCollection,
        isAttributeItem: nextItem.isAttributeItem,
        isDimension: nextItem.isDimension,
        isSerialItem: nextItem.isSerialItem,
        serialNoPrefix: nextItem.serialNoPrefix,
        isExpir: nextItem.isExpir,
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
        remarks: nextItem.remarks,
        basUnitId: nextItem.basUnitId,
        unitCode: null,
        unitNam: null,
        list: null,
        itemCollections: null,
        unittRate: null,
        unitNameE: null,
        etaxUnitCode: null,
        cannotDevide: null,
        symbol: null,
        itemPartition: null,
        itemAlternatives: null
      })    

 
      this.firstRow = false;
      this.UpdateDisable = false;
      this.DeleteDisable = false;
      const LastItem = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);

      if(this.items.length -1 === LastItem){
        this.DisabledNextButton = true;
      this.lastRow = true;
      }
      this.DisabledPrevButton = false;


}

getPrevRowData() {
  this.items = this.dataSource.filteredData
  const index = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);
  const PrevItem = this.items[index - 1];
  if(PrevItem != null){
    this.itemForm.setValue({
      ItemCardId: PrevItem.itemCardId,
      ItemCode: PrevItem.itemCode,
      itemDescA: PrevItem.itemDescA,
      itemDescE: PrevItem.itemDescE,
      ImgDesc1: null,
      ImgDesc2: null,
      Image: null,
      taxItemCode: PrevItem.taxItemCode,
      storePartId: PrevItem.storePartId,
      itemCategoryId: PrevItem.itemCategoryId,
      itemType: PrevItem.itemType,
      itemLimit: PrevItem.itemLimit,
      qtyInBox: PrevItem.qtyInBox,
      purchasePrice: PrevItem.purchasePrice,
      qtyInNotebook: PrevItem.qtyInNotebook,
      qtyPartiation: PrevItem.qtyPartiation,
      coastAverage: PrevItem.coastAverage,
      beforLastCost: PrevItem.beforLastCost,
      lastCost: PrevItem.lastCost,
      lastSalePrice: PrevItem.lastSalePrice,
      lastPurchDate: PrevItem.lastPurchDate,
      warantyPeriod: PrevItem.warantyPeriod,
      isCollection: PrevItem.isCollection,
      isAttributeItem: PrevItem.isAttributeItem,
      isDimension: PrevItem.isDimension,
      isSerialItem: PrevItem.isSerialItem,
      serialNoPrefix: PrevItem.serialNoPrefix,
      isExpir: PrevItem.isExpir,
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
      remarks: PrevItem.remarks,
      basUnitId: PrevItem.basUnitId,
      unitCode: null,
      unitNam: null,
      list: null,
      itemCollections: null,
      unittRate: null,
      unitNameE: null,
      etaxUnitCode: null,
      cannotDevide: null,
      symbol: null,
      itemPartition: null,
      itemAlternatives: null
    })     

    
    this.firstRow = false;
    this.lastRow = false;
    this.UpdateDisable = false;
    this.DeleteDisable = false;

    const Firstindex = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);
    if(Firstindex === 0){
      this.DisabledPrevButton = true;
      this.firstRow = true;
    }
  
    this.DisabledNextButton = false;
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
     this.definitionService.DeleteItem(this.itemForm.value.ItemCardId).subscribe(res=>{
      if(res.status){
        this.loadItems();
        this.itemForm.setValue({
          ItemCardId: null,
          list: null,
          ItemCode: null,
          itemDescA: null,
          itemDescE: null,
          ImgDesc1: null,
          ImgDesc2: null,
          Image: null,
          taxItemCode: null,
          storePartId: null,
          itemCategoryId: null,
          itemType: null,
          itemLimit: null,
          qtyInBox: null,
          purchasePrice: null,
          qtyInNotebook: null,
          qtyPartiation: null,
          coastAverage: null,
          beforLastCost: null,
          lastCost: null,
          lastSalePrice: null,
          lastPurchDate: null,
          warantyPeriod: null,
          isCollection: null,
          isAttributeItem: null,
          isDimension: null,
          isSerialItem: null,
          serialNoPrefix: null,
          isExpir: null,
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
          remarks: null,
          basUnitId: undefined,
          unitCode: null,
          unitNam: null,
          itemCollections: null,
          unittRate: null,
          unitNameE: null,
          etaxUnitCode: null,
          cannotDevide: null,
          symbol: null,
          itemPartition: null,
          itemAlternatives: null
        });
        this.DeleteDisable = true;
        this.UpdateDisable = true;
      }
     })
    }
  });
}

undo(){
  this.itemForm.disable();

    if(this.undoIndex != -1){
      const undoItem = this.items[this.undoIndex]

      if(undoItem){
        this.itemForm.setValue({
          ItemCardId: undoItem.itemCardId,
          ItemCode: undoItem.itemCode,
          itemDescA: undoItem.itemDescA,
          itemDescE: undoItem.itemDescE,
          ImgDesc1: null,
          ImgDesc2: null,
          Image: null,
          taxItemCode: undoItem.taxItemCode,
          storePartId: undoItem.storePartId,
          itemCategoryId: undoItem.itemCategoryId,
          itemType: undoItem.itemType,
          itemLimit: undoItem.itemLimit,
          qtyInBox: undoItem.qtyInBox,
          purchasePrice: undoItem.purchasePrice,
          qtyInNotebook: undoItem.qtyInNotebook,
          qtyPartiation: undoItem.qtyPartiation,
          coastAverage: undoItem.coastAverage,
          beforLastCost: undoItem.beforLastCost,
          lastCost: undoItem.lastCost,
          lastSalePrice: undoItem.lastSalePrice,
          lastPurchDate: undoItem.lastPurchDate,
          warantyPeriod: undoItem.warantyPeriod,
          isCollection: undoItem.isCollection,
          isAttributeItem: undoItem.isAttributeItem,
          isDimension: undoItem.isDimension,
          isSerialItem: undoItem.isSerialItem,
          serialNoPrefix: undoItem.serialNoPrefix,
          isExpir: undoItem.isExpir,
          addField1: undoItem.addField1,
          addField2: undoItem.addField2,
          addField3: undoItem.addField3,
          addField4: undoItem.addField4,
          addField5: undoItem.addField5,
          addField6: undoItem.addField6,
          addField7: undoItem.addField7,
          addField8: undoItem.addField8,
          addField9: undoItem.addField9,
          addField10: undoItem.addField10,
          remarks: undoItem.remarks,
          basUnitId: undoItem.basUnitId,
          unitCode: null,
          unitNam: null,
          list: null,
          itemCollections: null,
          unittRate: null,
          unitNameE: null,
          etaxUnitCode: null,
          cannotDevide: null,
          symbol: null,
          itemPartition: null,
          itemAlternatives: null
        })
      
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


updateItem(){
  this.itemUnitReadOnly = false; 
  this.itemForm.enable();
  this.DeleteDisable = true;
  this.DisabledNextButton = true;
  this.DisabledPrevButton = true;
  this.lastRow = true;
  this.firstRow = true;
  this.SaveDisable = false;
  this.EditReadonly = true;
  this.itemUnitReadOnly = true;
  this.reloadDisabled = false;
  this.UpdateDisable = true;
  this.itemForm.get("unitCode")?.disable();
  this.UndoDisabled = false;
  this.items = this.dataSource.filteredData;
  this.undoIndex = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);

}

New(){
  this.itemForm.enable();
  this.items = this.dataSource.filteredData;
  this.undoIndex = this.items.findIndex(p=>p.itemCardId == this.itemForm.value.ItemCardId);
  this.itemForm.setValue({
    ItemCardId: null,
    ItemCode: null,
    itemDescA: null,
    itemDescE: null,
    ImgDesc1: null,
    ImgDesc2: null,
    Image: null,
    taxItemCode: null,
    storePartId: null,
    itemCategoryId: null,
    itemType: 1,
    itemLimit: null,
    qtyInBox: null,
    purchasePrice: null,
    qtyInNotebook: null,
    qtyPartiation: null,
    coastAverage: null,
    beforLastCost: null,
    lastCost: null,
    lastSalePrice: null,
    lastPurchDate: null,
    warantyPeriod: null,
    isCollection: null,
    isAttributeItem: null,
    isDimension: null,
    isSerialItem: null,
    serialNoPrefix: null,
    isExpir: null,
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
    remarks: null,
    basUnitId: null,
    unitCode: null,
    unitNam: null,
    list: null,
    itemCollections: null,
    unittRate: null,
    unitNameE: null,
    etaxUnitCode: null,
    cannotDevide: null,
    symbol: null,
    itemPartition: null,
    itemAlternatives: null
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
  this.itemUnitReadOnly = false; 

  this.itemPartitionWithStores = [];
  this.itemDefaultPartitionsFromDataBase =[];
  this.itemAlternatives = [];
  this.itemAlternativesFromDataBase = [];
  this.itemCollections = [];
  this.itemCollectionFromDataBase = [];
  this.selectedImage ='';
  this.imageName = '';
  this.itemUnits = [];
  this.itemUnitsSub = [];
  
}

GetAllItemCategories(){
this.definitionService.GetAllItemCategories().subscribe(res=>{
  this.AllItemCategory = res;
})
}

GetAllPartitions(){
  this.definitionService.GetAllPartitions().subscribe(res=>{
    this.AllPartitions = res;
  })
}
  

onTabChanged(event: MatTabChangeEvent) {
  if (event.tab.textLabel === 'وحدت و أسعار') {
    this.basicItemUnit();
  }

  if (event.tab.textLabel === 'صور') {
    this.GetProductImage();
  }

  if (event.tab.textLabel === 'صنف مجمع') {
    this.GetItemCollectionFromDataBase();
    this.ItemIsCollection()
  }

  if (event.tab.textLabel === 'مخازن أساسية') {
    this.GetItemDefaultPartitionsDataBase();
  }

  if (event.tab.textLabel === 'بدائل الصنف'){
    this.GetItemAlternativesFromDataBase();
  }
  
}

GetItemPartitionWithHisStore(){
  var _popup = this.dialog.open(ItemPartitionWithHisStoreComponent, {
    width: '80%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'اختر',
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      for (let i = 0; i < response.length; i++) {
        let item = response[i];
        let exists = this.itemPartitionWithStores.some(existingItem => existingItem.storePartId === item.storePartId);
        let existsInDataBase;

        if(this.itemDefaultPartitionsFromDataBase.length != 0){
          existsInDataBase = this.itemDefaultPartitionsFromDataBase.some(i=>i.storePartId === item.storePartId)
        }

        if (!exists && !existsInDataBase) {
          this.itemPartitionWithStores.push(item);
        }else{
          this.toastr.info(`هذا المخزن  (${item.partDescA})  موجود من قبل`)
        }
      }
    }
  });
}

DeleteItemParttion(itemToDelete:any){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.itemPartitionWithStores = this.itemPartitionWithStores.filter(item => item !== itemToDelete);
      this.toastr.success("تم المسح بنجاح");

    }
  });
}

GetProductImage(){
  if(this.itemForm.value.ItemCardId){
    this.definitionService.GetItemImage(this.itemForm.value.ItemCardId).subscribe(res=>{
      if(res){
        this.imageName = res.imgPath
        this.itemForm.get("ImgDesc1")?.setValue(res.imgDesc1)
        this.itemForm.get("ImgDesc2")?.setValue(res.imgDesc1)
      }else{
        this.imageName = "imageNotFound.jpg";
        this.itemForm.get("ImgDesc1")?.setValue("")
        this.itemForm.get("ImgDesc2")?.setValue("")
      }
    })
  }
}

basicItemUnit() {
  if(this.itemForm.value.basUnitId != null){
  this.definitionService.GetBasicItemUnit(this.itemForm.value.basUnitId).subscribe({
    next: (res) => {
        this.itemForm.get("unitCode")?.setValue(res.unitCode);
        this.itemForm.get("unitNam")?.setValue(res.unitNam);
    },
    complete: () => {
      this.GetItemUnits();
    }
  });
 }
}


GetItemUnits(){
  this.definitionService.GetItemUnit(this.itemForm.value.ItemCardId).subscribe(res=>{
   this.itemUnits = res
  })
}

AddItemUint(){
  var _popup = this.dialog.open(AddItemUnitComponent, {
    width: '80%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'أضافة وحده للمنتج',
      itemCardId: this.itemForm.value.ItemCardId,
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      this.definitionService.GetItemUnit(response).subscribe(res=>{
        this.itemUnits = res
      });
    }
  });
}

updateItemUnit(itemUnit:any){
  var _popup = this.dialog.open(AddItemUnitComponent, {
    width: '90%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل وحده',
      itemUnitData : itemUnit
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
        this.itemUnitsSub = this.itemUnitsSub.filter(item => item.basUnitId !== itemUnit.basUnitId);
        this.itemUnitsSub.push(response);
        this.toastr.success("تم التعديل بنجاح")

    }
  });
}



updateItemCollection(itemCollection:any){
  var _popup = this.dialog.open(UpdateItemCollectionComponent, {
    width: '90%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل صنف مجمع',
      itemCollectionData : itemCollection,
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
        this.itemCollections = this.itemCollections.filter(item => item.itemCardId !== itemCollection.itemCardId);
        this.itemCollections.push(response);
        this.toastr.success("تم التعديل بنجاح")

    }
  });
}

updateItemCollectionFromDataBase(itemCollection:any){
  var _popup = this.dialog.open(UpdateItemCollectionFromDataBaseComponent, {
    width: '90%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل صنف مجمع',
      itemCollectionData : itemCollection,
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
     this.GetItemCollectionFromDataBase();
    }
  });
}


DeleteItemUnit(basUnitId : any){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.itemUnitsSub = this.itemUnitsSub.filter(item => item.basUnitId !== basUnitId);
      this.toastr.success("تم المسح بنجاح")
    }
  });
}

updateItemAlternative(itemAlter:any){
  var _popup = this.dialog.open(UpdateItemAlternativeComponent, {
    width: '90%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل صنف بديل',
      itemAlterData : itemAlter,
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
        this.itemAlternatives = this.itemAlternatives.filter(item => item.itemCardId !== itemAlter.itemCardId);
        this.itemAlternatives.push(response);
        this.toastr.success("تم التعديل بنجاح")

    }
  });
}

updateItemAlterFromDataBase(itemAlternative:any){
  console.log('beforePop up',itemAlternative)
  var _popup = this.dialog.open(UpdateItemAlternativeFromDatabaseComponent, {
    width: '90%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل صنف بديل',
      itemAlterData : itemAlternative,
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
     this.GetItemAlternativesFromDataBase();
    }
  });
}


OpenProdBasicUnits(){
  var _popup = this.dialog.open(ProdBasicUnitsComponent, {
    width: '80%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'وحده المنتج',
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      this.itemForm.get("basUnitId")?.setValue(response.basUnitId);
      this.itemForm.get("unitCode")?.setValue(response.unitCode);
      this.itemForm.get("unitNam")?.setValue(response.unitNam);
      this.itemForm.get("unitNameE")?.setValue(response.unitNameE);
      this.itemForm.get("unittRate")?.setValue(response.unittRate);
      this.itemForm.get("etaxUnitCode")?.setValue(response.etaxUnitCode);
      this.itemForm.get("cannotDevide")?.setValue(response.cannotDevide);
      this.itemForm.get("symbol")?.setValue(response.symbol);

      
      
      this.definitionService.GetItemUnitSub(response.basUnitId).subscribe(res=>{
        this.itemUnitsSub = res
        this.itemUnitReadOnly = true;
        
      })
    }
  });
}

OpenItemCollectionList(){
  var _popup = this.dialog.open(GetItemCollectionsComponent, {
    width: '80%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'الإصناف',
    },
  });
  _popup.afterClosed().subscribe((response) => {
      if (response) {
        for (let i = 0; i < response.length; i++) {
          let item = response[i];
          let exists = this.itemCollections.some(existingItem => existingItem.itemCardId === item.itemCardId);
          let existsInDataBase;

          if(this.itemCollectionFromDataBase.length != 0){
            existsInDataBase = this.itemCollectionFromDataBase.some(i=>i.subItemId === item.itemCardId)
          }
          
          if (!exists && !existsInDataBase) {
            
            this.itemCollections.push(item);

          }else{
            this.toastr.info(`هذا الصنف ${item.itemDescA} موجود من قبل`)
          }
        }
    }
  });
}

DeleteItemCollection(itemCardId:any){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.itemCollections = this.itemCollections.filter(item => item.itemCardId !== itemCardId);
      this.toastr.success("تم المسح بنجاح")
    }
  });
}


openItemAlternatives(){
  var _popup = this.dialog.open(GetItemCollectionsComponent, {
    width: '80%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'بدائل الإصناف',
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
      for (let i = 0; i < response.length; i++) {
        let item = response[i];
        let exists = this.itemAlternatives.some(existingItem => existingItem.itemCardId === item.itemCardId);
        
        let existsInDataBase;

        if(this.itemAlternativesFromDataBase.length != 0){
          existsInDataBase = this.itemAlternativesFromDataBase.some(i=>i.alterItemCardId === item.itemCardId)
        }

        if (!exists && !existsInDataBase) {
          this.itemAlternatives.push(item);
        }else{
          this.toastr.info(`هذا الصنف ${item.itemDescA} موجود من قبل`)
        }
      }
    }
  });
}

DeleteItemAlternative(itemAlternative : any){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      this.itemAlternatives = this.itemAlternatives.filter(item => item !== itemAlternative);
      this.toastr.success("تم المسح بنجاح");
    }
  });

}




updateItemUnitFromDataBase(itemUnit:any){
  var _popup = this.dialog.open(UpdateItemUnitComponent, {
    width: '90%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
    data: {
      Title: 'تعديل وحده',
      itemUnitData : itemUnit
    },
  });
  _popup.afterClosed().subscribe((response) => {
    if(response){
        this.GetItemUnits();
    }
  });
}

deleteItemUnitFromDataBase(unitId:any){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
      
      this.definitionService.DeleteItemUnit(unitId).subscribe(res=>{
        this.GetItemUnits();
      });
    }
  });
}

GetItemCollectionFromDataBase(){
 if(this.itemForm.value.ItemCardId){
  this.definitionService.GetItemCollections(this.itemForm.value.ItemCardId).subscribe(res=>{
    this.itemCollectionFromDataBase = res
  })
 }
}


GetItemAlternativesFromDataBase(){
  if(this.itemForm.value.ItemCardId){
   this.definitionService.GetItemAlternatives(this.itemForm.value.ItemCardId).subscribe(res=>{
     this.itemAlternativesFromDataBase = res
   })
  }
 }


GetItemDefaultPartitionsDataBase(){
  if(this.itemForm.value.ItemCardId){
   this.definitionService.GetItemDefaultPartitions(this.itemForm.value.ItemCardId).subscribe(res=>{
     this.itemDefaultPartitionsFromDataBase = res
   })
  }
 }

DeleteItemCollectionFromDataBase(itemCollectId:any){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
     this.definitionService.DeleteItemCollection(itemCollectId).subscribe(res=>{
      if(res.status){
        this.GetItemCollectionFromDataBase();
      }
     })
    }
  });
}

DeleteItemAlternativesFromDataBase(alterId:any){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
     this.definitionService.DeleteItemAlternatives(alterId).subscribe(res=>{
      if(res.status){
        this.GetItemAlternativesFromDataBase();
      }
     })
    }
  });
}

DeleteItemDefaultParttionFromDatabase(itemStorePrtId:any){
  var _popup = this.dialog.open(DeleteConfirmComponent, {
    width: '30%',
    enterAnimationDuration: '1000ms',
    exitAnimationDuration: '1000ms',
  });
  _popup.afterClosed().subscribe((response) => {
    if (response) {
     this.definitionService.DeleteItemDefaultPartition(itemStorePrtId).subscribe(res=>{
      if(res.status){
        this.GetItemDefaultPartitionsDataBase();
      }
     })
    }
  });
} 

ItemIsCollection(){
  if(this.itemForm.value.isCollection == false){
    this.itemIsCollection = true;
  }else{
    this.itemIsCollection = false;
  }
}

}


