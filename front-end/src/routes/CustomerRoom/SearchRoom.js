import {useState} from 'react'

const SearchRoom = () => {

    const [toDate,settoDate]=useState('')
    const [noBeds,setnoBeds]=useState('')
    const [fromDate,setfromDate]=useState('')
    const [rooms,setrooms]=useState([
        {
            "id":"1",
            "roomAmenity":"dasd",
            "roomPrice":"4324",
            "imageURL":"https://empire-s3-production.bobvila.com/pages/538/original/Bedroom.jpg"
        },
        {
            "id":"2",
            "roomAmenity":"dasd",
            "roomPrice":"4324",
            "imageURL":"https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg"
        },
        {
            "id":"3",
            "roomAmenity":"dasd",
            "roomPrice":"4324",
            "imageURL":"https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg"
        },
        {
            "id":"4",
            "roomAmenity":"dasd",
            "roomPrice":"4324",
            "imageURL":"https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg"
        },
    ])

    const onClick = (e) =>{
        e.preventDefault()
        if(toDate!==""&&noBeds!==""&&fromDate!=="")
        {

        }
        else
        {
            alert("Enter valid details")
        }      
    }

    const onBookClick = (room) =>{
        return function () {
          alert(room.id)
       }     
    }

  return (
      <div>
    <div className="row">
    <div className='col-md-6'>
    <div class="form-group">
        <label>From Date:</label>
        <input type="date" class="form-control" id="fromDate" placeholder="room No" value={fromDate} onChange={(e)=>setfromDate(e.target.value)}/>
    </div>
    <div class="form-group">
        <label>To Date:</label>
        <input type="date" class="form-control" id="toDate" placeholder="room Amenity" value={toDate} onChange={(e)=>settoDate(e.target.value)}/>
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
    </div></div>
    <br></br>

  { rooms.map((room)=>(
    <div class="card" style={{width: 300 + "px",display:"inline-block",marginRight: 20 + "px",marginBottom: 20 + "px"}}>
    <img class="card-img-top" src={room.imageURL} alt="Card image" style={{width: 300 + "px"}}/>
    <div class="card-body">
    <h4 class="card-title">${room.roomPrice}</h4>
    <p class="card-text">{room.roomAmenity}</p>
    <a href="#" class="btn btn-primary" onClick={onBookClick(room)}>Book</a>
    </div>
    </div>
            ))}

        </div>
  )
}

export default SearchRoom