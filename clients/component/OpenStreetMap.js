import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const initialRegions = [
  //"Bandra (West), Mumbai",
  "Chorasi, Gujarat",
  "Vadodara, Gujarat",
  "Banswara, Rajasthan",
]
const initialPositions = [
  // [19.044785, 72.8203021, "gray"],
  [21.024785, 72.8203021, "gray"],
  [22.431785, 73.1203021, "gray"],
  [23.424785, 74.8203021, "red"],
]

const Map2 = ({ selectedPeriod, setSelectedArea }) => {
  const center = { lat: 19.044785, lng: 72.8203021 }
  const ZOOM_LEVEL = 6.4
  const [map, setMap] = useState(null)
  const [regions, setRegions] = useState(structuredClone(initialRegions))
  const [positions, setPositions] = useState(structuredClone(initialPositions))
  const [currPosition, setCurrPosition] = useState([19.044785, 72.8203021])

  const updateTimeline = () => {
    if (selectedPeriod === "Day") {
      setRegions(structuredClone(initialRegions))
      setPositions(structuredClone(initialPositions))
    } else if (selectedPeriod === "Week") {
      setRegions(prev => {
        const copy = structuredClone(initialRegions)
        copy.push("Mandsaur, Madhya Pradesh")
        return copy
      })
      setPositions(prev => {
        const copy = structuredClone(initialPositions)
        copy[2][2] = "gray"
        copy.push([24.076836, 75.069295, "red"])
        return copy
      })
    } else if (selectedPeriod === "Month") {
      setRegions(prev => {
        const copy = structuredClone(initialRegions)
        copy.push("Mandsaur, Madhya Pradesh")
        copy.push("Bhilwara, Rajasthan")
        return copy
      })
      setPositions(prev => {
        const copy = structuredClone(initialPositions)
        copy[2][2] = "gray"
        copy.push([24.076836, 75.069295, "gray"])
        copy.push([25.346251, 74.636383, "red"])
        return copy
      })
    }
  }

  const getNearestPosition = (event) => {
    const { lat, lng } = event.latlng

    for (let i = 0; i < positions.length; i++) {
      const item = positions[i]
      const distance = Math.sqrt(Math.pow(item[0] - lat, 2) + Math.pow(item[1] - lng, 2));

      if (distance < 0.1) {
        // console.log(distance, item)
        setSelectedArea({
          latlng: item,
          region: regions[i]
        });
        break
      } else {
        setSelectedArea(-1);
      }
    }
  };

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
    updateTimeline()
  }, [selectedPeriod])

  useEffect(() => {
    if (!map) return;
    getCurrentLocation()
  }, [map]);

  useEffect(() => {
    if (!map) return
    map.target.on("click", getNearestPosition)

    return () => {
      map.target.off("click", getNearestPosition)
    }
  }, [positions])

  return (
    <MapContainer className="z-1" center={center} zoom={ZOOM_LEVEL} whenReady={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={currPosition}>
        <Popup>
          You are here.
        </Popup>
      </Marker>
      {positions.map((p, idx) => (
        <div key={idx}>
          <Circle center={p} pathOptions={{ fillOpacity: 1, fillColor: p[2], color: p[2] }} radius={12000} />
          <Circle center={p} pathOptions={{ stroke: false, fillOpacity: 0.5, fillColor: p[2], color: p[2] }} radius={25000} />
        </div>
      ))}
      {/*<Polyline pathOptions={{ color: 'red', opacity: 0.5 }} positions={positions} />*/}
    </MapContainer>
  )
}

export default Map2
