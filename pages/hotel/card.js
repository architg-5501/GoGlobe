import React from 'react';
import { useRouter } from 'next/router';

const Card = ({ hotel }) => {
    const router = useRouter();

    if (!hotel) {
        return <div>Error: Hotel data not found</div>;
    }

    const { _id, name, description, banner, facilities, price } = hotel;

    const handleSite = () => {

        if (!_id) {
            console.error('Hotel ID is missing');
            return;
        }
        console.log(`Navigating to /detail/${_id}`); // Debug log
        router.push(`/detail/${_id}`);
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <img className="w-full" src={banner} alt={name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 ">
                    <h2 className="text-black font-bold">{name}</h2>
                </div>
                <p className="text-gray-700 text-base">{description}</p>
                <ul className="list-disc list-inside mt-2 text-gray-700 ">
                    <h2 className="text-black font-semibold ">Facilities</h2>
                    <div className='flex flow-row items-start p-2'>
                        {facilities.map((facility) => (
                            <li key={facility._id} className="flex items-center">
                                <img src={facility.img} alt={facility.name} className="w-6 h-6 mr-2" />
                                <span>{facility.name}</span>
                            </li>
                        ))}
                    </div>
                </ul>
                <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-xl text-indigo-500">INR {price}</span>
                    <button onClick={handleSite} className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
