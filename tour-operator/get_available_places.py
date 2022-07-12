import boto3
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN45E45A3PR",
                               aws_secret_access_key="pZbX+ueHFYyNUFh8IW/5pEKoqvDaVuvNursRLEHG",
                               aws_session_token="FwoGZXIvYXdzEDgaDON3OV/QVDi5k6xV9iLAAXwsXO2B5yPn0pKuy1NT51CCffQ8gTD1Xd1h4aW6qEHuLNJPXmB+YjMAnczhnvFstDQcnkYgGo2EhzJAawUhqQ0JKZrq/AnzIGI0yCv9a7cIMj0MMRwhxOQTPTps+jGYM9fVwhZ6hUv5Eu/iMIPrZ2D8Qysfex+6/TI6ADBKedtbicfVbVyKnED47zICwLVsBuG84j+TwZq6oCFQk3oXbfg9sk0GPr5u8bPwK3kdSnuNECeZn2szZZK4HVkrmOAplSiTlraWBjItYt69MRdP3BWLLWccKN5uqPMpOHYkaeDONKD1ezcbw47RURzBETuWQnku7Bgp"
                               )
TOUR_DETAILS_TABLE_NAME = 'tour-details'


def add_cors(response, code=200):
    headers = {'Access-Control-Allow-Origin': '*'}
    return (response, code, headers)


def scan_table():
    """
    Generates all the items in a DynamoDB table.
    """

    paginator = dynamodb_client.get_paginator("scan")

    for page in paginator.paginate(TableName=TOUR_DETAILS_TABLE_NAME):
        yield from page["Items"]


def function_handle(request):
    request_json = request.get_json()
    print(request_json)
    data = []

    for item in scan_table():
        data.append({
            "place": item["place"]["S"],
            "description": item["description"]["S"],
            "image": item["image"]["S"]
        })

    return add_cors(jsonify({
        "success": True,
        "data": data
    }))
