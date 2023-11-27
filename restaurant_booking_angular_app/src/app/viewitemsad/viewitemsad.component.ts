
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import {Data} from '../data';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-viewitemsad',
  templateUrl: './viewitemsad.component.html',
  styleUrls: ['./viewitemsad.component.css']
})
export class ViewitemsadComponent {

  item: Data[] = [];

  isAdmin:Boolean=false;

  constructor(private dataService: DataService,private cs : CartService) { }
  deletePost(id:number){
    this.dataService.delete(id).subscribe(res => {
         this.item = this.item.filter(item=> item.itemId !== id);
         console.log('User deleted successfully!');
    })
  
  }
  addtocart(item:any){
    this.cs.addtoCart(item);

  }
  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.item = data;
    }) 

}
}
