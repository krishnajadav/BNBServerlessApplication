from datetime import date, datetime
import json
import boto3
import urllib3
import base64
client = boto3.client('dynamodb')

http = urllib3.PoolManager()


def lambda_handler(event, context):
    intent = (event['sessionState']['intent']['name'])

    user_email = (event['sessionState']['intent']['slots']
                  ['user_email']['value']['originalValue'])
    from_date = (event['sessionState']['intent']['slots']
                 ['from_date']['value']['originalValue'])
                 
    To_date = (event['sessionState']['intent']['slots']
               ['To_date']['value']['originalValue'])
    place = (event['sessionState']['intent']['slots']
             ['place']['value']['originalValue'])

    return book_tour(from_date, To_date, place, user_email)


def book_tour(from_date, To_date, place, user_email):
    try:
        from_date_obj = datetime.strptime(from_date, "%d-%m-%Y")
        to_date_obj = datetime.strptime(To_date, "%d-%m-%Y")
        days = (to_date_obj - from_date_obj).days

        predict_data = http.request(
            'GET', url=f"https://us-central1-peak-service-312506.cloudfunctions.net/predict-prices?place={place}&days={days}", headers={'Content-Type': 'application/json'})

        predict_data = predict_data.data
        scores = predict_data["scores"]
        index = scores[index(max(scores))]
        price = predict_data["price"][index]

        book_ticket = http.request(
            "GET", url=f"https://us-central1-peak-service-312506.cloudfunctions.net/create-ticket?place={place}&start_date={from_date}&end_date={To_date}&price={price}&user_id={user_email}")

        return {
            "messages": [
                {
                    "content": f"Ticket booked with price {price}",
                    "contentType": "PlainText"
                }
            ],
            "sessionState": {
                "dialogAction": {
                    "type": "Close"
                },
                "intent": {
                    "name": "kitchen",
                    "state": "Fulfilled",
                    "confirmationState": "None"
                }
            }
        }

    except Exception as e:
        print(e)
        return {
            "messages": [
                {
                    "content": "Something went wrong ! Please provide valid details",
                    "contentType": "PlainText"
                }
            ],
            "sessionState": {
                "dialogAction": {
                    "type": "Close"
                },
                "intent": {
                    "name": "kitchen",
                    "state": "Fulfilled",
                    "confirmationState": "None"
                }
            }
        }
