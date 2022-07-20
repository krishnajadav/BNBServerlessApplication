import axios from "axios";
import { useEffect, useState } from "react";

function MyTickets(props) {

  const [tickets, setTickets] = useState([]);

  const getTickts = async () => {
    const response = await axios.get(`https://us-central1-peak-service-312506.cloudfunctions.net/get_my_tickets?user_id=deep`);
    setTickets(response.data.tickets);
  }

  useEffect(() => {
    getTickts();
  }, [])


  return (
    <div>
      <h1>My Tickets</h1>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket => (
                  <tr key={ticket.id}>
                    <td>{ticket.place}</td>
                    <td>{ticket.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyTickets;