import boto3
import uuid

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4XODUND7G",
                               aws_secret_access_key="Yc3DYxwf31UMuZjCFx8egw4OQrVopy5EyiqHKo7c",
                               aws_session_token="FwoGZXIvYXdzEFAaDHi/uJzdzIYV/8dbZiLAAQGYXlPsMaeLR/KFWHG+KzC6kKe7hppnrzYEdZompeag9wuX0ENtalNpTEX/R9T+BTXZaZtC65BvrVc7HyirRgrHIn5lWjaFNXxAeGHd3idmk5koq0H1n9doRWS6D/4zOfs3aYTzaqRpfiKrd9y0yaYR7M710wHiubZUR96D0jRmeaQipwadNp5SYt1M+KH+SAdxcgx05/vwz7f5yJlpYzPkcC9lOvLr0n2GjCUoTvbdO4B7zBCh/fvrkLTZZa2rJyiok4OWBjItONFIcuADCQQo2GEgPMerr7qOqAUqOxbDfBRwGYpizf5rBXVQ6Rllc4Bpy05S"
                               )
TOUR_DETAILS_TABLE_NAME = "tour-details"
TOUR_TICKETS_TABLE_NAME = "tour-tickets"


def function_handle(request):
    request_json = request.get_json()
    user_id = request_json.get('user_id')
    place = request_json.get('place')

    if not user_id or not place:
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
                             'price': {'N': ticket_price},
                             'place': {'S': place}
                             })

    return {
        "success": True
    }

# place_details = dynamodb_client.get_item(TableName=TOUR_DETAILS_TABLE_NAME,
#                                             Key={'place': {'S': str('halifax')}})

# print(place_details)
