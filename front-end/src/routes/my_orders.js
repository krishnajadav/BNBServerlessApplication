import axios from "axios"
import { useEffect, useState } from "react"

function MyOrders(props) {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await axios.get("https://get-order-2ipzjcv5.uc.gateway.dev/get-order?orderPlacedBy=manali.s0106@gmail.com");
    setOrders(response.data.orders);
    console.log(response.data.orders);
  }


  useEffect(() => {
    getOrders();
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