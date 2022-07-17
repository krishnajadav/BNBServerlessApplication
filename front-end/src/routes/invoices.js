import axios from "axios";
import { useEffect, useState } from "react";

function Invoices(props) {

  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    const response = await axios.get(`https://k15skxig3b.execute-api.us-east-1.amazonaws.com/dev/getinvoices?id=${"manali.s0106@gmail.com"}`);
    setInvoices(response.data.invoices);
    console.log(response.data.invoices)
  }

  useEffect(() => {
    getInvoices();
  }, [])

  return (
    <div className="container mt-5">
      <h1 className="text-center">My Bills</h1>
      <div className="row">
        <div className="col-md-12">
          {
            invoices.map((invoice, index) => {
              return (<div className="card mt-1">
                <div className="card-body">
                  <h5 className="card-title">Invoice #{index + 1}</h5>
                  <a href={invoice} target="_blank" className="btn btn-primary">View Invoice</a>
                </div>
              </div>)
            })
          }
        </div>
      </div>
    </div>

  )
}

export default Invoices;