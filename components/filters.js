import React, { useState, useEffect } from 'react';

const Filters = ({ price, setPrice, handlePrice, setFacilities }) => {
    const [list, setList] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/facilities');
                const data = await res.json();
                setList(data.facilities);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFacilities();
    }, []);

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleChange = (e) => {
        const facilityName = e.target.name;
        if (e.target.checked) {
            setSelectedFacilities((prevSelected) => [...prevSelected, facilityName]);
        } else {
            setSelectedFacilities((prevSelected) =>
                prevSelected.filter((item) => item !== facilityName)
            );
        }
    };

    const handleSearch = () => {
        setFacilities(selectedFacilities);
        handlePrice();
    };

    return (
        <div className="ring-4 rounded-md m-3 h-auto py-10 px-3">
            <div className="flex items-center">
                <label htmlFor="price" className="text-xl font-bold mr-4">Price:</label>
                <input
                    type="range"
                    id="price"
                    min={0}
                    max={3000}
                    value={price}
                    onChange={handlePriceChange}
                    className="mr-4"
                />
                <span className="text-xl font-bold w-16 text-right">{price}</span>
            </div>
            <button
                className="w-40 h-10 bg-green-300 cursor-pointer my-3"
                onClick={handleSearch}
            >
                Search
            </button>

            <div className="">
                <h3 className="text-xl font-bold ">Filter by Facilities:</h3>
                {list && list.map((e) => (
                    <div key={e.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`facility-${e.id}`}
                            name={e.name}
                            value={e.name}
                            className="mr-2"
                            onChange={handleChange}
                        />
                        <label htmlFor={`facility-${e.id}`} className="text-lg text-white">{e.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filters;
