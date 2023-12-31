import { Checkbox } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Card from '@material-ui/core/Card';
import styles from "./confirmation.module.css";

const Confirmation = () => {
  const { id } = useParams()
  const navigate = useNavigate();

  const [check, setCheck] = useState(false);
  const [selected, setSelected] = useState("");
  const [formdata, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("confirmationData"));
    return storedData || {
      name: "",
      address: "",
      phone: "",
      driver_licences: "",
      pickdate: "",
      dropdate: "",
      rental_fee: "",
      insurance: "",
      totalamounts: "",
    };
  });

  useEffect(() => {
    fetch(`http://localhost:8080/cars/get/${id}`)
      .then((response) => response.json())
      .then((data) => setSelected(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    localStorage.setItem("confirmationData", JSON.stringify(formdata));
  }, [formdata]);

  const handlesubmit = (event) => {
    setFormData({ ...formdata, [event.target.name]: event.target.value });
  };

  const handleCheckbox = (e) => {
    setCheck(e.target.checked);
  };

  const calculateInsurance = () => {
    const perdayrent = selected.rental_fee;
    const startdate = new Date(formdata.pickdate);
    const enddate = new Date(formdata.dropdate);
    const totalrentaldays = (enddate - startdate) / (1000 * 60 * 60 * 24);
    const totalwithdamage = totalrentaldays * 15000;
    return totalwithdamage;
  }

  const calculateTotalRentalDays = () => {
    if (check === true) {
      const perdayrent = selected.rental_fee;
      const startdate = new Date(formdata.pickdate);
      const enddate = new Date(formdata.dropdate);
      const totalrentaldays = (enddate - startdate) / (1000 * 60 * 60 * 24);
      const totalwithoutdamage = totalrentaldays * perdayrent;
      const totalwithdamage = (totalrentaldays * 15000) + totalwithoutdamage;
      console.log("total ======", totalwithdamage);
      return totalwithdamage;
    } else {
      const perdayrent = selected.rental_fee;
      const startdate = new Date(formdata.pickdate);
      const enddate = new Date(formdata.dropdate);
      const totalrentaldays = (enddate - startdate) / (1000 * 60 * 60 * 24);
      const totalwithoutdamage = totalrentaldays * perdayrent;
      console.log("total ======", totalwithoutdamage);
      return totalwithoutdamage;
    }
  };
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
      insurance: calculateInsurance(),
      totalamount: calculateTotalRentalDays(),
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
        localStorage.removeItem("confirmationData");
        navigate("/thanks")
      });
  };
  return (
    <div style={{backgroundImage:`url("https://png.pngtree.com/thumb_back/fw800/background/20230519/pngtree-car-showroom-in-the-dark-lit-room-with-boxes-image_2601969.png")`,
    backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundAttachment:'fixed',
        height: '150%'}}>
      <h1 style={{color:'white',fontSize:'3rem',marginBottom:'01rem'}}>Confirmation</h1>
      <div className={styles.container}>
        <Card
          style={{
            width: "30%",
            height: "20%",
            boxShadow: "10px 8px 6px 10px rgba(0, 0, 0, 0.1)",
            margin: "30px",
            borderRadius: "30px",
          }}
        >
          <img
            style={{ width: "100%", height: "30%" }}
            src={selected.image_link}
            alt="car Image"
          />
          <p>
            <strong>{selected.name}</strong>
          </p>
          <p>{selected.short_desc}</p>
          <p>Rs: {selected.rental_fee}</p>
          <Link to='/'>
            <button style={{cursor:"pointer",color:'white',width:'25rem',height:'2.5rem',borderRadius:'10px',fontSize:'1.5rem',backgroundColor: '#007bff',marginBottom:'10px'}}>Change Another Car</button>
          </Link>
        </Card>
        <form className={styles.form} onSubmit={submit}>
          <label>Name</label>
          <br />
          <input type="text" name="name" data-testid="name" value={formdata.name} onChange={handlesubmit} />
          <br />
          <br />
          <label>Phone</label>
          <br />
          <input type="text" name="phone" data-testid="phone" value={formdata.phone} onChange={handlesubmit} />
          <br />
          <br />
          <label>Address</label>
          <br />
          <input
            type="text"
            name="address"
            data-testId="address"
            value={formdata.address}
            onChange={handlesubmit}
          />
          <br />
          <br />
          <label>Driving Licences</label>
          <br />
          <input
            type="text"
            name="driver_licences"
            data-testId="driverLicences"
            value={formdata.driver_licences}
            onChange={handlesubmit}
          />
          <br />
          <br />
          <label>Rental Price</label>
          <br />
          <input
            type="text"
            name="rental_fee"
            data-testId="rental"
            value={selected.rental_fee}
            onChange={handlesubmit}
          />
          <br />
          <br />
          <label>Damage Waviers</label>
          <br />
          <Checkbox
            type="checkbox"
            name="insurance"
            data-testId="insurance"
            style={{ marginTop: "-3rem",width:'0rem', marginLeft: "2rem",backgroundColor:'white' }}
            value={calculateTotalRentalDays()}
            onChange={handleCheckbox}
          />
          <br />
          <label>Pick Date</label>
          <br />
          <input
            type="datetime-local"
            name="pickdate"
            data-testId="pickdate"
            value={formdata.pickdate}
            onChange={handlesubmit}
          />
          <br />
          <label>Drop Date</label>
          <br />
          <input
            type="datetime-local"
            name="dropdate"
            data-testId="dropdate"
            value={formdata.dropdate}
            onChange={handlesubmit}
          />
          <br />
          <br />
          <label>Insurance Amount</label>
          <br />
          <input
            type="text"
            name="insurance"
            data-testId="insured"
            value={calculateInsurance()}
            onChange={handlesubmit}
          />
          <br />
          <br />
          <label>Total Amount</label>
          <br />
          <input
            type="text"
            name="totalamount"
            data-testId="totalamount"
            value={calculateTotalRentalDays()}
            onChange={handlesubmit}
            readOnly={true}
          />
          <br />
          <br/>
          <input type="submit" value="Submit" />
          
        </form>

      </div>
    </div>
  );
};
export default Confirmation;
