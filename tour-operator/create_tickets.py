import boto3
import uuid
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4Q2CV3W7Y",
                               aws_secret_access_key="aFJY0WbrIBgPPL6xtO3+v/xLPuzsKBoHbRmq+qbh",
                               aws_session_token="FwoGZXIvYXdzEGsaDF/AFBek8uwlShAhZiLAASmLnzinTEPr+H3GmOnijzW7Zj1WKvLLBj3eqh0sqy6v1xM4q02x95aQBDIF8MA6zybnGqkYl/bXMYZUAQOd6tY2Pd+RXflo5dfw9VE3Nn8mjZKJL+0/Ej4/aG0NtTpnlQ19QETg/wwbW68SscKrBzgeYHXubJgn03tjDzPE/PuPGez/FsTHe/etHZAVFJABUJLwL5cTk9fvql4nFN7s+0qOce/dHpiVjge2QA0/cNaieIJpUs5h2gfJK61sL9st2yjjh4mWBjItIOC0Il218NogwF+zqaQ6miKCYTxgvIUFDwRnEv1yessmJydVVdaZxS07bFO9"
                               )
TOUR_DETAILS_TABLE_NAME = "tour-details"
TOUR_TICKETS_TABLE_NAME = "tour-tickets"

def addCors(response, code=200):
    headers = {'Access-Control-Allow-Origin': '*'}
    return (response, code, headers)

def function_handle(request):
    request_json = request.get_json()
    user_id = request_json.get('user_id')
    place = request_json.get('place')
    start_date = request_json.get('start_date')
    end_date = request_json.get('end_date')
    price = request_json.get('price')

    if not user_id or not place or not start_date or not end_date or not price:
        return {
            "success": False
        }

    place_details = dynamodb_client.get_item(TableName=TOUR_DETAILS_TABLE_NAME,
                                             Key={'place': {'S': str(place)}})

    if not len(place_details):
        return {
            "success": False,
            "message": "Requested place is not in our database"
        }

    ticket_id = str(uuid.uuid4())
    ticket_price = place_details['Item']["price"]["N"]

    dynamodb_client.put_item(TableName=TOUR_TICKETS_TABLE_NAME, Item={
                             'user_id': {'S': user_id},
                             'ticket_id': {'S': ticket_id},
                             'price': {'N': price},
                             'place': {'S': place},
                             'start_date': {"S": start_date},
                             'end_date': {"S": end_date}
                             })

    return addCors(jsonify({"Success": True}))
