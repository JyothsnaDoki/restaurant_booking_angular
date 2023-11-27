import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Data} from '../data';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-createitem',
  templateUrl: './createitem.component.html',
  styleUrls: ['./createitem.component.css']
})
export class CreateitemComponent implements OnInit {
  form!: FormGroup;
  data!:Data;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public dataService: DataService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({

      itemName: new FormControl('', Validators.required),
      description: new FormControl('',Validators.required),
      price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      itemAvailability : new FormControl('', Validators.required)
      
      
    });
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.dataService.create(this.form.value).subscribe((res:any) => {
         alert("Item has been successfully created");
         console.log('Item added successfully!');
         this.form.reset();
    })
  }
  
}



/*(import { Component } from '@angular/core';

@Component({
  selector: 'app-createitem',
  templateUrl: './createitem.component.html',
  styleUrls: ['./createitem.component.css']
})
export class CreateitemComponent {

}
*/