import dynamic from 'next/dynamic'
import TimeSelector from '../component/TimeSelector';

// import OpenStreetMap from '../component/OpenStreetMap'
const OpenStreetMap = dynamic(() => import('../component/OpenStreetMap'), {
  ssr: false,
})

const index = () => {
  return (
    <div className='relative'>
      <OpenStreetMap />
      <div className='absolute inset-0 flex flex-col justify-between z-10'></div>
      <div className="fixed bottom-0 left-0 w-full transform z-20">
        <TimeSelector />
      </div>
    </div>
  )
}

export default index
