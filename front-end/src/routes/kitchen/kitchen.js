import axios from "axios"
import { useEffect, useState } from "react"

function Kitchen(Props) {

  const [menu, setMenu] = useState([])
  const [order, setOrder] = useState([])
  const [images, setImages] = useState({});

  const getMenu = async () => {
    const response = await axios.get('https://getmenunew-2ipzjcv5.ue.gateway.dev/get-breakfast-menu')
    setMenu(response.data.menu)
    getItemImage(menu)
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
    let user = localStorage.getItem("user");

    if (!user) {
      alert('Please login to view your tickets');
      return;
    }
    user = JSON.parse(user);

    const response = await axios.post('https://addordersnew-2ipzjcv5.ue.gateway.dev/place-order', {
      orderItems: order,
      "orderPlaceBy": user.email,
      "firstName": user.displayName,
      "lastName": "",
      "total": order.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    })
    alert(`Order placed successfully`)
    // clear order
    setOrder([])
  }

  const getItemImage = async (menu) => {
    let temp = {}
    console.log(menu)
    for (let i = 0; i < menu.length; i++) {
      const response = await axios.get(`https://4obu5002e0.execute-api.us-east-1.amazonaws.com/dev/getitemimg?id=${menu[i].id}`)
      temp[menu[i].id] = response.data.url;
    }
    console.log(temp)
    setImages(temp)
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
                  <img className="card-img-top" src={images[item.id]} alt={item.name} />
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
      {order.length > 0 &&
        <div className="mt-5">
          <button className="btn btn-primary" onClick={(e) => placeOrder()} >Place Order</button>
        </div>}
    </div>
  )
}

export default Kitchen;