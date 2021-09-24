import jwt
import math
from datetime import datetime
from .models import Token
from django.conf import settings


def get_exp_time(time):
    return math.floor(datetime.today().timestamp()) + time


def create_token(payload):
    payload['exp'] = get_exp_time(24*60*60)
    return jwt.encode(payload, settings.TOKEN_SECRET)


def retrieve_payload(token):
    # try:
    payload = jwt.decode(jwt=token, key=settings.TOKEN_SECRET, algorithms=["HS256"])
    print('retrieve payload = ', payload)
    return payload
    # except:
    #     print('could not retrieve payload')
    #     return None


def get_token(token):
    try:
        token = Token.objects.filter(token=token)
        len = token.__len__()
        print(len)
        if len > 0:
            # print('get_token = ',token)
            return token
        else:
            # print('no token found')
            return None
    except:
        return None

def save_token(user, token):
    # if the same token does not already exist
    if get_token(token) is None:
        token_entry = Token(
            user_id = user,
            token = token,
            created_at = datetime.now()
        )
        token_entry.save()
    else:
        print('token already exists')

def remove_token(token):
    try:
        Token.objects.filter(token=token).delete()
        return True
    except:
        return False
        