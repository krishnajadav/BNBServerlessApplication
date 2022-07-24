import boto3
from boto3.dynamodb.conditions import Key
from flask import jsonify


dynamodb_client = boto3.resource('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4S2OSS6PW",
                               aws_secret_access_key="VDBXg3k2T3fYJ906Qncg9csDaS0JtTAO6gTSdxo5",
                               aws_session_token="FwoGZXIvYXdzEFwaDDnw5pwtC2btgLyjgyLAASoXJCcb36tx8v0dfdHJLe9txJrslFg6bphh8uNnZYXPAkBO0ybvIbX/36LtjNpQnz/2O7CRwIpm9s0AC0A+mGbT27/UcBVJMcJRUv+BRH/MHqCjB7s0A32c/wq5MVPF7UWtJxeRgEvf4ytaT7ILZhNyko5RJA2vRPcdE1si/ezNTP7pcVYrFfXR3KPE6kj/P9XsOHx1HWJwvLhpQDIY98yB7z8JAeleaO0OpBy9rWEXuCNiB32MofXH8Yd76GXk8ijsqPaWBjItNaxfjtY2njQk3RkdHzzlY6IG4h7NW65q8cveaFT2xvbzH9afO1n67vkk5u/6")

TOUR_DETAILS_TABLE_NAME = "tour-details"
TOUR_TICKETS_TABLE_NAME = "tour-tickets"


def addCors(response, code=200):
    headers = {'Access-Control-Allow-Origin': '*'}
    return (response, code, headers)


def function_handle(request):
    request_json = request
    user_id = request_json.args.get('user_id')

    if not user_id:
        return addCors(jsonify({
            "success": False
        }))

    table = dynamodb_client.Table(TOUR_TICKETS_TABLE_NAME)
    response = table.scan(
        FilterExpression=Key('user_id').eq(user_id),
    )

    return addCors(jsonify({"tickets": response['Items']}))
