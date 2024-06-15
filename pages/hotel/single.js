"use client";
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Navbar from '@/components/navbar';
import Filters from '@/components/filters';

const App = ({ initialHotels }) => {
    const [price, setPrice] = useState(50);
    const [list, setList] = useState([]);
    const [hotels, setHotels] = useState(initialHotels);

    const fetchHotelsByPrice = async () => {
        const res = await fetch(`http://localhost:3000/api/facilities/range?price=${price}`);
        const data = await res.json();
        return data.hotels;
    };

    const fetchHotelsByFeatures = async () => {
        const res = await fetch(`http://localhost:3000/api/facilities/search?val=${list}`);
        const data = await res.json();
        return data.hotels;
    };

    const fetchHotels = async () => {
        try {
            const hotelsByPrice = await fetchHotelsByPrice();
            const hotelsByFeatures = await fetchHotelsByFeatures();

            const filteredHotels = hotelsByPrice.filter(hotel =>
                hotelsByFeatures.some(featureHotel => featureHotel._id === hotel._id)
            );

            setHotels(filteredHotels);
        } catch (error) {
            console.error('Error fetching hotels:', error.message);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, [price, list]);

    return (
        <>
            <Navbar />
            <div className=" grid-cols-12 p-6 flex flex-row">
                <div className="col-span-3 mr-4 sticky-top">
                    <Filters
                        price={price}
                        setPrice={setPrice}
                        handlePrice={fetchHotels}
                        setList={setList}
                        handleFeature={fetchHotels}
                    />
                </div>
                <div className="col-span-9 border border-3">
                    {hotels && hotels.map((hotel) => (
                        <Card key={hotel._id} hotel={hotel} />
                    ))}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(ctx) {
    try {
        const res = await fetch(`http://localhost:3000/api/hotel?city=${ctx.query.city}`);
        if (!res.ok) {
            throw new Error('Failed to fetch hotels data');
        }
        const data = await res.json();
        return {
            props: {
                initialHotels: data.hotels,
            }
        };
    } catch (error) {
        console.error('Error fetching hotels data:', error.message);
        return {
            props: {
                initialHotels: [],
            }
        };
    }
}

export default App;
