import boto3

dynamodb_client = boto3.client('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4XODUND7G",
                               aws_secret_access_key="Yc3DYxwf31UMuZjCFx8egw4OQrVopy5EyiqHKo7c",
                               aws_session_token="FwoGZXIvYXdzEFAaDHi/uJzdzIYV/8dbZiLAAQGYXlPsMaeLR/KFWHG+KzC6kKe7hppnrzYEdZompeag9wuX0ENtalNpTEX/R9T+BTXZaZtC65BvrVc7HyirRgrHIn5lWjaFNXxAeGHd3idmk5koq0H1n9doRWS6D/4zOfs3aYTzaqRpfiKrd9y0yaYR7M710wHiubZUR96D0jRmeaQipwadNp5SYt1M+KH+SAdxcgx05/vwz7f5yJlpYzPkcC9lOvLr0n2GjCUoTvbdO4B7zBCh/fvrkLTZZa2rJyiok4OWBjItONFIcuADCQQo2GEgPMerr7qOqAUqOxbDfBRwGYpizf5rBXVQ6Rllc4Bpy05S"
                               )
TOUR_DETAILS_TABLE_NAME = 'tour-details'


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
          "price": item["price"]["N"]
        })

    return {
        "success": True,
        "data": data
    }
