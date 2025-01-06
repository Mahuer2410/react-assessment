'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { QuestionMark } from '@mui/icons-material';

const agentImages = { 
  'Wizzair.com': '/logos/wizzair.svg', 
  'British Airways': '/logos/britishAirways.svg', 
  'Lufthansa': '/logos/lufthansa.svg', 
  'Trip.com': '/logos/tripco.svg', 
  'Kiwi.com': '/logos/kiwico.svg', 
  'CheapFligths': '/logos/cheapfly.svg' 
};

export default function Itineraries() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [itineraries, setItineraries] = useState([]);
  const [originalItineraries, setOriginalItineraries] = useState([]);

  const toggleDropdown = () => { setIsDropdownOpen(!isDropdownOpen); };

  const sortByRate = () => { 
    const sortedItineraries = [...itineraries].sort((a, b) => b.agent_rating - a.agent_rating); 
    setItineraries(sortedItineraries); 
  };
  
  const sortByPrice = () => { 
    const sortedItineraries = [...itineraries].sort((a, b) => { 
      const priceA = parseFloat(a.price.replace('£', '')); 
      const priceB = parseFloat(b.price.replace('£', '')); 
      return priceA - priceB; 
    }); 
    setItineraries(sortedItineraries); 
  };

  const restoreOriginalOrder = () => { 
    setItineraries(originalItineraries); 
  };

  useEffect(() => {
    fetch('/Api.json')
      .then(response => response.json())
      .then(data => {
        setItineraries(data.itineraries);
        setOriginalItineraries(data.itineraries);
      });
  }, []);

  return (
    <div className="flex flex-col p-6 gap-4 w-screen">
      <div className="flex flex-row">
        <div style={{ width: '70%'}} className="flex items-center justify-start">
          Welcome
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

      <div className="flex flex-row gap-4 pt-8">
        <div>
          <div className=" text-gray-500 bg-gray-300 flex flex-row items-center gap-5 p-1 pl-1 rounded">
            <label ><SearchIcon/></label>
            <input type="text" id="inputId" placeholder="Search"  className="bg-[transparent] outline-none border-none w-full py-2 pl-2 pr-3" />
          </div>
        </div>

        <div className="relative"> 
          <button onClick={toggleDropdown} className="bg-gray-300 text-[#01C2D2] flex items-center text-center p-2 rounded"> 
            <FilterAltOutlinedIcon style={{ fontSize: '2rem' }} /> 
          </button> 
            {isDropdownOpen && ( 
          <div className="absolute right-0 top-12 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"> 
            <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100" onClick={restoreOriginalOrder}>
              <SentimentSatisfiedAltOutlinedIcon/> Most popular
            </a> 
            <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100" onClick={sortByPrice}>
              <CurrencyPoundIcon/>Price, Low to High
            </a> 
            <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100" onClick={sortByRate}>
              <StarBorderOutlinedIcon/>Rate, High to low
            </a> 
          </div> )} 
        </div>
      </div>

      <div className='flex pt-4'>
        <p>Select the itinerarie from the lilst below</p>
      </div>

      <div className='flex flex-col justify-center px-16 pt-16 gap-2'>
        <div className="flex flex-row border-2 rounded px-4 py-2 bg-gray-300">
          <div className='w-1/4'>Id Itinerarie</div>
          <div className='w-1/4'>Price</div>
          <div className='w-1/4'>Agent</div>
          <div className='w-1/4'>Agent Rate</div>
        </div>
        
        <div className='flex flex-col justify-center '>
          {itineraries.map((item) => (
            <Link href={`Itineraries/${item.id}`} key={item.id}>

              <div className="flex flex-row border-2 rounded px-4 py-2 hover:bg-gray-300">
                <div className='w-1/4'>{item.id}</div>
                <div className='w-1/4'>{item.price}</div>
                <div className='w-1/4 flex flex-row-reverse justify-end'>
                  {item.agent} 
                  {agentImages[item.agent] && ( 
                    <Image src={agentImages[item.agent]} alt={`${item.agent} logo`} width={20} height={20} className="ml-2" /> 
                  )}
                </div>
                <div className='w-1/4'>{item.agent_rating}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
