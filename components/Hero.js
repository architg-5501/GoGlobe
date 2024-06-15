'use client'
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
const Hero = () => {
    const router = useRouter();
    const [rooms, setRooms] = useState(1);
    const [guests, setGuests] = useState(1);

    const handleIncrement = (setter, value) => () => {
        setter(value + 1);
    };

    const handleDecrement = (setter, value) => () => {
        setter(value > 1 ? value - 1 : 1);
    };
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [place, setPlace] = useState("");

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    const handleTravel = () => {
        router.push(`/hotel/single?city=${place}`);
    }


    return (
        <>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex justify-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm justify-center">
                            <li>
                                <Link href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">
                                    DELHI
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-900 dark:text-white hover:underline">
                                    KOLKATA
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-900 dark:text-white hover:underline">
                                    MUMBAI
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-900 dark:text-white hover:underline">
                                    BANGALORE
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="flex flex-row justify-around p-8 gap-4">
                <div className="w-1/2">
                    <img className="w-400 h-500"
                        src="herobg.png"
                    />
                </div>
                <div className="flex flex-col justify-center gap-4 mt-8">
                    <h1 className="text-center">How can we Help you?</h1>
                    <div>

                        <input onChange={(e) => setPlace(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" id="searchField" placeholder="Enter Place" />
                    </div>

                    <div>


                        <div className="flex items-center">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="Select date start"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <span className="mx-4 text-gray-500">to</span>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="MM/dd/yyyy"
                                    placeholderText="Select date end"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>



                    </div>
                    <div className="flex flex-row justify-around">
                        <div>
                            <label htmlFor="room-quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Choose Rooms:
                            </label>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button
                                    type="button"
                                    onClick={handleDecrement(setRooms, rooms)}
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                >
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    id="room-quantity-input"
                                    value={rooms}
                                    readOnly
                                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleIncrement(setRooms, rooms)}
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                >
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="guest-quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Number of Guests:
                            </label>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button
                                    type="button"
                                    onClick={handleDecrement(setGuests, guests)}
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                >
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    id="guest-quantity-input"
                                    value={guests}
                                    readOnly
                                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleIncrement(setGuests, guests)}
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                >
                                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center m-4">

                        <div className="flex-row justify-center items-center">

                            <button type="button" onClick={handleTravel} className="text-white text-center bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  inline-flex  dark:bg-yellow-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Let Travel 🌍

                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Hero;