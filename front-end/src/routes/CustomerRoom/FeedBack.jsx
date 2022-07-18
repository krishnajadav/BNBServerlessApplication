import axios from "axios";
import { useState, useEffect } from 'react'


export default function Feedback() {

    const initialValues = { feedback: "" };
    const [formValue, setFormValue] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("form values = " + formValue.feedback);

        const feedback_data = {
            "feedback": formValue.feedback
        }

        axios.post('https://us-central1-central-archery-275005.cloudfunctions.net/sentimentanalysis', feedback_data, {

        })
            .then(response => {
                let feedtype = "hie"
                console.log(response);
                if (response.status === 200) {
                    // console.log(response.data.status);
                    // console.log(response.data);
                    if (response.data > 0) {
                        feedtype = "Positive";
                    }
                    else if (response.data < 0) {
                        feedtype = "Negative";
                    }
                    else {
                        feedtype = "Neutral";
                    }
                }
                var random_id = Math.floor(Math.random() * 1000);
                random_id = random_id.toString();

                const form_data = {
                    "id": random_id,
                    "name": "dharmay",
                    "email": "dharmay@sureja.com",
                    "mobileno": "9409434188",
                    "feedback": formValue.feedback,
                    "sentiment": feedtype,
                };

                console.log(form_data);
                axios.put('https://4ucj1xcie9.execute-api.us-east-1.amazonaws.com/feedback', form_data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                    }
                })
                    .then(response => {

                        console.log(response);
                        if (response.status === 200) {
                            console.log(response.data.status);
                            // window.location.href = "/profilelist";
                            alert("Thank you for submitting Feedback")
                        }

                    }).catch(function (error) {
                        alert("Error submitting feedback");
                        console.log("Exception occured");
                        console.log(error);
                    });




            }).catch(function (error) {
                alert("Error submitting feedback");
                console.log("Exception occured");
                console.log(error);
            });

    };

    return (
        <div>
            <div class="container-sm" >
                <h1>Your feedback is important to us</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <br />
                        <label><b>
                            Feedback &nbsp; &nbsp;
                            <input type="text" name="feedback" value={formValue.feedback} onChange={handleChange} required /></b>
                        </label>
                    </div>
                    <div>
                        <br />
                        <input type="submit" className="btn btn-success" value="Submit" />
                    </div>
                </form>

            </div>

        </div>
    )


}