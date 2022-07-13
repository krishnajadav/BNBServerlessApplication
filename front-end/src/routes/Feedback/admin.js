import {useState,useEffect}  from 'react'

export default function Admin () {
const [feedback,setFeedback]=useState([]);
useEffect(() => {
    const getFeedback = async () => {
        const Feedbacklist = await getFeedbacks()
        setFeedback(Feedbacklist);
    }
    getFeedback()
},[])

const getFeedbacks = async () => {
    const res = await fetch('https://4ucj1xcie9.execute-api.us-east-1.amazonaws.com/feedback',{"method": "GET"})
    const data = await res.json()
    //console.log(res);
    return data

}
    console.log("feed back len",feedback.length);
return(
    <table className="table table-bordered">
        <thead>
        <tr>
            <th>name</th>
            <th>Feedback</th>

        </tr>
        </thead>
        <tbody>
        {feedback.length > 0 ? feedback.map((feedback) => (
            // <ListRoom key={feedback.id} room={feedback} onEditroom={EditroomCallback} onDeleteroom={DeleteroomCallback}/>
            <tr>
                <td>{feedback.name}</td>
                <td>{feedback.feedback}</td>
            </tr>
        )) : <tr>
            <td colSpan="4">No rooms</td>
        </tr>}
        </tbody>
    </table>
);

}