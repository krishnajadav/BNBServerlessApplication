import boto3
from boto3.dynamodb.conditions import Key
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

    if not user_id:
        return {
            "success": False
        }

    table = dynamodb_client.Table(TOUR_TICKETS_TABLE_NAME)
    response = table.scan(
        FilterExpression=Key('user_id').eq(user_id),
    )

    return addCors(jsonify({"tickets": response['Items']}))
