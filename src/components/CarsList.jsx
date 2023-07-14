import React, { useEffect, useState } from 'react'
import Cars from './Cars';

const CarsList=()=> {

    const [carslist,setcarslist]=useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/cars/get`)
        .then((response) => response.json())
        .then((data) => setcarslist(data))
        console.log(carslist)
      } , []);
    console.log(carslist)
    const data = Array.isArray(carslist) && carslist.length > 0
  ? carslist.map((item) => {
      return <Cars item={item} key={item.id} />;
    })
  : null;
  
  return (
    <div style={{backgroundImage:`url("https://c4.wallpaperflare.com/wallpaper/404/19/616/dark-car-vehicle-ford-wallpaper-preview.jpg")`,
    backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundAttachment:'fixed',
        height: '150%'
    }}>
        <h1 style={{color:"white" ,fontSize:'5rem',marginTop:'rem'}} data-testId="heading">Rental Cars Services</h1>{data}</div>

  )
}

export default CarsList