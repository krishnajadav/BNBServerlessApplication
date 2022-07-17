import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShowTours from './routes/tours/show_tours';
import BookingConfirmation from './routes/tours/booking_confirmation';
import ManageRoom from './routes/AdminRoom/ManageRoom'
import SearchRoom from './routes/CustomerRoom/SearchRoom'

function App() {
  return (
    <div className="App">
    <Router>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <Link to="/" class="navbar-brand">HotelBooking</Link>
    </nav>
    <br></br>
    <div className="container">
        <Routes>
          <Route exact path="/" element={<SearchRoom/>}/>
          <Route exact path="/ManageRoom" element={<ManageRoom/>}/>
          <Route exact path="/SearchRoom" element={<SearchRoom/>}/>
          <Route path='/tours' element={<ShowTours />}></Route>
          <Route path='/booking_confirmation' element={<BookingConfirmation />}></Route>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
