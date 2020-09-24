

import React, { useEffect, useRef, useState } from "react";
import {GoogleApiWrapper} from 'google-maps-react';
import * as des from './destination';




const PlaceAutoComplete = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);

  useEffect(() => {
     initPlaceAPI();
  }, []);


  /*
  const isMountedComponent = useRef(true);
  useEffect(() => {     if (isMountedComponent.current) {
    initPlaceAPI();    }     return () => { isMountedComponent.current = false; };   }, []);
  */


  // initialize the google place autocomplete
  const initPlaceAPI = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let placeResult = autocomplete.getPlace();
      console.log("placeResult: ", placeResult);
      des.setDesPlaceId(placeResult.place_id);
      if(placeResult) {
        des.setDesLat(placeResult.geometry.location.lat());
        des.setDesLng( placeResult.geometry.location.lng());
        console.log("lat: ", des.getDesLat());
        console.log("lng: ", des.getDesLng());
      }
      setPlace({
        address: placeResult.formatted_address,
        lat: placeResult.geometry.location.lat(),
        lng: placeResult.geometry.location.lng()
      });

  });
  };

  return (
      <>
        <input style={{width: '440px',  lineHeight: '30px'}} type="text" ref={placeInputRef}/>
        {place && <div style={{ marginTop: 20, marginBottom: -10}}>
          <div id="destinationInfo">
            {<p><b>Destination Address:</b> {place.address}</p>}
            <p><b>Location: </b>
              <span><b>Lat:</b>{place.lat}</span>, <span><b>Lng:</b>{place.lng} </span>
            </p>
          </div>
        </div>}

      </>
  );
};




export default  GoogleApiWrapper ({
  apiKey: 'Put Your Api key here &libraries=places'
})(PlaceAutoComplete);





