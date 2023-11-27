import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.css']
})

export class AddcartComponent implements OnInit {

   public items : any = [] ;
   public grandtotal  : number=0;

  constructor(private ls:CartService) {}
  ngOnInit(): void {
    this.ls.getItems().subscribe((data: any) => {
     /* alert("Order Successful");*/
      console.log(data);
      this.items = data;
      this.grandtotal=this.ls.getTotalPrice();
    }
    ); 
    
  }

  buttonClick(){
    alert("Order successfully placed...!!!")
  }
  removecartItem(item:any){
    this.ls.removecartItem(item);
  }



}
