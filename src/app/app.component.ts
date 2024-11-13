import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  template: `<h1>Location Emitter</h1>`,
})
export class AppComponent implements OnInit, OnDestroy {
  private intervalId: any;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    if (navigator.geolocation) {
      this.intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.locationService.sendLocation(latitude, longitude);
          },
          (error) => console.error('Error getting location:', error),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }, 5000); // Sends every 5 seconds
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
