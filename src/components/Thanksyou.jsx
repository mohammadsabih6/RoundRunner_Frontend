import React from 'react'
import { Link} from "react-router-dom";
const Thanksyou = () => {
  return (
    <div style={{
      backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0nvC7b2LSk_YzquRemvVWuTy05PR4KKTOWBORMjgjtjnFYchzxulb-uFwUKseA60nUfA&usqp=CAU")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh'}}>
      <h1 style={{color:'white',fontSize:'5rem'}}>Thank you</h1>
      <Link to='/'>
            <button style={{cursor:"pointer",color:'white',width:'25rem',height:'2.5rem',borderRadius:'10px',fontSize:'1.5rem',backgroundColor: '#007bff',marginBottom:'10px'}}>Return to home</button>
          </Link>
      </div>
  )
}

export default Thanksyou;