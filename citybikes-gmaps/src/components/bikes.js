import React from 'react';
import Select from 'react-select';
import Map from './map';
import Weather from './weather';
import axios from 'axios';
import { withScriptjs } from "react-google-maps";
import PlacesAutocomplete  from './placesAutoComplete';
import * as des from './destination';








class Bikes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apiKey: 'Put Your API Key Here',
      stations: [],
      options: [],
      selected: false,
      divInfo: false,
      selectedStation: {
        id: '',
        name: '',
        freeBikes: '',
        emptySlots: '',
        lat: '',
        lng: '',
      },
      weather: {
        description: '',
        icon: '',
        main: '',
        feelsLike: '',
        humidity: '',
        pressure: '',
        temp: '',
        windSpeed: '',

      },
      buttonClicked:false,
      buttonResults:{},
      desLat: '',
      desLng: '',
      distance: '',
      duration: '',
      endAddress: '',
      startAddress:'',
      directionsDiv: false,
      directions:null

    };

  }
  handleButtonClick(){
    // Get directions between the bike station and the destination
    const directionsService = new window.google.maps.DirectionsService();
    const selectedOrigin = {lat: this.state.selectedStation.lat, lng: this.state.selectedStation.lng};
    let selectedDestination = {lat: des.getDesLat(), lng: des.getDesLng()};
    console.log("Destination.lat", selectedDestination.lat);
    console.log("Destination.lng", selectedDestination.lng);
    directionsService.route(
        {
          origin: selectedOrigin,
          destination: selectedDestination,
          travelMode: window.google.maps.TravelMode.BICYCLING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
    );

    this.setState({buttonClicked: true,
      selected: false
    });



    // Proxy url for cors
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";


     let originLat = this.state.selectedStation.lat;
     let originLng = this.state.selectedStation.lng;

     let destinationLat = selectedDestination.lat;
     let destinationLng = selectedDestination.lng;

     const APIKEY = this.state.apiKey;


       // const api2 = `https://www.google.com/maps/embed/v1/directions?key=${this.state.apiKey}&origin=${origin}&destination=${destination}&mode=${mode}&units=metric`;
        const api3 = "https://maps.googleapis.com/maps/api/directions/json?origin=" +
            originLat + "," + originLng + "&destination=" + destinationLat +
            "," + destinationLng + "&mode=bicycling&key=" + APIKEY;
        axios.get(proxyUrl + api3, function(req, response) {
          response.setHeader("Access-Control-Allow-Headers", "x-requested-with",
              "x-requested-by");
        }).then(res => {
          console.log(" RESPONSE FOR Directions between two locations", res);
          console.log("Directions between two locations", res.data);
          this.setState({
            distance: res.data.routes[0].legs[0].distance.text,
            duration: res.data.routes[0].legs[0].duration.text,
            endAddress: res.data.routes[0].legs[0].end_address,
            startAddress: res.data.routes[0].legs[0].start_address,
            directionsDiv: true

          });
          console.log("distance", this.state.distance);
          console.log("duration", this.state.duration);
        })
            .catch(error => console.log(error));

  }

  showStationInfo(event) {
    this.state.stations.forEach(station => {
      const {id, name, free_bikes, empty_slots, latitude, longitude} = station;
      if (station.name === event.value) {
        this.setState({
          selected: true,
          divInfo: true,
          selectedStation: {
            id: id,
            name: name,
            freeBikes: free_bikes,
            emptySlots: empty_slots,
            lat: latitude,
            lng: longitude,

          },
        });
      }
    });

  }

  componentDidMount() {
    this.showStationInfo = this.showStationInfo.bind(this);
    fetch('http://api.citybik.es/v2/networks/citybikes-helsinki')
        .then(res => res.json())
        .then(data => {
          this.setState({stations: data.network.stations, isLoading: false});
          console.log('STATIONS', this.state.stations);
          this.state.stations.map(station => this.state.options.push(
              {value: station.name, label: station.name}));
          console.log('#############', this.state.options);
        })
        .catch(error => console.log(error));

    axios.get(
        'http://api.openweathermap.org/data/2.5/weather?q=helsinki&appid=114332134ea7ed53cb7a0e88a863eb5d')
        .then(res => {
          console.log(res.data);
          // this.setState({events: res.data});
          // console.log("Events",this.state.events);
        })
        .catch(error => console.log(error));

    this.setState({
      desLat: des.getDesLat(),
      desLng: des.getDesLng()
    });

  }



  render() {
    const {options, stations, selected, selectedStation, buttonClicked, buttonResults, desLat, desLng, startAddress, endAddress, distance, duration, directions} = this.state;
    const MapLoader = withScriptjs(Map);
    console.log(this.state.stations);

    return (
        <div className="container">
          <h1>City Bikes</h1>

          <div className="row m-3">

            <div className="col" id="leftCol">
              <h3>Select bike station</h3>
              <Select className="select" options={options}
                      onChange={this.showStationInfo}
                      placeholder="Select a station"/>
              <br/>
              {this.state.divInfo &&
              <div id="stationInfo">
                <p><b>Station:</b> {selectedStation.name}</p>
                <p><b>Location:</b>
                  <span><b> lat:</b> {selectedStation.lat} </span>,<span><b>lng:</b> {selectedStation.lng} </span>
                </p>
                <p><b>Free bikes:</b> {selectedStation.freeBikes}</p>
                <p><b>Empty Slots:</b> {selectedStation.emptySlots}</p>
              </div>}
              <div>
                <h3>Enter your destination</h3>
                <PlacesAutocomplete>
                  {/* custom render function */}
                </PlacesAutocomplete>
                <br/>
                <button id="getDesBtn" onClick={() => this.handleButtonClick()}>Get Directions</button>
              </div>
              {this.state.directionsDiv &&
              <div id="stationInfo">
                <h3>Directions info</h3>
                <p><b>Start Address:</b> {startAddress}</p>
                <p><b>End Address:</b> {endAddress}</p>
                <p><b>Distance:</b> {distance}</p>
                <p><b>Duration:</b> {duration}</p>
              </div>}

            </div>

            <div className="col-5 mapDiv">
              {/*<Map
                  id={selectedStation.id}
                  name={selectedStation.name}
                  freeBikes={selectedStation.freeBikes}
                  emptySlots={selectedStation.emptySlots}
                  lat={selectedStation.lat}
                  lng={selectedStation.lng}
                  stations={stations}
                  selected={selected}
                  aaa={aaa}
                  buttonResults={buttonResults}
              />*/}
              <MapLoader
                  googleMapURL='https://maps.googleapis.com/maps/api/js?key=Your API KEY'
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  id={selectedStation.id}
                  name={selectedStation.name}
                  freeBikes={selectedStation.freeBikes}
                  emptySlots={selectedStation.emptySlots}
                  lat={selectedStation.lat}
                  lng={selectedStation.lng}
                  stations={stations}
                  selected={selected}
                  buttonClicked={buttonClicked}
                  buttonResults={buttonResults}
                  desLat={desLat}
                  desLng={desLng}
                  directions={directions}
              />
            </div>

            <div className="col ml-4 weather">
              <Weather/>
            </div>

          </div>


        </div>

    );
  }

}

export default Bikes;