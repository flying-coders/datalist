import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item/item.service';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item: Item = {
    title: '',
    detail: ''
  }

  constructor(private itemServ: ItemService) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.item.title != '' && this.item.detail != '') {
      this.itemServ.addItem(this.item);
    }
  }  
}
