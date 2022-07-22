import boto3
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4SALQXZHF",
                               aws_secret_access_key="2jLWbghe+KSbjbI3EFOjDBDNCsFWgGWs60TAmuNi",
                               aws_session_token="FwoGZXIvYXdzEC4aDDdC3M+YKX6n28hcBSLAAS2zi2kb3sMdmG/Ik7eN0JT+u4LmtxclkcSkQCwpRi0KMse6kCBIkVS5GNPQ/8Rhbd9vZwQ+KV1DqHlp+PGj8HLcPoNzKSTJK2hWWfRp0lx9pVMYz41MlGjxIZk0defH46w8zg0V1zydaBEHrxKBeO2pKsLEpAyvTINyY6daEuaDo8L4Q3CdI5yM4r9FtcLvoygIiVtwDkU/sbgE6URAvwTLVC77kEXPmqyQHIzR8SX0Ms35v45ysSSUHhdhlJtDaiiEkuyWBjItmE245BEBmyNxdD9mFe7xlwCFQjxoUWal33RbhMQDzgGrqExD3HRnOiJAyNGM")

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
