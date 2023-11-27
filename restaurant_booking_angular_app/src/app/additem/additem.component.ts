// import { Component, OnInit } from '@angular/core';
// import { DataService } from '../data.service';
// import { Data} from '../data';
// import { Router } from '@angular/router';
// import { FormGroup, FormControl, Validators} from '@angular/forms';

// @Component({
//   selector: 'app-additem',
//   templateUrl: './additem.component.html',
//   styleUrls: ['./additem.component.css']
// })
// export class AdditemComponent implements OnInit {
//   form!: FormGroup;
//   data!:Data;
    
//   /*------------------------------------------
//   --------------------------------------------
//   Created constructor
//   --------------------------------------------
//   --------------------------------------------*/
//   constructor(
//     public dataService: DataService,
//     private router: Router
//   ) { }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   ngOnInit(): void {
//     this.form = new FormGroup({

//       itemName: new FormControl('', Validators.required),
//       description: new FormControl('',Validators.required),
//       price: new FormControl('', Validators.required),
//       image: new FormControl('', Validators.required),
//       itemAvailability : new FormControl('', Validators.required)
      
      
//     });
//   }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   get f(){
//     return this.form.controls;
//   }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   submit(){
//     console.log(this.form.value);
//     this.dataService.create(this.form.value).subscribe((res:any) => {
//          alert("Item has been successfully created");
//          console.log('Item added successfully!');
//          this.form.reset();
//     })
//   }
  
// }



import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from '../data';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
  form!: FormGroup;
  data!: Data;

  constructor(
    public dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      itemName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, this.priceGreaterThanZero]),
      image: new FormControl('', Validators.required),
      itemAvailability: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.dataService.create(this.form.value).subscribe((res: any) => {
      alert("Item has been successfully created");
      console.log('Item added successfully!');
      this.form.reset();
    })
  }

  // Custom Validator Function
  priceGreaterThanZero(control: FormControl) {
    const price = control.value;
    if (price <= 0 || isNaN(price)) {
      return { priceInvalid: true };
    }
    return null;
  }
}
