import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowTours(props) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios.get('https://us-central1-server-less-355121.cloudfunctions.net/get-ticket-prices');
    setAvailablePlaces(response.data.data);
  }

  useEffect(() => {
    getData();
  }, [])

  const bookTicket = (item) => {
    navigate('/booking_confirmation', { state: { item } });
  }

  return (
    <div className="container mt-5">
      <h1 className='mb-3'>Available tour packages</h1>
      <div className="col-md-12 row mb-4">
        {
          availablePlaces.map((item, index) => {
            return (
              <div className="card col-md-3">
                <img className="card-img-top mt-2" src={item.image} alt={item.place} />
                <div className="card-body">
                  <h5 className="card-title">{item.place}</h5>
                  <p className="card-text">{item.description}</p>
                  <h5 className="card-title">Price : {item.price}$ - 7 days</h5>
                  <a href="#" onClick={(e) => bookTicket(item)} className="btn btn-primary">Book this place</a>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default ShowTours;