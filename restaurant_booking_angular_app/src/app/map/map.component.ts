// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css']
// })
// export class MapComponent {


// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  zoomLevel = 100; // Initial zoom level (percentage)
  maxZoom = 200;   // Maximum allowed zoom level (percentage)

  // Function to handle zoom in
  zoomIn() {
    if (this.zoomLevel < this.maxZoom) {
      this.zoomLevel += 10; // Increase zoom level by 10%
    }
  }

  // Function to handle zoom out
  zoomOut() {
    if (this.zoomLevel > 10) {
      this.zoomLevel -= 10; // Decrease zoom level by 10%
    }
  }
}

