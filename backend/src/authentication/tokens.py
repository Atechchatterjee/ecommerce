import jwt
import math
from datetime import datetime
from .models import Token, AdminToken
from django.conf import settings


def get_exp_time(time):
    return math.floor(datetime.today().timestamp()) + time


def create_token(payload):
    payload['exp'] = get_exp_time(24*60*60)
    return jwt.encode(payload, settings.TOKEN_SECRET)


# cannot retrieve payload if the token has expired
def retrieve_payload(token):
    try:
        payload = jwt.decode(
            jwt=token, key=settings.TOKEN_SECRET, algorithms=["HS256"])
        print('retrieve payload = ', payload)
        return payload
    except:
        print('could not retrieve payload')
        return None


# getting the token object from the db given the token
def get_token(token, admin=False):
    TokenObj = Token if admin == False else AdminToken

    try:
        token = TokenObj.objects.filter(token=token)
        len = token.__len__()
        print(len)
        if len > 0:
            return token
        else:
            return None
    except:
        return None


def save_token(user, token, admin=False):
    TokenObj = Token if admin is False else AdminToken

    # if the same token does not already exist
    if get_token(token, admin) is None:
        token_entry = TokenObj(
            user_id=user,
            token=token,
            created_at=datetime.now()
        )
        token_entry.save()
    else:
        print('token already exists')


# removes all the entries with the same token
def remove_token(token, admin=False):
    TokenObj = Token if admin is False else AdminToken

    try:
        TokenObj.objects.filter(token=token).delete()
        return True
    except:
        return False
