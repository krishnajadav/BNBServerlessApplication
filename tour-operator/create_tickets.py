import json
import boto3
import uuid
from flask import jsonify
from google.cloud import pubsub_v1


dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4S2OSS6PW",
                               aws_secret_access_key="VDBXg3k2T3fYJ906Qncg9csDaS0JtTAO6gTSdxo5",
                               aws_session_token="FwoGZXIvYXdzEFwaDDnw5pwtC2btgLyjgyLAASoXJCcb36tx8v0dfdHJLe9txJrslFg6bphh8uNnZYXPAkBO0ybvIbX/36LtjNpQnz/2O7CRwIpm9s0AC0A+mGbT27/UcBVJMcJRUv+BRH/MHqCjB7s0A32c/wq5MVPF7UWtJxeRgEvf4ytaT7ILZhNyko5RJA2vRPcdE1si/ezNTP7pcVYrFfXR3KPE6kj/P9XsOHx1HWJwvLhpQDIY98yB7z8JAeleaO0OpBy9rWEXuCNiB32MofXH8Yd76GXk8ijsqPaWBjItNaxfjtY2njQk3RkdHzzlY6IG4h7NW65q8cveaFT2xvbzH9afO1n67vkk5u/6")


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

    data = {
        'user_id': {'S': user_id},
        'ticket_id': {'S': ticket_id},
        'price': {'N': price},
        'place': {'S': place},
        'start_date': {"S": start_date},
        'end_date': {"S": end_date}
    }

    dynamodb_client.put_item(TableName=TOUR_TICKETS_TABLE_NAME, Item=data)
    publish_event(json.dumps(data))

    return add_cors(jsonify({"success": True}))


def publish_event(message):
    project_id = "peak-service-312506"
    topic_id = "ticket-create"

    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path(project_id, topic_id)

    future1 = publisher.publish(topic_path, message.encode("utf-8"))
    print(future1.result())
