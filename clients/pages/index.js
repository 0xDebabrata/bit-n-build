import dynamic from 'next/dynamic'
import TimeSelector from '../component/TimeSelector';
import LocustInfo from '../component/LocustInfo';
import { useState } from 'react';
import Info from '../component/Info';
import SelfInfo from '../component/SelfInfo';
import Alert from "../component/Alert";

// import OpenStreetMap from '../component/OpenStreetMap'
const OpenStreetMap = dynamic(() => import('../component/OpenStreetMap'), {
  ssr: false,
})

const Index = () => {
  const [selectedArea, setSelectedArea] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState("Day")

  return (
    <div className='relative'>
    {/*
      <div className='fixed top-3 right-3 z-10 rounded-xl shadow-xl'>
        <Info />
      </div>
        */}
      <OpenStreetMap selectedPeriod={selectedPeriod} setSelectedArea={setSelectedArea} />
      <div className='fixed bottom-0 inset-x-0 z-10 rounded-t-xl'>
        {selectedArea ? 
          selectedArea !== -1 ? (
            <>
              <TimeSelector selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
              <LocustInfo selectedArea={selectedArea} />
            </>
          ) : null
         : (
          <>
            <Alert />
            <SelfInfo />
          </>
        )}
      </div>
    </div>
  )
}

export default Index
