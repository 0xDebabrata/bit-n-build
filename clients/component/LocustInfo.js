import { useState, useEffect } from 'react'

export default function LocustInfo({ selectedArea }) {
    const [randomImageNumbers, setRandomImageNumbers] = useState([]);

    useEffect(() => {
        // Generate a random number between 1 and 15
        const randoms = []
        for (let i = 0; i < 3; i++) {
            const n = Math.floor(Math.random() * 15) + 1;
            if (randoms.includes(n)) {
                continue
            } else {
                randoms.push(n)
            }
        }
        setRandomImageNumbers(randoms)
    }, [selectedArea]); // Empty dependency array means this effect runs once on mount

    return (
        <div className="bg-white rounded-t-xl p-4 pb-6 overflow-hidden">
            {/* <div>{selectedArea[0]} {selectedArea[1]}</div> */}
            {randomImageNumbers.length && (
                <div>
                    <div className='pb-2'>
                        <h1>
                            {selectedArea.region}
                        </h1>
                        <h3 className='font-light text-gray-600 text-base'>
                            {`${selectedArea.latlng[0]}, ${selectedArea.latlng[0]}`}
                        </h3>
                    </div>
                    <div className='flex flex-row items-center overflow-x-auto space-x-2'>
                        {randomImageNumbers.map((r, idx) => (
                            <img key={idx} src={`/${r}.png`} alt="Random Locust" className='rounded-xl' />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
