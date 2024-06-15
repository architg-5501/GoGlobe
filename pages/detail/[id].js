"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Navbar from '@/components/navbar';
import axios from 'axios';

const Details = () => {
    const router = useRouter();
    const { id } = router.query;

    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setAuth(Cookies.get('user'));
        }
    }, []);

    useEffect(() => {
        const fetchHotel = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:3000/api//ind?id=${id}`);
                    setHotel(response.data.hotel);
                } catch (error) {
                    console.error('Error fetching hotel:', error);
                    // Handle specific errors or set hotel to null/error state
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchHotel();
    }, [id]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!hotel) {
        return <div>Error: Hotel data not found</div>;
    }

    const images = [hotel.banner, ...hotel.gallery];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleLogin = () => {
        router.push('/booking/signup');
    };

    return (
        <>
            {hotel &&
                <div className="min-h-screen bg-gray-100 p-8">
                    <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="relative rounded overflow-hidden">
                            <img
                                className="w-full h-96 object-cover rounded"
                                src={images[currentImageIndex]}
                                alt={`${hotel.name} image ${currentImageIndex + 1}`}
                            />
                            <button
                                onClick={prevImage}
                                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
                            >
                                ‹
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full"
                            >
                                ›
                            </button>
                        </div>
                        <div className="p-8">
                            <h1 className="text-4xl font-bold mb-4 text-black">{hotel.name}</h1>
                            <p className="text-gray-700 text-lg mb-4">{hotel.description}</p>

                            <div className="mt-2">
                                <h2 className="text-2xl font-semibold mb-2 text-black">Facilities</h2>
                                <ul className="list-disc list-inside text-gray-700">
                                    {hotel.facilities.map((facility) => (
                                        <li key={facility._id} className="flex items-center mb-2">
                                            <img
                                                src={facility.img}
                                                alt={facility.name}
                                                className="w-6 h-6 mr-2"
                                            />
                                            <span>{facility.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center justify-between mt-8">
                                <span className="text-2xl font-bold text-indigo-500">
                                    ${hotel.price} / night
                                </span>
                                {auth ? (
                                    <button className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                                        Book Now
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleLogin}
                                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                                    >
                                        Login to Book
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Details;
