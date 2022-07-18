import boto3
from flask import jsonify

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4QZGXCGCK",
                               aws_secret_access_key="YPF99cvDYR0dtvZOxc9Cz0x/SN02CC6HdOdPajjb",
                               aws_session_token="FwoGZXIvYXdzELf//////////wEaDCYT8an08YlyTwBpbyLAAVueK1Kuzpkihb03ZqTZjhY2rG0C++vABHZ7JkTKABvtdcjUmtdxkp3ffkO9B68ipr7MBB/nO2LUgzUb/LbY3LTlelI3UkpEA3eUsZbojtNEc9RpgYSAnqlNYBTu69wK5yaVrGUsnAeDJtkaxHK7lUBKhN8q6q1c7Fkm5mYeywAvU0gszrM0zZ++PbdRfchrBePn1/Xx3QzitUcgoZTb6L4H0LWJEMEiowi2QZyMCEfhfCWANXKQuxOLCmZfjFtDESja8tGWBjIto2+ofoZcCGTkZQolz/91CNDtJJiPEQ7LYtNVK0UZx3YUB/4CNtA7PtLtFyjp")
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
