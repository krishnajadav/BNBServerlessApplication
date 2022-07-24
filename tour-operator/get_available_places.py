import boto3
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4QBDGKQ6A",
                               aws_secret_access_key="1tDeNICiSAN+rgE4Em+UK0NBcH/L0V7aRSelWVWv",
                               aws_session_token="FwoGZXIvYXdzEEUaDCM4xMOf50O7Ka+NOyLAAQmOC91N3fgao9J4eXIZWI3z5LJZX0Nd8K3p3ySdH9p4zeJ8uIZui8R3NHN8UUJdntUatbAFP/Iz0O1yqQCF4jC7wPHYfcNBPemW7q2AswvJTeyC+nSxYiXEd/n6N4EtGgFkiIRRsI6yA9MOW3Lof6J/Kpx+h47AXL0wNS6090EPiRfSGZZCMDTxxz8smjf89crPcahmTrlH0sSv6oS3Pw958AsTIDRP+MKUjRCpRA3u4tMnUTdez7UFdDX5gae5OCjUjPGWBjItLMqM2tdP+oW5VbV0PL+tGnaQM8f9+xC13gnOKEw1eASF6ETqwbqjoLDmVhRI")

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
