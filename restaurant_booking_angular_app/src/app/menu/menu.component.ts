import { Component,OnInit  } from '@angular/core';
import { DataService } from '../data.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {

  public item :any;
  searchKey:string="";
  public searchTerm : string = '';

  constructor(private dataService: DataService) { }

  

  ngOnInit() {

    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.item= data;
    })  
  this.dataService.search.subscribe((val: any)=>{
    this.searchKey = val;
  })
}
search(event:any){
  this.searchTerm = (event.target as HTMLInputElement).value;
  console.log(this.searchTerm);
  this.dataService.search.next(this.searchTerm);
}
}
