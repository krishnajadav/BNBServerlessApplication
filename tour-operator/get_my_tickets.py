import boto3
from boto3.dynamodb.conditions import Key
from flask import jsonify

dynamodb_client = boto3.resource('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4TDE7QFEU",
                               aws_secret_access_key="xDioLpjb52sOl6lh/cBEbNivs5bZ5x1IS2a/mHGZ",
                               aws_session_token="FwoGZXIvYXdzELv//////////wEaDFNX+6UPR7NwPztFqSLAAe2rHFzaRX0rB+NOwDjqthqksOMUObPywHar4qWnj1gfC2+rCAh437WpL0irGFgy0JPX9QiSrXxZfVqyzSHb/9Jw5NNbMjLa+Qqbj7vVko630mtAp8qsOxYqz8hwzc9ORRwbksu2A3evBhp+0z4ch4Yo5Af4mnywhh7DvI7hyFTVixq7FecXI7GJgo1IldlGj/qwzdD/TEj9FkRcn6PhwXX3VdIUWP8v7II3JEgNhniWrAQw9mAQcggB/HJnXBCvjSiO79KWBjIt3pRHy1AQZo7hiw6zdwtywVPmqCbYmIBn9xe4ZXwFoqhwRHY7/osX7qIcrlNY"
                               )

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
