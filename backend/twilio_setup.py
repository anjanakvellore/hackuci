import json
from twilio.rest import Client

tp = json.load(open('twilio_private.json'))

# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = tp['account_sid']
auth_token = tp['auth_token']
client = Client(account_sid, auth_token)

def send_msg(body, to):
    message = client.messages \
                    .create(
                        body=body,
                        from_='+12533366168',
                        to=to
                    )