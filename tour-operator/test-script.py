import boto3
from boto3.dynamodb.conditions import Key

dynamodb_client = boto3.resource('dynamodb',
                                 region_name='us-east-1',
                                 aws_access_key_id="ASIARR4VPHN4XODUND7G",
                                 aws_secret_access_key="Yc3DYxwf31UMuZjCFx8egw4OQrVopy5EyiqHKo7c",
                                 aws_session_token="FwoGZXIvYXdzEFAaDHi/uJzdzIYV/8dbZiLAAQGYXlPsMaeLR/KFWHG+KzC6kKe7hppnrzYEdZompeag9wuX0ENtalNpTEX/R9T+BTXZaZtC65BvrVc7HyirRgrHIn5lWjaFNXxAeGHd3idmk5koq0H1n9doRWS6D/4zOfs3aYTzaqRpfiKrd9y0yaYR7M710wHiubZUR96D0jRmeaQipwadNp5SYt1M+KH+SAdxcgx05/vwz7f5yJlpYzPkcC9lOvLr0n2GjCUoTvbdO4B7zBCh/fvrkLTZZa2rJyiok4OWBjItONFIcuADCQQo2GEgPMerr7qOqAUqOxbDfBRwGYpizf5rBXVQ6Rllc4Bpy05S"
                                 )
TOUR_DETAILS_TABLE_NAME = "tour-details"
TOUR_TICKETS_TABLE_NAME = "tour-tickets"


table = dynamodb_client.Table(TOUR_TICKETS_TABLE_NAME)
response = table.scan(
    FilterExpression=Key('user_id').eq('deep'),
)

print(response)
