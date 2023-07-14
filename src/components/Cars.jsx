import React from 'react';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
const Cars = ({ item }) => {
  return (
    <div >
      <div >
    <Card style={{width:"30%",height:"20%",marginLeft:'35%', boxShadow: '10px 8px 6px 10px rgba(0, 0, 0, 0.1)',margin:"30px",borderRadius:"30px"}}>
      <img style={{width:'100%',height:'30%'}} data-testid="image" src={item.image_link} alt='Cars Images'/>
      <Link to={`/cardetails/${item.id}`}>
      <p><strong>{item.name}</strong></p>
      </Link>
      <p>{item.short_desc}</p>
      <p>Rs: {item.rental_fee}</p>
      <Link to={`/confirmation/${item.id}`}>
          <button style={{ padding: '15px', fontSize: '1rem', borderRadius: '10px', marginBottom: '15px' }}>Book My Rental</button>
        </Link>
    </Card>
    </div>
    </div>
  );
};

export default Cars;
