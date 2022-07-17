import axios from "axios"
import { useEffect, useState } from "react"

function Kitchen(Props) {

  const [menu, setMenu] = useState([])
  const [order, setOrder] = useState([])

  const getMenu = async () => {
    const response = await axios.get('https://getmenunew-2ipzjcv5.ue.gateway.dev/get-breakfast-menu')
    setMenu(response.data.menu)
  }

  useEffect(() => {
    getMenu();
  }, [])

  const addToOrder = (item) => {
    const hasItem = order.find(i => i.name === item.name)
    if (hasItem) {
      setOrder(order.map(i => {
        if (i.name === item.name) {
          i.quantity += 1
        }
        return i
      }
      ))
    }
    else {
      setOrder([...order, { ...item, quantity: 1 }])
    }
  }

  const remoteItemFromOrder = (item) => {
    setOrder(order.filter(i => i.name !== item.name))
  }

  const placeOrder = async () => {
    const response = await axios.post('https://addordersnew-2ipzjcv5.ue.gateway.dev/place-order', {
      orderItems: order,
      "orderPlaceBy": "manali.s0106@gmail.com",
      "firstName": "Manali",
      "lastName": "Shah",
      "total": order.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    })
    console.log(response.data)
    // clear order
    setOrder([])
  }

  return (
    <div className="container">
      <h1 className="text-center mt-2">Kitchen</h1>
      <div className="row">
        {
          menu.map((item, index) => {
            return (
              <div className="col-md-4">
                <div className="card">
                  <img className="card-img-top" src={item.image} alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.price}$</p>
                    <button className="btn btn-primary" onClick={() => {
                      addToOrder(item)
                    }
                    }>Add to order</button>
                  </div>
                </div>
              </div>
            ) // end of return
          }
          ) // end of map
        }
      </div>
      <div>
        <h1 className="text-center mt-2">Order</h1>
        <div className="row">
          {
            order.map((item, index) => {
              return (
                <div className="col-md-4">
                  <div className="card">
                    <img className="card-img-top" src={item.image} alt={item.name} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Price : {item.price}$</p>
                      <p className="card-text">quantity: {item.quantity}</p>
                      <button className="btn btn-danger" onClick={() => {
                        remoteItemFromOrder(item)
                      }
                      }>Remove</button>
                    </div>
                  </div>
                </div>
              )
            }
            )
          }
        </div>
      </div>
      <div className="mt-5">
        <button className="btn btn-primary" onClick={(e) => placeOrder()} >Place Order</button>
      </div>
    </div>
  )
}

export default Kitchen;