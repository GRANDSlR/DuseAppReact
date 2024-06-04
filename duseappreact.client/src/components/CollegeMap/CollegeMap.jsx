
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';


const CollegeMap = ({lat, long}) => {
    return (
        <MapContainer center={[lat, long]} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="Map data &copy; OpenStreetMap contributors"
            />
            <Marker position={[lat, long]} />
        </MapContainer>
    )
}


export default CollegeMap;