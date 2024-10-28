import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AccountService } from 'src/app/account/account.service';


@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss']
})
export class DefinitionComponent {

  constructor(public accountService:AccountService){

  }

}
