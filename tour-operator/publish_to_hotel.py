import base64
import json
import boto3

SNS_ARN = "arn:aws:sns:us-east-1:107150785401:Customer-request"
sns_client = boto3.client('sns',
                          region_name='us-east-1',
                          aws_access_key_id="ASIARR4VPHN4S2OSS6PW",
                          aws_secret_access_key="VDBXg3k2T3fYJ906Qncg9csDaS0JtTAO6gTSdxo5",
                          aws_session_token="FwoGZXIvYXdzEFwaDDnw5pwtC2btgLyjgyLAASoXJCcb36tx8v0dfdHJLe9txJrslFg6bphh8uNnZYXPAkBO0ybvIbX/36LtjNpQnz/2O7CRwIpm9s0AC0A+mGbT27/UcBVJMcJRUv+BRH/MHqCjB7s0A32c/wq5MVPF7UWtJxeRgEvf4ytaT7ILZhNyko5RJA2vRPcdE1si/ezNTP7pcVYrFfXR3KPE6kj/P9XsOHx1HWJwvLhpQDIY98yB7z8JAeleaO0OpBy9rWEXuCNiB32MofXH8Yd76GXk8ijsqPaWBjItNaxfjtY2njQk3RkdHzzlY6IG4h7NW65q8cveaFT2xvbzH9afO1n67vkk5u/6")


def hello_pubsub(event, context):
    """Triggered from a message on a Cloud Pub/Sub topic.
    Args:
    event (dict): Event payload.
    context (google.cloud.functions.Context): Metadata for the event.
    """

    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    data = json.loads(pubsub_message)
    print(data)
    user_id = data["user_id"]["S"]
    ticket_id = data["ticket_id"]["S"]
    price = data["price"]["N"]
    place = data["place"]["S"]
    start_date = data["start_date"]["S"]
    end_date = data["end_date"]["S"]

    msg = """
    New Tour booking request from customer.
    ------------------------------------------------------------------------------------
    {a:<20}    :   {user_id}
    {b:<20}    :   {ticket_id}
    {c:<20}    :   {price}
    {d:<20}    :   {place}
    {e:<20}    :   {start_date}
    {f:<20}    :   {end_date}
    ------------------------------------------------------------------------------------
    """.format(a='User', b='ticket id', c='Price', d="Place", e="Start date",
               f="End date", user_id=user_id, ticket_id=ticket_id,
               price=price, place=place, start_date=start_date,
               end_date=end_date)

    sns_client.publish(
        TopicArn=SNS_ARN,
        Message=msg,
        Subject="Hello! New Tour from customer"
    )

    print("Message sent")
