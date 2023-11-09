"use client"

import React, { useState, useEffect } from 'react';


function LocationComponent() {
  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);
  const [country, setCountry] = useState<any>('');

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if ('geolocation' in navigator) {
      // Get user's current location
      navigator.geolocation.getCurrentPosition(
        async (position: any) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          // Fetch country name using Nominatim reverse geocoding
          const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;

          try {
            const response = await fetch(apiUrl)
            const data = await response.json();
            setCountry(data.address.country);

          } catch (error) {
            console.error('Error fetching country:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not available');
    }
  }, []);

  return (
    <div>
      {latitude !== null && longitude !== null ? (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
          <p>Country: {country}</p>
        </div>
      ) : (
        <p>Getting your location...</p>
      )}
    </div>
  );
}

export default LocationComponent;
