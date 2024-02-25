import { useState, useEffect } from 'react'
import {
    BugAntIcon,
    ChevronRightIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import SizeBox from './SizeBox'
import TargetBox from './TargetBox'
import FertiliserBox from './FertiliserBox'

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
        <div className="max-h-[70svh] bg-white overflow-y-auto rounded-t-xl p-4 pb-6">
            {/* <div>{selectedArea[0]} {selectedArea[1]}</div> */}
            {randomImageNumbers.length && (
                <div>
                    <div className='pb-4'>
                        <h1 className='pt-6'>
                            {selectedArea.region}
                        </h1>
                        <h3 className='font-light text-gray-600 text-base'>
                            Mob Reported At: {`${selectedArea.latlng[0]}, ${selectedArea.latlng[1]}`}
                        </h3>
                        <h3 className='font-light text-gray-600 text-base'>
                            Heading: 45° North East
                        </h3>
                        <h3 className='font-light text-gray-600 text-base'>
                            Speed: 16-19 Km/h
                        </h3>

                        <span className='flex flex-row gap-2 pt-2'>
                            <img src="/locust.png" className='w-6 p-0.5 rounded-lg border-1' />
                            <a href="#">Type: Locust (Migratory)</a>
                        </span>
                    </div>
                    <div className='pb-6'>
                        <p className='text-base font-semibold'>CCTV snapshots</p>
                        <div className='flex flex-row items-center overflow-x-auto space-x-2'>
                            {randomImageNumbers.map((r, idx) => (
                                <img key={idx} src={`/${r}.png`} alt="Random Locust" className='rounded-xl' />
                            ))}
                        </div>
                    </div>
                    <div className='pb-6'>
                        <p className='text-base font-semibold'>Control Measures</p>
                        <p className='text-gray-600'>
                            Based on your location and crops planted this year, the following control measures are recommended
                        </p>
                        <FertiliserBox>

                        </FertiliserBox>
                    </div>
                    <div className='pb-6'>
                        <p className='text-base font-semibold'>Swarm characteristics</p>
                        <SizeBox></SizeBox>
                        <br></br>
                        <TargetBox></TargetBox>
                    </div>

                </div>
            )}
        </div>
    );
}
