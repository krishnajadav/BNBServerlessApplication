import boto3
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4Q2CV3W7Y",
                               aws_secret_access_key="aFJY0WbrIBgPPL6xtO3+v/xLPuzsKBoHbRmq+qbh",
                               aws_session_token="FwoGZXIvYXdzEGsaDF/AFBek8uwlShAhZiLAASmLnzinTEPr+H3GmOnijzW7Zj1WKvLLBj3eqh0sqy6v1xM4q02x95aQBDIF8MA6zybnGqkYl/bXMYZUAQOd6tY2Pd+RXflo5dfw9VE3Nn8mjZKJL+0/Ej4/aG0NtTpnlQ19QETg/wwbW68SscKrBzgeYHXubJgn03tjDzPE/PuPGez/FsTHe/etHZAVFJABUJLwL5cTk9fvql4nFN7s+0qOce/dHpiVjge2QA0/cNaieIJpUs5h2gfJK61sL9st2yjjh4mWBjItIOC0Il218NogwF+zqaQ6miKCYTxgvIUFDwRnEv1yessmJydVVdaZxS07bFO9"
                               )
TOUR_DETAILS_TABLE_NAME = 'tour-details'

def addCors(response, code=200):
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
          "price": item["price"]["N"],
          "description": item["description"]["S"],
          "image": item["image"]["S"]
        })

    return addCors(jsonify({
        "success": True,
        "data": data
    }))