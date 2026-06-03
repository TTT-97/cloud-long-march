'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

// Custom gold glowing marker icon
function createGoldIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 16px; height: 16px;
      background: #8B1E24;
      border: 2px solid #D4AF37;
      border-radius: 50%;
      box-shadow: 0 0 12px rgba(212,175,55,0.6), 0 0 24px rgba(212,175,55,0.3);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  });
}

function MapResizeFix() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 150);
  }, [map]);
  return null;
}

interface OriginLeafletMapProps {
  lat: number;
  lng: number;
  name: string;
  region: string;
}

export function OriginLeafletMap({ lat, lng, name, region }: OriginLeafletMapProps) {
  const goldIcon = createGoldIcon();

  return (
    <div className="overflow-hidden rounded-lg shadow-lg" style={{ height: 350 }}>
      <MapContainer
        center={[lat, lng]}
        zoom={7}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
        attributionControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapResizeFix />
        <Marker position={[lat, lng]} icon={goldIcon}>
          <Popup>
            <div className="text-center">
              <p className="text-sm font-semibold text-dark">{name}</p>
              <p className="text-xs text-dark/50">{region}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
