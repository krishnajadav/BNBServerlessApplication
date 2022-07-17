import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from 'moment';
import axios from "axios";

function BookingConfirmation(props) {
  const [item, setItem] = useState({
    "description": "The Halifax Waterfront is a bustling hotspot in the city. With one of the world’s longest urban boardwalks spanning the length of the waterfront for 4 kilometres (2.5 miles), from Pier 21 at the Halifax Seaport to Casino Nova Scotia it is easy to spend a day exploring here.\n\n",
    "image": "https://www.novascotia.com/sites/default/files/styles/xlarge/public/2022-01/Halifax-Harbour-seadoos-1920x1080.jpg?itok=-TkIp0zK",
    "place": "halifax",
    "price": "1000"
  });
  const location = useLocation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [tourPrice, setTourPrice] = useState(1000);

  // useEffect(() => {
  //   setItem(location?.state?.item)
  // }, []);

  const confirmBooking = () => {

    if (!startDate || !endDate) {
      return;
    }

    var start = moment(startDate, "YYYY-MM-DD");
    var end = moment(endDate, "YYYY-MM-DD");

    //Difference in number of days
    var days = moment.duration(end.diff(start)).asDays();

    var newPrice = Math.floor((days * tourPrice) / 7)
    setTourPrice(newPrice)
    var data = {
      'place': item.place,
      'user_id': '',
      'days': days,
      'price': newPrice,
      'start_date': startDate,
      'end_date': endDate
    }
    console.log(data)
    // axios.post('',)
  }

  return (
    <div className="container text-center">
      <h1 className="mt-3">Confirm your booking</h1>
      <div className="card mt-4 col-md-8 mx-auto">
        <img className="card-img-top mt-2" src={item.image} alt={item.place} />
        <div className="card-body">
          <h5 className="card-title">{item.place}</h5>
          <p className="card-text">{item.description}</p>
          <h5 className="card-title">Price : {tourPrice}$</h5>

          <strong className="pull-left mt-3"><label className="pull-left mt-3">Start date</label></strong>
          <input onChange={(e) => setStartDate(e.target.value)} className="form-control" type="date"></input>

          <strong className="pull-left mt-3"><label className="mt-3">End date</label></strong>
          <input onChange={(e) => setEndDate(e.target.value)} min={startDate} className="form-control" type="date"></input>
          {
            startDate && endDate &&
            <a onClick={confirmBooking} className="btn btn-primary mt-4">Confirm</a>
          }
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation;