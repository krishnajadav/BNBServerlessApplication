import boto3
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4S2OSS6PW",
                               aws_secret_access_key="VDBXg3k2T3fYJ906Qncg9csDaS0JtTAO6gTSdxo5",
                               aws_session_token="FwoGZXIvYXdzEFwaDDnw5pwtC2btgLyjgyLAASoXJCcb36tx8v0dfdHJLe9txJrslFg6bphh8uNnZYXPAkBO0ybvIbX/36LtjNpQnz/2O7CRwIpm9s0AC0A+mGbT27/UcBVJMcJRUv+BRH/MHqCjB7s0A32c/wq5MVPF7UWtJxeRgEvf4ytaT7ILZhNyko5RJA2vRPcdE1si/ezNTP7pcVYrFfXR3KPE6kj/P9XsOHx1HWJwvLhpQDIY98yB7z8JAeleaO0OpBy9rWEXuCNiB32MofXH8Yd76GXk8ijsqPaWBjItNaxfjtY2njQk3RkdHzzlY6IG4h7NW65q8cveaFT2xvbzH9afO1n67vkk5u/6")

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
