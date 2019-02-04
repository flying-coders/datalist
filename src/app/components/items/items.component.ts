import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item/item.service';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];

  constructor(private itemServ: ItemService) { }

  ngOnInit() {
    this.itemServ.getItems().subscribe(items => {
      //console.log(items);
      this.items = items;
    });
  }

  deleteItem(event, item) {
    this.itemServ.deleteItem(item);
  }

}
