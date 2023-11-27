import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any=[]
  public items = new BehaviorSubject<any>([]);

  constructor() { }
  getItems(){
     return this.items.asObservable();
  }
  setItems(item : any){
    this.cartItemList.push(...item);
    this.items.next(item);
  }
  addtoCart(item:any): void{
    this.cartItemList.push(item);
    this.items.next(this.cartItemList);
    this.getTotalPrice();
  }

 

  getTotalPrice():number{
    let grandtotal=0;
    this.cartItemList.map((a:any)=>{grandtotal+=a.price;})
    return grandtotal;
  }
  removecartItem(item:any){
    this.cartItemList.map((a:any , index:any)=>{
      if(item.id === a.id){
        this.cartItemList.splice(index ,1);

      }
    })
  }
  
  
}




