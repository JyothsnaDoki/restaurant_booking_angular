// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-book',
//   templateUrl: './book.component.html',
//   styleUrls: ['./book.component.css']
// })
// export class BookComponent {

// }


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { Data } from '../data';
import { HttpClient } from '@angular/common/http';
interface BookingResponse {
  cId: number; // Adjust the type if bookingId is of a different type
  userId:number;
  itemId:number;
  itemName:string;
  quantity:number;
  total:number;
 
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  form!: FormGroup;
  data!: Data;
  datas: Data[] = [];
  flag: boolean = false;
  selectedItem: any; // Use @Input to receive data from parent component
  price: number = 0; // Initialize price to 0

  constructor(
    public dataService: DataService,
    public postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http:HttpClient,
   
  ) { }

  ngOnInit(): void {
    this.selectedItem = history.state.selectedItem;
    this.form = this.formBuilder.group({
      userId: [3, Validators.required],
      itemId: [this.selectedItem.itemId, Validators.required],
      itemName: [this.selectedItem.itemName, Validators.required],
      quantity: [this.selectedItem.quantity, [Validators.required, Validators.min(1)]],
      price: [this.selectedItem.price], // Price from the selected item
      total: [0, Validators.required] // Initialize total as 0
    });

    // Fetch the price from the selected item
    this.price = this.selectedItem.price;

    this.selectedItem = history.state.selectedItem;
    this.postService.getAll().subscribe((data: Data[]) => {
      this.datas = data;
      console.log(this.datas);
    });
  }


  

  get f() {
    return this.form.controls;
  }

  // Calculate total price based on quantity and the price retrieved from the data service
  calculateTotalPrice(): number {
    const quantity = this.form.controls['quantity'].value;
    const total = quantity * this.price; // Use the price from the data service
    return total;
  }
  

  submit() {
    console.log(this.form.value);
  
    // Calculate total price before submitting
    const total = this.calculateTotalPrice();
    this.form.patchValue({ total: total }); // Update the form control with the calculated total
  
    // Rest of your submit logic
    console.log(this.form.value);
  
    // Make an HTTP POST request to your server API to save the data
    this.http.post('http://localhost:58271/api/Bookings', this.form.value, { responseType: 'text' }).subscribe(
      () => {
        // Ignore the response, as it's plain text
        alert('Your booking has been successful....proceed to payment!!');
        console.log('Booking added successfully!');
        this.router.navigateByUrl('/bankcheck',{ state: { total: total, data: JSON.stringify(this.selectedItem)} });
      },
      (error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
        // You can display an error message or handle the error as needed
      }
    );
  }
  
  }