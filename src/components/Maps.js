import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Maps.css';
import L from 'leaflet'; // Import the Leaflet object

// Define a custom marker icon
const customIcon = L.icon({
  iconUrl: 'https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png', // Replace with your custom icon image path
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Maps = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [worldData, setWorldData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/countries');
        const data = response.data;
        setCountriesData(data);
        const responseWorld = await axios.get('https://disease.sh/v3/covid-19/all');
        const world = responseWorld.data;
        setWorldData(world);
      } catch (error) {
        console.error('Error fetching countries data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">COVID-19 Cases by Country</h2>
      

      <div className="w-full max-w-3xl lg:w-3/4 xl:w-1/2">
  <div className="h-96 w-full lg:w-3/4 xl:w-full">
        <MapContainer center={[20, 0]} zoom={3} className="h-96 w-full lg:w-3/4 xl:w-1/2 shadow-md">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countriesData.map((country) => (
            
            <Marker
              key={country.countryInfo.iso2}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={customIcon} // Use the custom marker icon
            >
              <Popup>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{country.country}</h3>
                  <p className="mb-1">Active Cases: {country.active}</p>
                  <p className="mb-1">Recovered Cases: {country.recovered}</p>
                  <p>Total Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        </div>
        <h6 className="text-2l  mb-4 text-center">Tap on virus icon to get detials</h6>
      </div>
      <div className="w-full max-w-3xl lg:w-3/4 xl:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">Worldwide COVID-19 Data</h2>
        <table className="w-full border-collapse border shadow-md border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Category</th>
              <th className="border border-gray-400 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 px-4 py-2">Total Cases</td>
              <td className="border border-gray-400 px-4 py-2">{worldData.cases}</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2">Total Recovered</td>
              <td className="border border-gray-400 px-4 py-2">{worldData.recovered}</td>
            </tr>
            <tr>
              <td className="border text-bold border-gray-400 px-4 py-2">Total Deaths</td>
              <td className="border text-red border-gray-400 px-4 py-2">{worldData.deaths}</td>
            </tr>
          </tbody>
        </table>
        <p></p>
      </div>
    </div>
  );
};

export default Maps;
