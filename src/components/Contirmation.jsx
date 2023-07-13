import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
    const location = useLocation();
    const { state } = location;
    const rental_fee = state ? state.rental_fee : null;
//  let cars=state.rental_fee;
const [formdata, setformdata] = useState({
    name: '',
    address: '',
    phone: '',
    driver_licences: '',
    pickdate: '',
    dropdate: '',
    rental_fee: '',
    insurance: '',
    totalamount:''
});
const { name, address,phone,pickdate,driver_licences,dropdate,totalamount,rental_fee: formRentalFee,insurance} = formdata;
console.log(rental_fee)

  const handlesubmit = (event) => {
    setformdata({ ...formdata, [event.target.name]: event.target.value });
  };
  const calculatenight=()=>{
    const arrival=new Date(pickdate);
    const departure=new Date(dropdate);
    const totalnights=Math.ceil(arrival-departure)/(1000*60*60*24)
    return totalnights;
  } 

   console.log(rental_fee);
  const totalamounts=()=>{
    const perdayrent=rental_fee;
    const totalnights=calculatenight();
    return perdayrent*totalnights;
  
  }

   

  const submit=(e)=>{
    e.preventDefault();
    const data={
      name:formdata.name,
      address:formdata.address,
      phone:formdata.phone,
      driver_licences:formdata.driver_licences,
      pickdate:formdata.pickdate,
      dropdate:formdata.dropdate,
      rental_price:formdata.rental_price,
      insurance:formdata.insurance,
      totalamount:formdata.totalamount,
    }
    console.log(data)
    fetch('http://localhost:8080/rental/add',{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((response)=>{
      console.log("Confirmed ",response)
    })
  }


  return (
    <div>
      <h1>Confirmation</h1>
      <form onSubmit={submit}>
        <label>Name</label>
        <br />
        <input type="text" name="name" value={name} onChange={handlesubmit} />
        <br />
        <br />
        <label>phone</label>
        <br />
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handlesubmit}
        />
        <br />
        <br />
        <label>Address</label>
        <br />
        <input
          type="text"
          name="address"
          value={address}
          onChange={handlesubmit}
        />
        <br />
        <br />
        <label>Driving Licences</label>
        <br />
        <input
          type="text"
          name="driver_licences"
          value={driver_licences}
          onChange={handlesubmit}
        />
        <br/>
        <label>Rental Price</label>
        <br />
        <input
          type="text"
          name="rental_price"
          value={rental_fee}
          onChange={handlesubmit}
        />
        <br/>
        <label>Insurance</label>
        <br />
        <br/>
        {/* <Checkbox
          type="text"
          name="insurance"
          value={insurance}
          onChange={handlesubmit}
        /> */}
        <br/>
        <br/>
        <br/>
        <label>Pick Date</label>
        <br/>
        <input
          type="date"
          name="pickdate"
          value={pickdate}
          onChange={handlesubmit}
        />
        <br/>
        <label>Drop Date</label>
        <br/>
        <input
          type="date"
          name="dropdate"
          value={dropdate}
          onChange={handlesubmit}
        />
        <br/>
        <br/>
        <label>Total Amount</label>
        <br />
        <input
          type="text"
          name="totalamount"
          value={totalamounts()}
          onChange={handlesubmit}
          readOnly
        />
        <br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Confirmation;