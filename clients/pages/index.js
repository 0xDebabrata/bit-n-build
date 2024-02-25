import dynamic from 'next/dynamic'
import TimeSelector from '../component/TimeSelector';
import LocustInfo from '../component/LocustInfo';
import { useEffect, useState } from 'react';

// import OpenStreetMap from '../component/OpenStreetMap'
const OpenStreetMap = dynamic(() => import('../component/OpenStreetMap'), {
  ssr: false,
})

const Index = () => {
  const [selectedArea, setSelectedArea] = useState(null)

  return (
    <div className='relative'>
      <OpenStreetMap setSelectedArea={setSelectedArea} />
      <div className='fixed bottom-0 inset-x-0 z-10 rounded-t-xl shadow-xl'>
        {/* <TimeSelector /> */}
        {selectedArea && (
          <LocustInfo selectedArea={selectedArea} />
        )}
      </div>
    </div>
  )
}

export default Index
