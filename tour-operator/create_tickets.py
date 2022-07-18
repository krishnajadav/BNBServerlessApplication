import boto3
import uuid
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4QZGXCGCK",
                               aws_secret_access_key="YPF99cvDYR0dtvZOxc9Cz0x/SN02CC6HdOdPajjb",
                               aws_session_token="FwoGZXIvYXdzELf//////////wEaDCYT8an08YlyTwBpbyLAAVueK1Kuzpkihb03ZqTZjhY2rG0C++vABHZ7JkTKABvtdcjUmtdxkp3ffkO9B68ipr7MBB/nO2LUgzUb/LbY3LTlelI3UkpEA3eUsZbojtNEc9RpgYSAnqlNYBTu69wK5yaVrGUsnAeDJtkaxHK7lUBKhN8q6q1c7Fkm5mYeywAvU0gszrM0zZ++PbdRfchrBePn1/Xx3QzitUcgoZTb6L4H0LWJEMEiowi2QZyMCEfhfCWANXKQuxOLCmZfjFtDESja8tGWBjIto2+ofoZcCGTkZQolz/91CNDtJJiPEQ7LYtNVK0UZx3YUB/4CNtA7PtLtFyjp")


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
        return add_cors(jsonify( {
            "success": False,
            "message": "Please pass all required params"
        }))

    place_details = dynamodb_client.get_item(TableName=TOUR_DETAILS_TABLE_NAME,
                                             Key={'place': {'S': str(place)}})

    if not len(place_details):
        add_cors(jsonify( {
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
