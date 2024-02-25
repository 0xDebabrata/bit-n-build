import dynamic from 'next/dynamic'

// import OpenStreetMap from '../component/OpenStreetMap'
const OpenStreetMap = dynamic(() => import('../component/OpenStreetMap'), {
  ssr: false,
})

const index = () => {
  return (
    <>
      <OpenStreetMap />
    </>
  )
}

export default index
