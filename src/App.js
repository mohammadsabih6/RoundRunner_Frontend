import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import CarsList from './components/CarsList';
import Cardetails from './components/Cardetails';
import Confirmation from './components/Contirmation';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<CarsList/>}/>
          <Route path='/cardetails/:id'element={<Cardetails/>}/>
          {/* <Route path='/hotelDetails/:id'element={<HotelDetails/>}/> */}
          <Route path='/confirmation'element={<Confirmation/>}/>
      
        </Routes>
      </Router>
    </div>
  );
}

export default App;