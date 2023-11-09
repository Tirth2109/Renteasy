"use client"
import { useState, useEffect } from 'react';



interface GeolocationHookResult {
  
  country: string | null;
  error: string | null;
}

const useGetLocation = (): GeolocationHookResult => {
  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if ('geolocation' in navigator) {
   
      navigator.geolocation.getCurrentPosition(
        async (position: any) => {

          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          // Fetch country name using Nominatim reverse geocoding
          const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=bf73daa854ec4beca29163559231908&q=48.8567,2.3508&days=1&aqi=no&alerts=n`;

          try {
            const response = await fetch(apiUrl)
            const data = await response.json();
         
            setCountry(data.location.country);

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
  }, [longitude, latitude]);

  return {  country, error };
};

export default useGetLocation;
