import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowTours from './routes/tours/show_tours';
import BookingConfirmation from './routes/tours/booking_confirmation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/tours' element={<ShowTours />}></Route>
          <Route path='/booking_confirmation' element={<BookingConfirmation />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
