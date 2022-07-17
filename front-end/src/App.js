import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowTours from "./routes/tour/show_tours";
import BookingConfirmation from "./routes/tour/booking_confirmation";
import Home from "./routes/home";
import Kitchen from "./routes/kitchen/kitchen";
import Invoices from "./routes/kitchen/invoices";
import MyOrders from "./routes/kitchen/my_orders";
import Registration from "./routes/users/Registration";
import Login from "./routes/users/Login";
import ManageRoom from "./routes/AdminRoom/ManageRoom";
import SearchRoom from "./routes/CustomerRoom/SearchRoom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/book_tour" element={<BookingConfirmation />}></Route>
					<Route path="/show_tours" element={<ShowTours />}></Route>
					<Route path="/kitchen" element={<Kitchen />}></Route>
					<Route path="/invoices" element={<Invoices />}></Route>
					<Route path="/my_orders" element={<MyOrders />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/" element={<Registration />}></Route>
					<Route exact path="/manage_room" element={<ManageRoom/>}/>
          <Route exact path="/search_room" element={<SearchRoom/>}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
