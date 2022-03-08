import React, { useState } from "react";
import './App.css';
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import shopIconPath from './shop.png';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

function App() {
  const shopIcon = new L.Icon({
    iconUrl: shopIconPath,
    iconRetinaUrl: shopIconPath,
    iconSize: [25, 25],
  })
  const [polygonLatLngs, setPolygonLatLngs] = useState([]);
  const [activeShop, setActiveShop] = useState(null);

  const onCreated = (event) => {
    if (event.layerType === "polygon") {
      let polygonCreatedMessage = "polygon created with coordinates:"
      event.layer._latlngs[0].forEach((latlng) => {
        polygonCreatedMessage += ` lat ${latlng.lat}`
        polygonCreatedMessage += ` lng ${latlng.lng},`
      })
      polygonLatLngs.push(polygonCreatedMessage)
      setPolygonLatLngs(polygonLatLngs.slice());
    }
  }

  return (
    <div>
      <MapContainer center={[18.520430, 73.856743]} zoom={15}>
        {activeShop && (
          <Popup
            position={[
              "18.472270",
              "73.884640"
            ]}
            onClose={() => {
              setActiveShop(null);
            }}
          >
            <div>
              <h2>DMart</h2>
              <p>Grossary store</p>
            </div>
          </Popup>
        )}

        <Marker
          position={[
            "18.472270",
            "73.884640"
          ]}
          icon={shopIcon}
          eventHandlers={{
            click: () => {
              setActiveShop("DMart")
            }
          }}
        />
        <FeatureGroup>
          <EditControl position="topright" draw={{
            polyline: false,
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false
          }
          } onCreated={onCreated}></EditControl>
        </FeatureGroup>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      {polygonLatLngs.length > 0 &&
        <ul>
          {polygonLatLngs.map((polygonLatLng) => <li key={polygonLatLng}>{polygonLatLng}</li>)}
        </ul>
      }
    </div>
  );
}

export default App;