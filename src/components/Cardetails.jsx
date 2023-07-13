// import React, { useEffect, useState } from 'react';
// import { useParams,Link, useNavigate } from 'react-router-dom';
// import Card from '@material-ui/core/Card';

// const Cardetails = () => {
    
// const navigate=useNavigate();
//   const { id } = useParams();
//   const [cars, setcars] = useState(null);

//   useEffect(() => {
    
//     fetch(`http://localhost:8080/cars/get/${id}`)
//       .then((response) => response.json())
//       .then((data) => setcars(data))
//       .catch((error) => console.log(error));
//   }, [id]);

//   if (cars === null) {
//     return <div>Loading...</div>; // Display a loading state while fetching the data
//   }

//   return (
//     <div>
//         <h1>Car Details</h1>
//         <Card style={{width:"50%",height:"20%",marginLeft:'30%', boxShadow: '10px 8px 6px 10px rgba(0, 0, 0, 0.1)',margin:"30px",borderRadius:"30px"}}>
//       <img style={{width:'100%',height:'30%'}}src={cars.image_link}/>
//       <p><strong>{cars.name}</strong></p>
//       <p>{cars.short_desc}</p>
//       <p>{cars.long_desc}</p>
//       <p>Rs: {cars.rental_fee}</p>
//       {/* <Link to='/confirmation'> */}
//          {cars && <button
//   style={{ padding: '15px', fontSize: '1rem', borderRadius: '10px', marginBottom: '15px' }}
//   onClick={() => navigate('/confirmation', { state: { rental_fee: cars.rental_fee } })}
// >
//   Book My Rental
// </button>}
//         {/* </Link> */}
//     </Card>
//     </div>
//   );
// };

// export default Cardetails;
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Card from '@material-ui/core/Card';

const Cardetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/cars/get/${id}`)
      .then((response) => response.json())
      .then((data) => setCar(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleBookRental = () => {
    if (car) {
      navigate('/confirmation', { state: { rental_fee: car.rental_fee } });
    }
  };

  if (car === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Car Details</h1>
      <Card
        style={{
          width: '50%',
          height: '20%',
          marginLeft: '30%',
          boxShadow: '10px 8px 6px 10px rgba(0, 0, 0, 0.1)',
          margin: '30px',
          borderRadius: '30px',
        }}
      >
        <img style={{ width: '100%', height: '30%' }} src={car.image_link} alt={car.name} />
        <p>
          <strong>{car.name}</strong>
        </p>
        <p>{car.short_desc}</p>
        <p>{car.long_desc}</p>
        <p>Rs: {car.rental_fee}</p>
        <button
          style={{
            padding: '15px',
            fontSize: '1rem',
            borderRadius: '10px',
            marginBottom: '15px',
          }}
          onClick={handleBookRental}
        >
          Book My Rental
        </button>
      </Card>
    </div>
  );
};

export default Cardetails;
