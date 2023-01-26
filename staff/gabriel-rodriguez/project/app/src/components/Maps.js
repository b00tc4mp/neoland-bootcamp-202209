import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useState,
  useMapEvents,
  render,
} from "react-leaflet";

export default function Maps() {
  return (
    <div className="maps">
      {/* <MapContainer center={[51.505, -0.09]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
}
