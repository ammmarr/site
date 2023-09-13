
import axios from 'axios';
import { FC, useEffect, useState } from 'react';


interface LocationInputProps {
  
}

export const AddAdressTrip:FC<LocationInputProps> = () => {
 
  const [location , setLocation ] = useState()
  console.log(location)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_TELE_URL}/api/transports/private/trips/49/create-ticket`).then((res : any) => {
     setLocation(res.data)
    })
  } ,[])

  return (

    <div className='container mb-5 mt-5 flex w-full justify-around '>
      <div className='flex justify-center items-center mt-10'>


      </div>
    </div>

  )
}
