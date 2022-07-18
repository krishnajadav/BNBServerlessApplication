import React from 'react'
import {useState,useEffect} from 'react'

function CustomerReservationList() {

    const [bookings,setbookings]=useState([])
    const [availablebookings,setavailablebookings]=useState([])
    const [rooms,setrooms]=useState([])

    useEffect(() => {
        getAllBookings();
        },[])
  
        const getAllBookings = async () => {

          const BookingList = await getBooking()
          var i = BookingList.length;
          while ( i --> 0 ) {
              BookingList[i].roomImageURL = "";
              BookingList[i].roomNo = "";
              if(BookingList[i].customerId="1")
              {
                  var c=availablebookings;
                  c.push(BookingList[i]);
                  setavailablebookings(c); 
              }
          }


          const RoomList = await getRoom()
          var j = RoomList.length;
          while ( j --> 0 ) {
            var roomID=RoomList[j].id;
            var k = availablebookings.length;
            while ( k --> 0 ) {
                if(availablebookings[k].roomId===roomID)
                {
                  availablebookings[k].roomNo=RoomList[j].roomNo;
                  availablebookings[k].roomImageURL=RoomList[j].roomImageURL;
                }
            }
          }
          setbookings(availablebookings);     
        }
        
    const getBooking = async () => {
        const res = await fetch('https://ni4d251mw1.execute-api.us-east-1.amazonaws.com/getRoomBooking',{"method": "GET"})
        const data = await res.json()  
        return data
      }

      const getRoom = async () => {
        const res = await fetch('https://pjwctivbz3.execute-api.us-east-1.amazonaws.com/getRoom',{"method": "GET"})
        const data = await res.json()  
        return data
      } 

  return (
    <div>

<table class="table table-bordered">
    <thead>
      <tr>
       <th>Room No</th>
        <th>From Date</th>
        <th>To Date</th>
        <th>No of Beds</th>
        <th>Room Price</th>
        <th>Image</th>
      </tr>
    </thead>
    <tbody>
    { bookings.map((book)=>(
    <tr>
    <td>{book.roomNo}</td>
    <td>{book.fromDate}</td>
    <td>{book.toDate}</td>
    <td>{book.noBeds}</td>
    <td>{book.roomPrice}</td>
    <td><img src={book.roomImageURL} style={{width: 100 + "px"}}/></td>
    </tr>
   ))}
    </tbody>
   </table>
    </div>
  )
}

export default CustomerReservationList