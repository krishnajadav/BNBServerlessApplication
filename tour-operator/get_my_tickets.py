import boto3
from boto3.dynamodb.conditions import Key
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN43DJVOZZZ",
                               aws_secret_access_key="WAF+TvcYKukrhdJZDNCeaIt5LvxanUbfy8tB8RY/",
                               aws_session_token="FwoGZXIvYXdzEM7//////////wEaDF6PF5PJkESY9k5z/iLAAZ+FPv3YQaQle1mkEtwe5XLwWBq+2tHRygvp7UDDAruf79trhaMZyXsWqzsHU50l7VkrrsD/usozmpkBjWCMQuRJ5DZwkd6boa80impATVk25tlusG6drznjr3SelnSAlfc09nPEKPvfJk+LOzBt8B4rRpkBsD3MO6l6YwEpS6jKQ+aQSEdTdaGU7xvvXg/i7Jayv1PLn150/ANgndI7TFG7TsmZ7aXl4f+DSWM+/exJ5lUknPpNnfO4tqm08lCCYiiljdeWBjItdYw3gE/7lNogZ4wTIx6YU4BF1cS8GVN3fn6fF2bycanviHuLGQ9JojAluluE")

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
