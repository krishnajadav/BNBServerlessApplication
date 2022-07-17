import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowTours from "./routes/tours/show_tours";
import BookingConfirmation from "./routes/tours/booking_confirmation";
import Registration from "./routes/users/Registration";
import Login from "./routes/users/Login";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<BookingConfirmation />}></Route>
					<Route path="/show_tours" element={<ShowTours />}></Route>
					<Route path="/register" element={<Registration />}></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
