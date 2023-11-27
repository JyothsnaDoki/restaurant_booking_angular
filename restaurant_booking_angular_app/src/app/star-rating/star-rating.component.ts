// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-star-rating',
//   templateUrl: './star-rating.component.html',
//   styleUrls: ['./star-rating.component.css']
// })
// export class StarRatingComponent {

// }


import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input()
  rating!: number;
  @Output() ratingChange = new EventEmitter<number>();

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }
}