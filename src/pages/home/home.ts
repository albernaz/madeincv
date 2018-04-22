import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  BaseArrayClass
} from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  mapReady: boolean = false;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      const data = [
        {
          position: {lng: -122.1180187, lat: 37.3960513},
          title: "Ardis G Egan Intermediate School"
        },
        {
          position: {lng: -122.1102408, lat: 37.3943847},
          title: "Portola School"
        },
        {
          position: {lng: -122.0848257, lat: 37.3818032},
          title: "Isaac Newton Graham Middle School"
        },
        {
          position: {lng: -122.1082962, lat: 37.3863294},
          title: "Los Altos High School"
        },
        {
          position: {lng: -122.013571, lat: 37.3874409},
          title: "The Kings Academy"
        },
        {
          position: {lng: -122.082462, lat: 37.3627189},
          title: "Georgina P Blach Intermediate School"
        },
        {
          position: {lng: -122.0421832, lat: 37.3766077},
          title: "Benner Junior High School"
        }
      ];

      // Add markers
      let baseArray: BaseArrayClass<any> = new BaseArrayClass<any>(data);

      baseArray.mapAsync((mOption: any, callback: (marker: Marker) => void) => {
        this.map.addMarker(mOption).then(callback);
      }).then((markers: Marker[]) => {
          // Set a camera position that includes all markers.
          let bounds = [];
          data.forEach((POI) => {
            bounds.push(POI.position);
          });

          this.map.moveCamera({target: bounds}).then(() => {
              // After camera moves open the last marker.
              markers[markers.length - 1].showInfoWindow();
          });
      });
    });
  }
}