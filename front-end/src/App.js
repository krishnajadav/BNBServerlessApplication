import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowTours from "./routes/show_tours";
import BookingConfirmation from "./routes/booking_confirmation";
import Home from "./routes/home";
import Kitchen from "./routes/kitchen";
import Invoices from "./routes/invoices";
import MyOrders from "./routes/my_orders";
import Registration from "./routes/users/Registration";
import Login from "./routes/users/Login";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/book_tour" element={<BookingConfirmation />}></Route>
					<Route path="/show_tours" element={<ShowTours />}></Route>
					<Route path="/kitchen" element={<Kitchen />}></Route>
					<Route path="/invoices" element={<Invoices />}></Route>
					<Route path="/my_orders" element={<MyOrders />}></Route>
					<Route path="/register" element={<Registration />}></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
