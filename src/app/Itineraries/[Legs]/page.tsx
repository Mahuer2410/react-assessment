'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { QuestionMark } from '@mui/icons-material';

const agentImages = { 
  'WZ': '/logos/wizzair.svg', 
  'BA': '/logos/britishAirways.svg', 
  'LH': '/logos/lufthansa.svg', 
  'Trip.com': '/logos/tripco.svg', 
  'Kiwi.com': '/logos/kiwico.svg', 
  'CheapFligths': '/logos/cheapfly.svg' 
};

export default function Legs({ params }) {
  const { Legs } = params; 
  const [legs, setLegs] = useState([]);

  useEffect(() => {
    if (Legs) {
      fetch('/Api.json')
        .then(response => response.json())
        .then(data => {
          const itinerarie = data.itineraries.find(itin => itin.id === Legs);
          if (itinerarie) {
            const legDetails = data.legs.filter(leg => itinerarie.legs.includes(leg.id));
            setLegs(legDetails);
          }
        });
    }
  }, [Legs]);

  if (!Legs) return <div>Loading...</div>;

  return (
    <div className="flex flex-col p-6 gap-4 w-screen">
      
      <div className="flex flex-row">
        <div style={{ width: '70%'}} className="flex items-center justify-start hover:text-[#01C2D2]">
          <h1 className="text-2xl font-bold">Legs for Itinerary {Legs}</h1>
        </div>
        <div style={{ width: '30%'}} className="flex flex-row gap-2">
          <div className="flex items-center font-bold">
            <Image src="/User.webp" alt="User Image" width={50} height={50} />
          </div>
          <div style={{ width: '35%'}} className="flex items-center font-bold">
            Pepe Ladino
          </div>
          <div style={{ width: '25%'}} className="w-15 flex justify-center items-center text-center text-[#01C2D2] bg-[#DDF0F2] rounded-md">
            <QuestionMark/>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center px-16 pt-16 gap-2">
        {legs.map((leg) => (
          <div key={leg.id} className="flex flex-col border-2 rounded px-4 py-2 bg-gray-300">
            <div className='flex flex-col '>
              
              <div className='flex flex-row'>
                <div className='w-2/4'>Departure Airport: {leg.departure_airport}</div>
                <div className='w-2/4'>Arrival Airport: {leg.arrival_airport}</div>   
              </div>
              <div className='flex flex-row'>
                <div className='w-2/4'>Departure Time: {leg.departure_time}</div>
                <div className='w-2/4'>Arrival Time: {leg.arrival_time}</div>
              </div>
            </div>

            <div className='flex flex-row pt-4'>
              <div className='w-2/4'>Stops: {leg.stops}</div>
              <div className='w-2/4'>Airline: {leg.airline_name}</div>
              <div className='w-2/4'>Duration: {leg.duration_mins} mins</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
