import React from 'react';
import Select from 'react-select'
import Map from './map';


class Bikes extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    stations: [],
    options: [],
    selected:false,
    divInfo: false,
    selectedStation: {
      id: '',
      name: '',
      freeBikes: '',
      emptySlots: '',
        lat: '',
        lng: ''
    }

  };

}
  showStationInfo(event) {
    this.state.stations.forEach(station => {
      const{id, name, free_bikes, empty_slots, latitude, longitude} = station;
      if(station.name === event.value){
        this.setState({
          selected: true,
          divInfo: true,
          selectedStation:{
            id: id,
            name: name,
            freeBikes:free_bikes,
            emptySlots:empty_slots ,
              lat: latitude,
              lng:longitude



          }
        })
      }
    });

  }

  componentDidMount() {
    this.showStationInfo = this.showStationInfo.bind(this);
    fetch('http://api.citybik.es/v2/networks/citybikes-helsinki')
        .then(res => res.json())
        .then(data => {
          this.setState({stations: data.network.stations, isLoading:false});
          console.log("STATIONS",this.state.stations);
          this.state.stations.map(station => this.state.options.push({value: station.name, label:station.name}));
          console.log("#############",this.state.options);
        })
        .catch(error => console.log(error));

  }


  render() {
    const {options,stations,selected, selectedStation} = this.state;
    console.log(this.state.stations);
    return(
        <div className="App">
          <h1>City Bikes</h1>
          <div id="selectDiv">
            <Select className="select" options={options} onChange={this.showStationInfo} placeholder="Select a station"/>
            <br/>
            {this.state.divInfo && <div id="stationInfo" >
              <p><b>Station:</b> {selectedStation.name}</p>
              <p><b>Location:</b> <span><b>lat:</b> {selectedStation.lat} </span>,<span><b>lng:</b> {selectedStation.lng} </span></p>
              <p><b>Free bikes:</b> {selectedStation.freeBikes}</p>
              <p><b>Empty Slots:</b> {selectedStation.emptySlots}</p>
            </div>}

          </div>
          <div className="map">
            <Map
                id={selectedStation.id}
                name={selectedStation.name}
                freeBikes={selectedStation.freeBikes}
                emptySlots={selectedStation.emptySlots}
                lat={selectedStation.lat}
                lng={selectedStation.lng}
                stations={stations}
                selected={selected}
            />

          </div>

        </div>

    );
  }

}

export default Bikes;