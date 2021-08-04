import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const [state, setState] = useState({lat: 0, lng: 0, places: {} });

  useEffect(() => {
      const userLocation = navigator.geolocation.getCurrentPosition(
          (position) => {
              const { latitude, longitude } = position.coords;

              fetch(`/api/places/?lat=${latitude}&lng=${longitude}`)
              .then(response => response.json())
              .then(data => setState({ lat: latitude, lng: longitude, places: data }))
              .catch((err) => {
                console.error('error:', err);
              })
          })
  }, []);


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
        center={{ lat: state.lat, lng: state.lng }}
        zoom={14.5}
      >
        <AnyReactComponent lat={123456} lng={123456} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
