

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { Data } from '../data';
import { PostService } from '../post.service';
import { Post } from '../post';
@Component({
  selector: 'app-bookuser',
  templateUrl: './bookuser.component.html',
  styleUrls: ['./bookuser.component.css']
})
export class BookuserComponent  implements OnInit {
  userId!: number;
  user!: User;
  id!:number;
  
  post: Post[] = [];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public postService:PostService
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
        console.log(this.userId);
    this.postService.getBookingsByUserId(this.userId).subscribe((data: Post[])=>{
      console.log(data);
      this.post = data;
    });
  }
}



    
  

