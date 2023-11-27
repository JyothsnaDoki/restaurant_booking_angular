// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../user.service';
// import { Router } from '@angular/router';
// import { FormGroup, FormControl, Validators} from '@angular/forms';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent implements OnInit {
//   form!: FormGroup;
    
//   /*------------------------------------------
//   --------------------------------------------
//   Created constructor
//   --------------------------------------------
//   --------------------------------------------*/
//   constructor(
//     public userService: UserService,
//     private router: Router
//   ) { }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   ngOnInit(): void {
//     this.form = new FormGroup({
//       userName: new FormControl('', [Validators.required]),
//       email: new FormControl('', Validators.required),
//       password: new FormControl('', Validators.required),
//       confirmPassword: new FormControl('', Validators.required),
//       contact: new FormControl('', Validators.required),
//       userType: new FormControl('', Validators.required)
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
//     if(this.form.value.password != this.form.value.confirmPassword){
//       alert("Password and Confirm Password must be same!");
//     }
//     this.userService.create(this.form.value).subscribe((res:any) => {
//          console.log('Account signed successfully!');
//          this.router.navigateByUrl('login');
        
//     })
//   }
// }

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
//import { FormGroup, FormControl, Validators} from '@angular/forms';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  duplicateUserError = false;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public userService: UserService,
    private router: Router
  ) { }
  
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, this.emailValidator]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required)
      
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
    if(this.form.value.password != this.form.value.confirmPassword){
      alert("Password and Confirm Password must be same!");
    }
    else {
      this.userService.checkDuplicateUser(this.form.value.email).subscribe(
        (duplicateResponse: any) => {
          if (duplicateResponse.isDuplicate) {
            // Set a flag to indicate a duplicate user
            this.duplicateUserError = true;
            // Display the error message to the user
            // You can also reset other error flags if needed
          } else {
            // No duplicate found, proceed with registration
            this.userService.create(this.form.value).subscribe(
              (res) => {
                alert("Registered successfully!!");
                console.log("Account Signed successfully!");
                this.form.reset();
                this.router.navigate(['/login']);
                console.log(res);
            
          }
            )};
        },
        (error) => {
          console.log("Error checking for duplicate user:", error);
        }
      );
    }
    this.userService.create(this.form.value).subscribe((res:any) => {
         console.log('Account signed successfully!');
         this.router.navigateByUrl('login');
        
    })
    
  }
  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9]+@(gmail\.com|gmail\.in)$/;

    if (emailPattern.test(control.value)) {
      return null; // Valid email format
    } else {
      return { invalidEmail: true }; // Invalid email format
    }
  }
}
