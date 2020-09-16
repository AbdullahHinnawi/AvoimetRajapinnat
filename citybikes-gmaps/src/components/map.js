import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';

export class MapContainer extends Component {

  state = {
    isOpen: false,
  };

  render() {

    if (!this.props.loaded) return <div>Loading...</div>;
    let selected = this.props.selected;

    let locations = [];
    for (let i = 0; i < this.props.stations.length; i++) {
      let id = this.props.stations[i].id;
      let lat = this.props.stations[i].latitude;
      let lng = this.props.stations[i].longitude;
      locations.push({id: id, lat: lat, lng: lng});
    }
    console.log('LOCATIONS', locations);

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

        </Map>

    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'Put here your api key',
})(MapContainer);