// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated(): boolean {
    // Implement your authentication logic here
    // For example, check if the user is logged in
    // Return true if authenticated, false otherwise
    return !!localStorage.getItem('token'); // Example: check if a token exists in localStorage
  }
}
