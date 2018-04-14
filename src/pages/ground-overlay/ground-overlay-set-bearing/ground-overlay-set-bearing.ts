import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent,
  ILatLng, GroundOverlay
} from "@ionic-native/google-maps";


@IonicPage()
@Component({
  selector: 'page-ground-overlay-set-bearing',
  templateUrl: 'ground-overlay-set-bearing.html',
})
export class GroundOverlaySetBearingPage {
  map: GoogleMap;
  bearing: number = 0;
  groundOverlay: GroundOverlay = null;

  constructor() {}

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let bounds: ILatLng[] = [
      {"lat": 40.712216, "lng": -74.22655},
      {"lat": 40.773941, "lng": -74.12544}
    ];

    this.map = GoogleMaps.create("map_canvas", {
      camera: {
        target: bounds
      }
    });

    // Add ground overlay
    this.groundOverlay = this.map.addGroundOverlaySync({
      'url': "assets/newark_nj_1922.jpg",
      'bounds': bounds,
      'opacity': 0.5
    });

  }

  onBearingChange() {
    if (this.groundOverlay) {
      this.groundOverlay.setBearing(this.bearing);
    }
  }
}
