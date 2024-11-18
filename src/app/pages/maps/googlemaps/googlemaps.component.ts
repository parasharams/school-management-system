import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { DARKSTYLES, LIGHTSTYLES } from './data';
import { MapConfig } from './google-map.model';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  gmapConfig1!: MapConfig;
  gmapConfig2!: MapConfig;
  gmapConfig3!: MapConfig;
  gmapConfig4!: MapConfig;
  gmapConfig5!: MapConfig;
  gmapConfig6!: MapConfig;



  ngOnInit(): void {
    this.pageTitle = [{ label: 'Maps', path: '/' }, { label: 'Google Maps', path: '/', active: true }];

    this.initMapConfig();
  }

  /**
   * initialize map configuration
   */
  initMapConfig(): void {
    this.gmapConfig1 = {
      lat: 51.678418,
      lng: 7.809007
    }

    this.gmapConfig2 = {
      lat: 51.678418,
      lng: 7.809007,
      markers: [
        {
          lat: 51.668418,
          lng: 7.809007,
          title: 'Lima'
        },
        {
          lat: 51.568418,
          lng: 7.829007,
          title: 'Marker with InfoWindow'
        }
      ]
    }

    this.gmapConfig3 = {
      lat: 51.678418,
      lng: 7.809007,
      styles: LIGHTSTYLES
    }

    this.gmapConfig4 = {
      lat: 51.678418,
      lng: 7.809007,
      styles: DARKSTYLES
    }

    this.gmapConfig5 = {
      // initial center position for the map
      lat: -12.043333,
      lng: -77.028333,
      zoom: 14,
      paths: [[
        { lat: -12.040397656836609, lng: -77.03373871559225 },
        { lat: -12.040248585302038, lng: -77.03993927003302 },
        { lat: -12.050047116528843, lng: -77.02448169303511 },
        { lat: -12.044804866577001, lng: -77.02154422636042 }
      ]]
    }

    this.gmapConfig6 = {
      // initial center position for the map
      lat: -12.043333,
      lng: -77.028333,
      zoom: 14,
      ponits: [
        { lat: -12.040397656836609, lng: -77.03373871559225 },
        { lat: -12.040248585302038, lng: -77.03993927003302 },
        { lat: -12.050047116528843, lng: -77.02448169303511 },
        { lat: -12.044804866577001, lng: -77.02154422636042 }
      ]
    }

  }

  /**
   * executes after map is loaded
   * @param map Gmap
   */
  mapReady(map: any): void {
    map.setOptions({
      zoomControl: "true",
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
      }
    });
  }



}
