import axios from "axios"
import { useEffect, useState } from "react"

function MyOrders(props) {
  const [orders, setOrders] = useState([]);

  const getOrders = async (email) => {
    const response = await axios.get(`https://get-order-2ipzjcv5.uc.gateway.dev/get-order?orderPlacedBy=${email}`);
    setOrders(response.data.orders);
    console.log(response.data.orders);
  }


  useEffect(() => {
    let user = localStorage.getItem("user");

    if (!user) {
      alert('Please login to view your tickets');
      return;
    }
    user = JSON.parse(user);

    getOrders(user.email);
  }, []);


  return (
    <div className="container mt-5">
      <h1 className="text-center">My Orders</h1>
      <div className="row">
        <div className="col-md-12">
          {
            orders.map((order, index) => {
              return (
                <div className="card mt-1">
                  <div className="card-body">
                    <h5 className="card-title">Order #{index + 1}</h5>
                    <p className="card-text">
                      <strong>Order Placed By:</strong> {order.orderPlacedBy}<br />
                      <strong>Order Placed On:</strong> {order.orderPlacesTime}<br />
                      <strong>Order Placed On:</strong> {order.orderReadyTime}<br />
                      <strong>Order Total:</strong> {order.total}<br />
                      <strong>Order Items:</strong>
                      {
                        order.order.map((item, index) => {
                          return (
                            <div>
                              <p>{item.name} - {item.quantity}</p>
                            </div>
                          )
                        }
                        )
                      }
                    </p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MyOrders;