import React from 'react';

import './App.css';

class App extends React.Component {
 state = {
      stations: [],
      isLoading: true,
      error: null
    };

  componentDidMount() {
    // {stations: data.network.stations, isLoading:false}
    fetch('http://api.citybik.es/v2/networks/citybikes-helsinki')
        .then(res => res.json())
        .then(data => this.setState({stations: data.network.stations, isLoading:false}))
            .catch(error => this.setState({ error, isLoading: false }));


  }

  render() {

    const { isLoading, stations, error } = this.state;
    console.log(this.state.stations);
    return(
    <div className="App">
      <h1>City Bikes in Helsinki</h1>
      <table>
            <thead>
              <tr >
                <th>Station</th>
                <th>Free Bikes</th>
                <th>Empty Slots</th>
              </tr>
            </thead>
            <tbody>



      {error ? <p>{error.message}</p> : null}

      {!isLoading ? (
          stations.map(station => {
            const{id, name, free_bikes, empty_slots} = station;
            return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{free_bikes}</td>
                  <td>{empty_slots}</td>
                </tr>
            );
          })

      ) : (
          <h3>Loading...</h3>
      )}
            </tbody>

      </table>



    </div>
    );
  }

}

export default App;
