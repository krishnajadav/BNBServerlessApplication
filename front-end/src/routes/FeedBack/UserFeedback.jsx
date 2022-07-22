import { useState, useEffect } from 'react'

const UserFeedback = () => {


  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
   
    const getFeedback = async () => {
      const Feedbacklist = await getFeedbacks()
      setFeedback(Feedbacklist);
    }
    getFeedback()
  }, [])

 
  const getFeedbacks = async () => {
    const res = await fetch('https://4ucj1xcie9.execute-api.us-east-1.amazonaws.com/feedback', { "method": "GET" })
    const data = await res.json()
    //console.log(res);
    return data

  }



  return (
    <div  className="container mt-4">
    
      
        <table className="table table-bordered table-hover" >
          <thead class="table-success">
            <tr>
              <th>User Name</th>
              <th>Feedback</th>
              <th>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {feedback.length > 0 ? feedback.map((feedback) => (

              <tr>
                <td>{feedback.name}</td>
                <td>{feedback.feedback}</td>
                <td>{feedback.sentiment}</td>
              </tr>
            )) : <tr>
              <td colSpan="4">No Feedbacks</td>
            </tr>}
          </tbody>
        </table>
      
    </div>
  )
}

export default UserFeedback;
