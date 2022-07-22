import boto3
from boto3.dynamodb.conditions import Key
from flask import jsonify


dynamodb_client = boto3.resource('dynamodb',
                               region_name='us-east-1',
                               aws_access_key_id="ASIARR4VPHN4SALQXZHF",
                               aws_secret_access_key="2jLWbghe+KSbjbI3EFOjDBDNCsFWgGWs60TAmuNi",
                               aws_session_token="FwoGZXIvYXdzEC4aDDdC3M+YKX6n28hcBSLAAS2zi2kb3sMdmG/Ik7eN0JT+u4LmtxclkcSkQCwpRi0KMse6kCBIkVS5GNPQ/8Rhbd9vZwQ+KV1DqHlp+PGj8HLcPoNzKSTJK2hWWfRp0lx9pVMYz41MlGjxIZk0defH46w8zg0V1zydaBEHrxKBeO2pKsLEpAyvTINyY6daEuaDo8L4Q3CdI5yM4r9FtcLvoygIiVtwDkU/sbgE6URAvwTLVC77kEXPmqyQHIzR8SX0Ms35v45ysSSUHhdhlJtDaiiEkuyWBjItmE245BEBmyNxdD9mFe7xlwCFQjxoUWal33RbhMQDzgGrqExD3HRnOiJAyNGM")

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
