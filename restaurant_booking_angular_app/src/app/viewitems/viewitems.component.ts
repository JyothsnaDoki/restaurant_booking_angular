// import { Component } from '@angular/core';
// import { DataService } from '../data.service';
// import {Data} from '../data';
// import { CartService } from '../cart.service';
// @Component({
//   selector: 'app-viewitems',
//   templateUrl: './viewitems.component.html',
//   styleUrls: ['./viewitems.component.css']
// })
// export class ViewitemsComponent {
//   item: Data[] = [];

//   isAdmin:Boolean=false;

//   constructor(private dataService: DataService,private cs : CartService) { }
//   deletePost(id:number){
//     this.dataService.delete(id).subscribe(res => {
//          this.item = this.item.filter(item=> item.itemId !== id);
//          console.log('User deleted successfully!');
//     })
  
//   }
//   addtocart(item:any){
//     this.cs.addtoCart(item);

//   }
//   ngOnInit() {

//     this.dataService.sendGetRequest().subscribe((data: any)=>{
//       console.log(data);
//       this.item = data;
//     }) 

// }
// }




import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from '../data';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewitems',
  templateUrl: './viewitems.component.html',
  styleUrls: ['./viewitems.component.css']
})
export class ViewitemsComponent {
  item: Data[] = [];
  searchKey: string = "";
  public searchTerm: string = '';
  isAdmin: Boolean = false;
  selectedSortOption: string = 'lowToHigh';

  constructor(private dataService: DataService, private cs: CartService, private router: Router) { }

  deletePost(id: number) {
    this.dataService.delete(id).subscribe(res => {
      this.item = this.item.filter(item => item.itemId !== id);
      console.log('User deleted successfully!');
    });
  }

  addtocart(itemId: number) {
    const selectedItem = this.item.find((item) => item.itemId === itemId);
    console.log(selectedItem);

    if (selectedItem) {
      this.router.navigate(['/book', itemId], { state: { selectedItem } });
    } else {
      console.error('Selected item not found.');
    }
  }

  isAddToCartDisabled(item: Data): boolean {
    return item.itemAvailability === 'no';
  }

  ngOnInit() {
    this.dataService.sendGetRequest().subscribe((data: any) => {
      console.log(data);
      this.item = data;
      this.sortItems(); // Initially sort the items
    });
    this.dataService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.dataService.search.next(this.searchTerm);
  }

  // sortItems() {
  //   if (this.selectedSortOption === 'lowToHigh') {
  //     this.item.sort((a, b) => a.price - b.price);
  //   } else if (this.selectedSortOption === 'highToLow') {
  //     this.item.sort((a, b) => b.price - a.price);
  //   }
  // }

  // Your component file

// Assume 'items' is your array of items

sortItems() {
  if (this.selectedSortOption === 'lowToHigh') {
    this.item.sort((a, b) => a.price - b.price);
  } else if (this.selectedSortOption === 'highToLow') {
    this.item.sort((a, b) => b.price - a.price);
  } else if (this.selectedSortOption === 'availableFirst') {
    this.item.sort((a, b) => {
      if (a.itemAvailability === 'yes' && b.itemAvailability === 'no') {
        return -1;
      } else if (a.itemAvailability === 'no' && b.itemAvailability === 'yes') {
        return 1;
      }
      return 0;
    });
  } else if (this.selectedSortOption === 'unavailableFirst') {
    this.item.sort((a, b) => {
      if (a.itemAvailability === 'no' && b.itemAvailability === 'yes') {
        return -1;
      } else if (a.itemAvailability === 'yes' && b.itemAvailability === 'no') {
        return 1;
      }
      return 0;
    });
  }
}

// Additional logic for items array retrieval, initialization, etc.

}
