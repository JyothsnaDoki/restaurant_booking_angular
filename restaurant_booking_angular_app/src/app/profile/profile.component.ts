import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  user!: User;
  id!:number;
  
    // ... existing code

    passwordVisible: boolean = false;

    togglePasswordVisibility(): void {
        this.passwordVisible = !this.passwordVisible;
    }
    
    // ... existing code


  
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
        console.log(this.userId);
    this.userService.find(this.userId).subscribe((data: User)=>{
      console.log(data);
      this.user = data;
    });
  }
}



    
  

