
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Card from "@material-ui/core/Card";

const Cardetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/cars/get/${id}`)
      .then((response) => response.json())
      .then((data) => setCar(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (car === null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
        backgroundImage: 'url("https://c4.wallpaperflare.com/wallpaper/26/399/594/1920x1081-px-1967-mustang-fastback-car-drive-neon-retrowave-synthwave-vehicle-art-skyline-hd-art-wallpaper-preview.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '150%'
      }}>
      <h1 style={{color:'white' ,fontSize:'5rem' ,marginTop:'-2px'}}>Car Details</h1>
      <Card
        style={{
          width: "50%",
          height: "20%",
        
          marginLeft: "30%",
          boxShadow: "10px 8px 6px 10px rgba(0, 0, 0, 0.1)",
          margin: "30px",
          borderRadius: "30px"
        }}
      >
        <img
          style={{ width: "100%", height: "30%" }}
          src={car.image_link}
          alt={car.name}
        />
        <p>
          <strong>{car.name}</strong>
        </p>
        <p>{car.short_desc}</p>
        <p>{car.long_desc}</p>
        <p>Rs: {car.rental_fee}</p>
        <Link to={`/confirmation/${car.id}`}>
        <button
          style={{
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
          
        >
          Book My Rental
        </button>
        </Link>
      </Card>
    </div>
  );
};

export default Cardetails;
