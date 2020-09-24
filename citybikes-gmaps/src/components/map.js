import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
    Marker,
  InfoWindow
} from "react-google-maps";


class Map extends Component {
    constructor(props){
      super(props);
      this.state = {
        directions: this.props.directions,
        isOpen: false,
        delayFactor: 2

      };
      this.onToggleOpen = this.onToggleOpen.bind(this);
    }
    onToggleOpen(){
    this.setState({isOpen: !this.state.isOpen});

  }



  componentDidMount() {

  }

  render() {

    let selected = this.props.selected;

    let locations = [];
    for (let i = 0; i < this.props.stations.length; i++) {
      let id = this.props.stations[i].id;
      let lat = this.props.stations[i].latitude;
      let lng = this.props.stations[i].longitude;

      locations.push({id: id, lat: lat, lng: lng});
    }
    console.log('LOCATIONS', locations);
    console.log('buttonClicked', this.props.buttonClicked);

    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={{ lat:60.16952, lng: 24.93545 }}
            defaultZoom={10}
            onZoomChanged={props.onZoomChanged}
            locations={locations}
        >
          {/*Show markers for all bike stations */}
          {!selected && !this.props.buttonClicked && locations.map(marker => (
              <Marker
                  name={this.props.name}
                  position={{lat: marker.lat, lng: marker.lng}}
                  key={marker.id}
                  onClick={this.onToggleOpen}
              />
          ))}

          {/*Show marker for selected bike station */}
          {selected && (
              <Marker
                  name={this.props.name}
                  position={{lat: this.props.lat, lng: this.props.lng}}
                  key={this.props.id}
                  onClick={this.onToggleOpen}

              >
                {this.state.isOpen &&
                  (<InfoWindow
                    onCloseClick={this.onToggleOpen}
                    position={{lat: this.props.lat, lng: this.props.lng}}
                  >
                    <div>
                      <p><b>Station: {this.props.name}</b></p>
                      <p>Free bikes: {this.props.freeBikes}</p>
                      <p>Empty slots: {this.props.emptySlots}</p>
                    </div>
                  </InfoWindow>)}

              </Marker>
          )}
          {/*Show directions*/}
          {this.props.buttonClicked && (<DirectionsRenderer
              directions={this.state.directions}
          />)}

        </GoogleMap>
    ));

    return (
        <div>
          <GoogleMapExample
              containerElement={<div style={{ height: `600px`, width: "640px" }} />}
              mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
    );
  }
}

export default Map;





/*

import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import MyDirectionsRenderer from './MyDirectionsRenderer';
import {DirectionsRenderer} from "react-google-maps";


//import MyDirectionsRenderer from './MyDirectionsRenderer';


export class MapContainer extends Component {

  state = {
    isOpen: false,
    deactivate: false
  };

  render() {

    if (!this.props.loaded) return <div>Loading...</div>;
    let selected = this.props.selected;
    const places = [
      {lat: this.props.lat, lng: this.props.lng},
      {lat: 60.205491,lng: 24.655900},
    ];

    let locations = [];
    for (let i = 0; i < this.props.stations.length; i++) {
      let id = this.props.stations[i].id;
      let lat = this.props.stations[i].latitude;
      let lng = this.props.stations[i].longitude;

      locations.push({id: id, lat: lat, lng: lng});
    }
    console.log('LOCATIONS', locations);
    console.log('aaa', this.props.aaa);


    return (
        <Map
            google={this.props.google}
            zoom={10}
            initialCenter={{
              lat: 60.16952,
              lng: 24.93545,
            }}
            locations={locations}
        >
          {
          {!selected && locations.map(marker => (
              <Marker
                  name={this.props.name}
                  position={{lat: marker.lat, lng: marker.lng}}
                  key={marker.id}

              />
          ))}

          {selected && (
              <Marker
                  name={this.props.name}
                  position={{lat: this.props.lat, lng: this.props.lng}}
                  key={this.props.id}
                  onClick={() => {
                    this.setState({isOpen: true});
                  }}
              >

                {this.state.isOpen && (
                    <InfoWindow
                        onClose={() => {
                          this.setState({isOpen: false});
                        }}
                        position={{lat: this.props.lat, lng: this.props.lng}}
                    >
                      <div>
                        <h3>Station: {this.props.name}</h3>
                        <p>Free bikes: {this.props.freeBikes}</p>
                        <p>Empty slots: {this.props.emptySlots}</p>
                      </div>
                    </InfoWindow>
                )}

              </Marker>
          )}



          }

{this.props.aaa && places.map(marker => (
    <Marker
        name={this.props.name}
        position={{lat: marker.lat, lng: marker.lng}}
        key={marker.id}

    />
))  && (<DirectionsRenderer map={this} directions={this.props.buttonResults}/>) }




{/*

          this.props.aaa && places.map(marker => (

              <Marker
                  name={this.props.name}
                  position={{lat: marker.lat, lng: marker.lng}}
                  key={marker.id}

              />
          )) && <MyDirectionsRenderer
              origin={{lat: this.props.lat, lng: this.props.lng}}
              destination={{lat: 60.205491,lng: 24.655900}}
              map={this}
          />}





{ <MapDirectionsRenderer places={places} travelMode={window.google.maps.TravelMode.DRIVING} />}
</Map>

);
}

}

*/

/*

export default GoogleApiWrapper({
  apiKey: 'YOUR API KEY',
})(MapContainer);

 */