import {useState,useEffect} from 'react'

const SearchRoom = () => {

    const [toDate,settoDate]=useState('')
    const [noBeds,setnoBeds]=useState('')
    const [fromDate,setfromDate]=useState('')
    const [rooms,setrooms]=useState([])
    const [bookings,setbookings]=useState([])
    const [availableRooms,setavailableRooms]=useState([])
    const [state,setstate]=useState('none')
    const [bookingTotal,setbookingTotal]=useState(0)
    const [, updateState]=useState(); 

    useEffect(() => {
      resetRooms();
      },[])

      const resetRooms = async () => {
        const RoomList = await getRoom()
        RoomList.forEach(function (room) {
            room.isAvailable = true;
        });
        setrooms(RoomList)
        const BookingList = await getBooking()
        setbookings(BookingList)
        setbookingTotal(BookingList.length);
        setstate('none');
        settoDate('');
        setnoBeds('');
        setfromDate('');
      }

      const getRoom = async () => {
        const res = await fetch('https://pjwctivbz3.execute-api.us-east-1.amazonaws.com/getRoom',{"method": "GET"})
        const data = await res.json()  
        return data
      }  

      const getBooking = async () => {
        const res = await fetch('https://ni4d251mw1.execute-api.us-east-1.amazonaws.com/getRoomBooking',{"method": "GET"})
        const data = await res.json()  
        return data
      }
      
      const addRoomBooking = async (roomAdd) => {
        const res = await fetch('https://ni4d251mw1.execute-api.us-east-1.amazonaws.com/addRoomBooking',{"method": "POST",
        "body": JSON.stringify({
          "id" :roomAdd.id.toString(),
          "toDate" :roomAdd.toDate,
          "fromDate" :roomAdd.fromDate,
          "noBeds" :roomAdd.noBeds,
          "roomPrice" :roomAdd.roomPrice.toString(),
          "roomId":roomAdd.roomId,
          "customerId":roomAdd.customerId
        })})
        const data = await res.json()  
        return data
      } 

      const getTotalDays = (fromDate,toDate) => {
        var date1 = new Date(fromDate);
        var date2 = new Date(toDate);              
        var Difference_In_Time = date2.getTime() - date1.getTime();
        return (Difference_In_Time / (1000 * 3600 * 24));
      }

    const onClick = (e) =>{
        e.preventDefault();
        if(toDate!==""&&noBeds!==""&&fromDate!=="")
        {
            var i = rooms.length;
            while ( i --> 0 ) {
                if(rooms[i].noBeds >= noBeds)
                {
                    var c=availableRooms;
                    c.push(rooms[i]);
                    setavailableRooms(c); 
                }
            }

            var j = availableRooms.length;
            while ( j --> 0 ) {

                var roomID=availableRooms[j].id;
                var k = bookings.length;
                while ( k --> 0 ) {
                    if(bookings[k].roomId===roomID&&bookings[k].fromDate===fromDate&&bookings[k].toDate===toDate)
                    {
                        availableRooms[j].isAvailable=false;
                        break;
                    }
                    else if(bookings[k].roomId!==roomID&&bookings[k].fromDate!==fromDate&&bookings[k].toDate!==toDate)
                    {
                        availableRooms[j].isAvailable=true;
                    }
                }
            }
            debugger;
            setrooms(availableRooms);
            setstate('block');
            setavailableRooms([]);
            updateState({});
        }
        else
        {
            setstate('none');
            alert("Enter valid details")
        }      
    }

    const onBookClick =  (room) =>{
        return async function () {
        var totalRoomPrice=getTotalDays(fromDate,toDate) * room.roomPrice;
        await addRoomBooking({id:bookingTotal+1,toDate:toDate,fromDate:fromDate,noBeds:noBeds,roomPrice:totalRoomPrice,roomId:room.id,customerId:"1"});
        alert("Room Booked Successfully");
        resetRooms();
       }     
    }

  return (
      <div>
    <div className="row">
    <div className='col-md-6'>
    <div class="form-group">
        <label>From Date:</label>
        <input type="date" class="form-control" id="fromDate" placeholder="fromDate" value={fromDate} onChange={(e)=>setfromDate(e.target.value)}/>
    </div>
    <div class="form-group">
        <label>To Date:</label>
        <input type="date" class="form-control" id="toDate" placeholder="toDate" value={toDate} onChange={(e)=>settoDate(e.target.value)}/>
    </div>
    <div class="form-group">
        <label>No of Beds:</label>
        <input type="text" class="form-control" id="noBeds" placeholder="No of Beds" value={noBeds} onChange={(e)=>{
             const regularExpression = /^[+-]?([1-9]+\.?[0-9]*|\.[0-9]+)*$/
             if (regularExpression.test(e.target.value))
             {
                setnoBeds(e.target.value)
             }
            }}/>
    </div>
        <input type='submit' onClick={onClick} className="btn btn-success" style={{"marginRight": "5px"}} value="Search"/>
        <button className='btn btn-primary' onClick={resetRooms}>Clear</button>
    </div></div>
    <br></br>

  { rooms.map((room)=>(
    <div class="card" style={{display: room.isAvailable ? "inline-block" : "none",width: 300 + "px",marginRight: 20 + "px",marginBottom: 20 + "px"}}>
    <img class="card-img-top" src={room.roomImageURL} alt="Card" style={{width: 300 + "px"}}/>
    <div class="card-body">
    <h4 class="card-title">${room.roomPrice}</h4>
    <p class="card-text">Room No: {room.roomNo}</p>
    <p class="card-text">Number of beds in room: {room.noBeds}</p>
    <p class="card-text">{room.roomAmenity}</p>
    <a class="btn btn-primary" style={{display:state}} onClick={onBookClick(room)}>Book</a>
    </div>
    </div>
            ))}

        </div>
  )
}

export default SearchRoom