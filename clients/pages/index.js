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
  const [selectedPeriod, setSelectedPeriod] = useState("Day")

  return (
    <div className='relative'>
      <OpenStreetMap selectedPeriod={selectedPeriod} setSelectedArea={setSelectedArea} />
      <div className='fixed bottom-0 inset-x-0 z-10 rounded-t-xl'>
        {selectedArea && (
          <>
            <TimeSelector selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
            <LocustInfo selectedArea={selectedArea} />
          </>
        )}
      </div>
    </div>
  )
}

export default Index
