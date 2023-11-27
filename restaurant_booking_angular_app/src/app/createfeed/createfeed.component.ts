// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-createfeed',
//   templateUrl: './createfeed.component.html',
//   styleUrls: ['./createfeed.component.css']
// })
// export class CreatefeedComponent {

// }
import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createfeed',
  templateUrl: './createfeed.component.html',
  styleUrls: ['./createfeed.component.css']
})
export class CreatefeedComponent implements OnInit {
  form!: FormGroup;
  itemNames:string[]=[];
  constructor(
    public postService: FeedService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      itemName:new FormControl('',Validators.required),
      Text: new FormControl('', Validators.required),
      Rating: new FormControl(0, Validators.required) // Initialize rating to 0
    });
    this.fetchitemNames();
  }

  get f() {
    return this.form.controls;
  }

  // submit() {
  //   console.log(this.form.value);
  //   this.postService.create(this.form.value).subscribe((res: any) => {
  //     console.log('User created successfully!');
  //     this.router.navigateByUrl('/customerdashboard');
  //     this.form.reset();
     
  //   });
  // }

  fetchitemNames() {
    this.http.get<any[]>('http://localhost:58271/api/items').subscribe(
      data => {
        this.itemNames = data.map(item => item.itemName);
      },
      error => {
        console.error('Error fetching item names:', error);
      }
    );
  }
  submit() {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res: any) => {
      console.log('User created successfully!');
      this.form.reset();
      this.router.navigate(['/customerDashboard']); // Use router.navigate to navigate to the desired route
    });
  }
  
}
