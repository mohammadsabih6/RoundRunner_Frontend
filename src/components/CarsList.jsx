import React, { useEffect, useState } from 'react'
import Cars from './Cars';

const CarsList=()=> {
    
    const [carslist,setcarslist]=useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/cars/get`)
        .then((response) => response.json())
        .then((data) => setcarslist(data))
        console.log(carslist)
        // .catch((error) => console.error('Error: ', error));
      } , []);
    console.log(carslist)
    const data = Array.isArray(carslist) && carslist.length > 0
  ? carslist.map((item) => {
      return <Cars item={item} key={item.id} />;
    })
  : null;
  
  return (
    <div><h1>CarsList</h1>{data}</div>

  )
}

export default CarsList