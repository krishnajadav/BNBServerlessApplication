import boto3
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4YX4BGU77",
                               aws_secret_access_key="sCsZIbDKaf4XenBiKKlilZ57VdEl8qp9QdNySJcR",
                               aws_session_token="FwoGZXIvYXdzENb//////////wEaDNsyHhC1Y5nMjgYYmSLAAV1aodXh/OM2YCSymvLsYK3R6tzXKuFhr9VSJeMsIYC0brZR39t9Q9idmIdO4uB9t/tjmOM+IQC1U7w2ss6heYzdLleiagZBdRsfuQRaOgzmi97hv/CaeomYDmDbWLMZjkJ8VSgED/MH2DRLMozrL14jI2RUZepdC68+OIgvsVkocmqX3Th8fJBHKPqadsA0qHWveRmWSJEfMHQj+k6I9RnivB/Q4sX6+W6SUxNBxOPVCIerU7CnMucAp1xc9ha9TijM6diWBjIthZO2AttEIoo3q5l+uJ2DLRf4YPGgKxf/UxV3WEc/8Og0GCSNvK/TSQW95sNr")

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
