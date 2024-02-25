import dynamic from 'next/dynamic'

// import OpenStreetMap from '../component/OpenStreetMap'
const OpenStreetMap = dynamic(() => import('../component/OpenStreetMap'), {
  ssr: false,
})

const Slideover = dynamic(() => import('../component/Slideover'), { // Adjust the path as necessary
  ssr: false,
});

const index = () => {
  return (
    <>
      <OpenStreetMap />
      <Slideover></Slideover>
    </>
  )
}

export default index
