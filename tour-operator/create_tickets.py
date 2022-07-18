import boto3
import uuid
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN43DJVOZZZ",
                               aws_secret_access_key="WAF+TvcYKukrhdJZDNCeaIt5LvxanUbfy8tB8RY/",
                               aws_session_token="FwoGZXIvYXdzEM7//////////wEaDF6PF5PJkESY9k5z/iLAAZ+FPv3YQaQle1mkEtwe5XLwWBq+2tHRygvp7UDDAruf79trhaMZyXsWqzsHU50l7VkrrsD/usozmpkBjWCMQuRJ5DZwkd6boa80impATVk25tlusG6drznjr3SelnSAlfc09nPEKPvfJk+LOzBt8B4rRpkBsD3MO6l6YwEpS6jKQ+aQSEdTdaGU7xvvXg/i7Jayv1PLn150/ANgndI7TFG7TsmZ7aXl4f+DSWM+/exJ5lUknPpNnfO4tqm08lCCYiiljdeWBjItdYw3gE/7lNogZ4wTIx6YU4BF1cS8GVN3fn6fF2bycanviHuLGQ9JojAluluE")

TOUR_DETAILS_TABLE_NAME = "tour-details"
TOUR_TICKETS_TABLE_NAME = "tour-tickets"


def add_cors(response, code=200):
    headers = {'Access-Control-Allow-Origin': '*'}
    return (response, code, headers)


def function_handle(request):
    request_json = request
    user_id = request_json.args.get('user_id')
    place = request_json.args.get('place')
    start_date = request_json.args.get('start_date')
    end_date = request_json.args.get('end_date')
    price = request_json.args.get('price')

    if not user_id or not place or not start_date or not end_date or not price:
        return add_cors(jsonify({
            "success": False,
            "message": "Please pass all required params"
        }))

    place_details = dynamodb_client.get_item(TableName=TOUR_DETAILS_TABLE_NAME,
                                             Key={'place': {'S': str(place)}})

    if not len(place_details):
        add_cors(jsonify({
            "success": False,
            "message": "Requested place is not in our database"
        }))

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

    return add_cors(jsonify({"success": True}))
