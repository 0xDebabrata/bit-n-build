import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, SVGOverlay, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


const Map2 = ({ setSelectedArea }) => {
  const center = { lat: 19.044785, lng: 72.8203021 }
  const ZOOM_LEVEL = 6
  const [map, setMap] = useState(null)

  const regions = [
    "Badra (West), Mumbai",
    "Chorasi, Gujarat",
    "Banswara, Rajasthan",
  ]
  const positions = [
    [19.044785, 72.8203021],
    [23.424785, 74.8203021],
    [21.024785, 72.8203021],
    //[19.044785, 72.8203021],
  ]

  const getNearestPosition = (event) => {
    // console.log(event.latlng)
    const { lat, lng } = event.latlng

    for (let i = 0; i < positions.length; i++) {
      const item = positions[i]
      const distance = Math.sqrt(Math.pow(item[0] - lat, 2) + Math.pow(item[1] - lng, 2));

      if (distance < 0.6) {
        console.log(distance, item)
        setSelectedArea({
          latlng: item,
          region: regions[i]
        });
        break
      } else {
        setSelectedArea(null);
      }
    }
  };

  const bounds = positions.map(p => {
    return [
      [p[0] + 0.5, p[1] - 0.3],
      [p[0] - 1, p[1] + 1.5]
    ]
  })

  const locationSuccess = (geolocation) => {
    map.target.flyTo({
      lat: geolocation.coords.latitude,
      lng: geolocation.coords.longitude,
    })
  }
  const getCurrentLocation = () => {
    window.navigator.geolocation.getCurrentPosition(locationSuccess, console.error, {
      enableHighAccuracy: true
    })
  }

  useEffect(() => {
    if (!map) return;
    getCurrentLocation()

    map.target.on("click", getNearestPosition)
  }, [map]);

  return (
    <MapContainer className="z-1" center={center} zoom={ZOOM_LEVEL} whenReady={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {positions.map((p, idx) => (
        <SVGOverlay key={idx} attributes={{ stroke: 'red' }} bounds={bounds[idx]}>
          <circle r="10" cx="15" cy="15" fill="red" filter="url(#blurMe)" onClick={console.log} />
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </SVGOverlay>
      ))}
    </MapContainer>
  )
}

export default Map2
