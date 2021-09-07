import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { GoLocation } from "react-icons/fa";
import { ReactComponent as PoliceStation } from "../public/maps/police.svg";

const UserLocationComponent = ({ text }) => <div>{text}</div>;
// const UserLocationComponent = () => <div><GoLocation/></div>;

export default function SimpleMap() {
  const [state, setState] = useState({ lat: 0, lng: 0, places: [] });

  useEffect(() => {
    const userLocation = navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetch(`/api/places/?lat=${latitude}&lng=${longitude}`)
          .then((response) => response.json())
          .then((data) =>
            setState({ lat: latitude, lng: longitude, places: data.content })
          )
          .catch((err) => {
            console.error("error:", err);
          });
      }
    );
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.MAPS_JAVASCRIPT_API_KEY }}
        center={{ lat: state.lat, lng: state.lng }}
        zoom={14.5}
      >
        {state.places.length > 0 &&
          state.places.map((x) => {
            const { lat, lng } = x.geometry.location;
            return (
              <UserLocationComponent
                key={lat + lng}
                lat={lat}
                lng={lng}
                text={"mock"}
              ></UserLocationComponent>
            );
          })}

        <UserLocationComponent
          lat={state.lat}
          lng={state.lng}
          text="Você está aqui"
        ></UserLocationComponent>
      </GoogleMapReact>
    </div>
  );
}
