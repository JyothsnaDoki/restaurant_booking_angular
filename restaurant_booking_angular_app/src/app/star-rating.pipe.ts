// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'starRating'
// })
// export class StarRatingPipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }

// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {

 


  transform(rating: number): string {
    const roundedRating = Math.round(rating);
    return '★'.repeat(roundedRating);
  }
}
