// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-view-cart',
// //   templateUrl: './view-cart.component.html',
// //   styleUrls: ['./view-cart.component.css']
// // })
// // export class ViewCartComponent {

// // }

// import { Component, OnInit } from '@angular/core';
// import { PostService } from '../post.service';
// import { Post } from '../post';
// import{User} from '../user';
// import { UserService } from '../user.service';
// import { DataService } from '../data.service';
// import { Data } from '../data';

// @Component({
//   selector: 'app-view-cart',
//   templateUrl: './view-cart.component.html',
//   styleUrls: ['./view-cart.component.css']
// })
// export class ViewCartComponent implements OnInit {
//   post: Post[] = [];
//   userid!: number;
//   currentDate: Date = new Date();
//   sortPosts(event: Event): void {
//     const target = event.target as HTMLSelectElement;
//     const selectedValue = target.value;

//     if (selectedValue === 'cIdLowToHigh') {
//         this.post.sort((a, b) => a.cId - b.cId);
//     } else if (selectedValue === 'cIdHighToLow') {
//         this.post.sort((a, b) => b.cId - a.cId);
//     }
// }
//   constructor(public postService: PostService,
//   public userService:UserService,
//   public dataService:DataService) { }

//   ngOnInit(): void {
//     this.postService.getAll().subscribe((data: Post[]) => {
//       this.post = data;
//             console.log(this.post);
//       this.post.forEach((post: Post) => {
//         this.userService.getUserById(post.userId).subscribe((user: User) => {
//           post.user = user;
//           console.log(user);
//         });
//       });
      
//     });
//   }

//   deletePost(id: number) {
//     this.postService.delete(id).subscribe(res => {
//       this.post = this.post.filter(post => post.cId !== id);
//       console.log('Booking deleted successfully!');
//     });
//   }

//   // Add a method to retrieve a post by cId
//   getPostByCId(cId: number) {
//     this.postService.getPostByCId(cId).subscribe((data: Post) => {
//       if (data) {
//         console.log('Post with cId', cId, ':', data);
//       } else {
//         console.log('Post not found for cId:', cId);
//       }
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  posts: Post[] = [];
  currentDate: Date = new Date();
  orderDate?: Date;

  constructor(public postService: PostService, public userService: UserService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      this.generateRandomDates();
      this.loadUsers(); // Load users after getting posts
    });
  }

  generateRandomDates(): void {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // One week ago
  
    // Generate random dates for all orders within the last week
    this.posts.forEach((post: any) => { // Use 'any' temporarily for flexibility
      const randomDate = new Date(oneWeekAgo.getTime() + Math.random() * (currentDate.getTime() - oneWeekAgo.getTime()));
      post.orderDate = randomDate;
    });
  
    // Sort posts by orderDate in ascending order
    this.posts.sort((a: any, b: any) => { // Use 'any' temporarily for flexibility
      return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
    });
  }
  

  loadUsers(): void {
    this.posts.forEach((post: Post) => {
      this.userService.getUserById(post.userId).subscribe((user: User) => {
        post.user = user;
      });
    });
  }

  deletePost(id: number): void {
    this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.cId !== id);
      console.log('Booking deleted successfully!');
    });
  }

  sortPosts(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    if (selectedValue === 'cIdLowToHigh') {
      this.posts.sort((a, b) => a.cId - b.cId);
    } else if (selectedValue === 'cIdHighToLow') {
      this.posts.sort((a, b) => b.cId - a.cId);
    }
  }
}
