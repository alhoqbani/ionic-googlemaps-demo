import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  TileOverlay
} from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-tile-set-opacity',
  templateUrl: 'tile-set-opacity.html',
})
export class TileSetOpacityPage {

  map: GoogleMap;
  opacity: number = 100;

  constructor() {}

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.map = GoogleMaps.create('map_canvas', {
      'preferences': {
        'zoom': {
          'minZoom': 0,
          'maxZoom': /Android/i.test(window.navigator.userAgent) ? 4 : 3
        }
      }
    });

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

      return this.map.addTileOverlay({
        debug: true,  // draw debug infomation on tiles

        opacity: 0.75,  // from 0.0 to 1.0

        // Load image files from the local file path
        getTile: (x: number, y: number, zoom: number) => {
          //return "http://tile.openstreetmap.org/" + zoom + "/" + x + "/" + y + ".png";
          return "../assets/map-for-free/" + zoom + "_" + x + "-" + y + ".gif"
        }
      });
    }).then((tileOverlay: TileOverlay) => {

      // Change the property
      this.map.on("opacityChange").subscribe(() => {
        tileOverlay.setOpacity(this.opacity / 100);
      });

    });
  }

  onOpacityChange() {
    if (this.map) {
      this.map.trigger("opacityChange");
    }
  }
}
