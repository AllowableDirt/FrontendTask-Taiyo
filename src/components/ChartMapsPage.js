// src/components/ChartMapsPage.js
import React from 'react';
import LineGraph from './LineGraph';
import Maps from './Maps';

const ChartMapsPage = () => {
  return (
    <div className='justify-center items-center bg-white w-full mt-8'>
      <Maps />
      <LineGraph />
      
    </div>
  );
};

export default ChartMapsPage;
