import { useState, useEffect } from 'react'

export default function LocustInfo({ selectedArea }) {
    const [randomImageNumber, setRandomImageNumber] = useState(null);

    useEffect(() => {
        // Generate a random number between 1 and 15
        const n = Math.floor(Math.random() * 15) + 1;
        setRandomImageNumber(n);
    }, [selectedArea]); // Empty dependency array means this effect runs once on mount

    return (
        <div className="bg-white rounded-t-xl p-4 pb-6 overflow-hidden">
            {/* <div>{selectedArea[0]} {selectedArea[1]}</div> */}
            {randomImageNumber && (
                <div>
                    <div className='pb-2'>
                        <h1>
                            {selectedArea.region}
                        </h1>
                        <h3 className='font-light text-gray-600 text-base'>
                            {`${selectedArea.latlng[0]}, ${selectedArea.latlng[0]}`}
                        </h3>
                    </div>
                    <img src={`/${randomImageNumber}.png`} alt="Random Locust" className='rounded-xl' />
                </div>
            )}
        </div>
    );
}