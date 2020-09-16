import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import MomentComponent from './moment';

class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weather: {
        name: '',
        country: '',
        description: '',
        iconSrc: '',
        main: '',
        feelsLike: '',
        humidity: '',
        pressure: '',
        temp: '',
        windSpeed: '',
        windDeg: '',
        sunrise: '',
        sunset: '',
        lat: '',
        lng: '',
      },
    };
    /*



     */

  }

  componentDidMount() {
    axios.get(
        'http://api.openweathermap.org/data/2.5/weather?q=helsinki&appid=114332134ea7ed53cb7a0e88a863eb5d&units=metric')
        .then(res => {
          console.log(res.data);
          const data = res.data;
          console.log('DATA', data);
          this.setState({
            weather: {
              name: data.name,
              country: data.sys.country,
              description: data.weather[0].description,
              iconSrc: 'http://openweathermap.org/img/w/' +
                  data.weather[0].icon + '.png',
              main: data.weather[0].main,
              feelsLike: data.main.feels_like,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              temp: data.main.temp,
              windSpeed: data.wind.speed,
              windDeg: data.wind.deg,
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
              lat: data.coord.lat,
              lng: data.coord.lon,

            },

          });
          console.log('Weather', this.state.weather);
        })
        .catch(error => console.log(error));

  }

  render() {
    const {weather} = this.state;
    return (

        <div>

          <Card style={{width: '24rem'}}>
            <Card.Body>
              <Card.Title>Weather
                in {weather.name}, {weather.country}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"><img
                  src={weather.iconSrc} alt="icon"/>{weather.temp} &#8451;,
                feels like {weather.feelsLike} &#8451;</Card.Subtitle>
              <p>{weather.description}</p>
              <p><MomentComponent/>
              </p>

              <table>
                <tbody>
                <tr>
                  <td>Wind</td>
                  <td>Speed: {weather.windSpeed}, Deg: {weather.windDeg}</td>
                </tr>
                <tr>
                  <td>Pressure</td>
                  <td>{weather.pressure}</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{weather.humidity}</td>
                </tr>
                <tr>
                  <td>Sunrise</td>
                  <td>{weather.sunrise}</td>
                </tr>
                <tr>
                  <td>Sunset</td>
                  <td>{weather.sunset}</td>
                </tr>
                <tr>
                  <td>Geo coords</td>
                  <td>[{weather.lat}, {weather.lng}]</td>
                </tr>
                </tbody>
              </table>


            </Card.Body>
          </Card>

        </div>

    );
  }

}

export default Weather;