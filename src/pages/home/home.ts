import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  // MyLocation,
  BaseArrayClass
} from '@ionic-native/google-maps';

// import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  mapReady: boolean = false;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(): void {
    this.loadMap();
  }

  loadMap(): void {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 38.3431352,
          lng: -0.4849664
        },
        zoom: 16,
        tilt: 45
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      const data = [
        {
          position: {lng: -0.489579, lat: 38.360945},
          title: "Taberna la Vendimia"
        },
        {
          position: {lng: -0.5083549, lat: 38.3377359},
          title: "La Bodeguita de Juan"
        },
        {
          position: {lng: -0.503783, lat: 38.3491619},
          title: "Cervecería Tapería Nueva Villateresa"
        },
        {
          position: {lng: -0.5061937, lat: 38.3453283},
          title: "Cervecería Chacolí"
        },
        {
          position: {lng: -0.4907852, lat: 38.3478094},
          title: "Hotel Leuka"
        },
        {
          position: {lng: -0.4838606, lat: 38.351894},
          title: "El Bigotes"
        },
        {
          position: {lng: -0.489376, lat: 38.346735},
          title: "El Merengue"
        },
        {
          position: {lng: -0.49062, lat: 38.346551},
          title: "Mercado Provenzal"
        },
        {
          position: {lng: -0.489241, lat: 38.3436435},
          title: "Barra degustación (Gourmet Experience)"
        },
        {
          position: {lng: -0.4920331, lat: 38.3442609},
          title: "Cervecería Portabella Restaurante"
        },
        {
          position: {lng: -0.4913491, lat: 38.3411614},
          title: "Mio GastroBar"
        },
        {
          position: {lng: -0.4929773, lat: 38.3449794},
          title: "Delta Gourmet"
        },
        {
          position: {lng: -0.4916922, lat: 38.3418956},
          title: "Delta 3"
        },
        {
          position: {lng: -0.4889145, lat: 38.3421897},
          title: "Restaurante Dhammas"
        },
        {
          position: {lng: -0.491496, lat: 38.3448946},
          title: "Taberna Chapeau"
        },
        {
          position: {lng: -0.4850473, lat: 38.3463385},
          title: "Brunch"
        },
        {
          position: {lng: -0.4909713, lat: 38.3447294},
          title: "I Ruta de Tapas MadeInCV"
        }
      ];

      // Add markers
      let baseArray: BaseArrayClass<any> = new BaseArrayClass<any>(data);

      baseArray.mapAsync((options: any, next: (marker: Marker) => void) => {
        this.map.addMarker(options).then(next);
      }).then((markers: Marker[]) => {
          // Set a camera position that includes all markers.
          let bounds: any[] = [];
          data.forEach((POI) => {
            bounds.push(POI.position);
          });

          this.map.moveCamera({target: bounds, tilt: 45}).then(() => {
              markers[markers.length - 1].setAnimation(GoogleMapsAnimation.BOUNCE);
              // After camera moves open the last marker.
              markers[markers.length - 1].showInfoWindow();
          });
      });
    });
  }
}