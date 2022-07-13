import axios from "axios";
import {useState} from "react";

export default function User ()  {

    const initialValues = { feedback:""};
    const [formValue, setFormValue] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

            console.log("form values = "+formValue.feedback);
            const form_data = {
                "id":"2",
                "name":"dharmay",
                "email":"dharmay@sureja.com",
                "mobileno":"9409434188",
                "feedback": formValue.feedback,

            };

            console.log(form_data);
            axios.put('https://4ucj1xcie9.execute-api.us-east-1.amazonaws.com/feedback',form_data,{headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
                }})
                .then(response => {

                    console.log(response);
                    if (response.status === 200) {
                        console.log(response.data.status);
                       // window.location.href = "/profilelist";
                        alert("Feedback submitted successfully")
                    }

                }).catch(function (error) {
                alert("Error submitting feedback");
                console.log("Exception occured");
                console.log(error);
            });

    };

    return(

        <div>
        <form  onSubmit={handleSubmit}>
            <label>
                Your feedback :
                <input type="text" name="feedback" value={formValue.feedback} onChange={handleChange} required/>
            </label>
            <input type="submit" value="Submit" />
        </form>

        </div>
    );
}