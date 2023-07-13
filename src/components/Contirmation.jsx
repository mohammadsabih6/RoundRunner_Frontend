import { Checkbox } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import Card from '@material-ui/core/Card';

const Confirmation = () => {
    const { id } = useParams()
    const navigate=useNavigate();
  const location = useLocation();

  const [check, setcheck] = useState(false);
  const [selected,setSelect]=useState("");
  const [formdata, setformdata] = useState({
    name: "",
    address: "",
    phone: "",
    driver_licences: "",
    pickdate: "",
    dropdate: "",
    rental_fee: "",
    insurance: "",
    totalamounts: "",
  });
//   const roundedNumber = calculateinsurance().toFixed(0);
//   console.log(roundedNumber)

useEffect(() => {
    fetch(`http://localhost:8080/cars/get/${id}`)
      .then((response) => response.json())
      .then((data) => setSelect(data))
      .catch((error) => console.log(error));
  }, []);
  const handlesubmit = (event) => {
    setformdata({ ...formdata, [event.target.name]: event.target.value });
  };
  const handlecheckbox = (e) => {
    setcheck(e.target.checked);
  };
  const calculateinsurance=()=>{
    const perdayrent = selected.rental_fee;
        const startdate = new Date(pickdate);
        const enddate = new Date(dropdate);
        const totalrentaldays = (enddate - startdate) / (1000 * 60 * 60 * 24);
        const totalwithdamage = (totalrentaldays * 15000) ;
        return totalwithdamage;
  }
  const calculatetotalrantaldays = () => {
    if (check === true) {
        const perdayrent = selected.rental_fee;
        const startdate = new Date(pickdate);
        const enddate = new Date(dropdate);
        const totalrentaldays = (enddate - startdate) / (1000 * 60 * 60 * 24);
        const totalwithoutdamage = totalrentaldays * perdayrent;
        const totalwithdamage = (totalrentaldays * 15000) + totalwithoutdamage ;
        console.log("total ======",totalwithdamage);
        return (totalwithdamage); 
    } else {
        const perdayrent = selected.rental_fee;
        const startdate = new Date(pickdate);
        const enddate = new Date(dropdate);
        const totalrentaldays = (enddate - startdate) / (1000 * 60 * 60 * 24);
        const totalwithoutdamage = totalrentaldays * perdayrent;
        console.log("total ======",totalwithoutdamage);
        return (totalwithoutdamage);
    }
  };
  const {
    name,
    address,
    phone,
    pickdate,
    driver_licences,
    dropdate,
    rental_fee: formRentalFee,
    totalamount,
    insurance,
  } = formdata;

  const submit = (e) => {
  e.preventDefault();
  const data = {
    name: formdata.name,
    address: formdata.address,
    phone: formdata.phone,
    driver_licences: formdata.driver_licences,
    pickdate: formdata.pickdate,
    dropdate: formdata.dropdate,
    rental_price: selected.rental_fee,
    insurance: calculateinsurance(),
    totalamount: calculatetotalrantaldays(),
  };

  fetch("http://localhost:8080/rental/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
            console.log("Confirmed ", response);
            localStorage.setItem("data", JSON.stringify(data));
            navigate("/thanks")  
    });
};


  return (
    <div>
      <h1>Confirmation</h1>
      <Card style={{width:"30%",height:"20%",marginLeft:'35%', boxShadow: '10px 8px 6px 10px rgba(0, 0, 0, 0.1)',margin:"30px",borderRadius:"30px"}}>
        {/* <h1>Hotel</h1> */}
      <img style={{width:'100%',height:'30%'}}src={selected.image_link} alt='car Image'/>
      {/* <Link to={`/cardetails/${item.id}`}> */}
      <p><strong>{selected.name}</strong></p>
      <p>{selected.short_desc}</p>
      <p>Rs: {selected.rental_fee}</p>
      
    </Card>
      <form  onSubmit={submit}>
        <label>Name</label>
        <br />
        <input type="text" name="name" value={name} onChange={handlesubmit} />
        <br />
        <br />
        <label>phone</label>
        <br />
        <input type="text" name="phone" value={phone} onChange={handlesubmit} />
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
        <br />
        <label>Rental Price</label>
        <br />
        <input
          type="text"
          name="rental_fee"
          value={selected.rental_fee}
          onChange={handlesubmit}
        />
        <br />
        <label>Insurance</label>
        <br />
        <br />
        <Checkbox
          type="checkbox"
          name="insurance"
          value={calculatetotalrantaldays()}
          onChange={handlecheckbox}
        />
        <br />
        <br />
        <br />
        <label>Pick Date</label>
        <br />
        <input
          type="datetime-local"
          name="pickdate"
          value={pickdate}
          onChange={handlesubmit}
        />
        <br />
        <label>Drop Date</label>
        <br />
        <input
          type="datetime-local"
          name="dropdate"
          value={dropdate}
          onChange={handlesubmit}
        />
        <br />
        <br />
        <label>insurrance</label>
        <br />
        <input
          type="text"
          name="insurance"
          value={calculateinsurance()}
          onChange={handlesubmit}
        />
        <br />
        <br />
        <label>Total Amount</label>
        <br />
        <input
          type="text"
          name="totalamount"
          value={calculatetotalrantaldays()}
          onChange={handlesubmit}
          
          readOnly={true} 
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Confirmation;
