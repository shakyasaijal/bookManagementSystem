import jwt
import yaml
from books import models as book_models
from datetime import datetime, timedelta

credentials = yaml.load(open('credentials.yaml'), Loader=yaml.FullLoader)


def refresh_access_token(refresh_token):
    try:
        data = jwt.decode(refresh_token, credentials['jwt_secret'])
        current_user = book_models.User.objects.get(email=data['email'])
        exp = str(datetime.now() + timedelta(days=15))
        accessToken = jwt.encode(
            {'email': data['email'], 'expires': exp, 'scope': 'access'}, credentials['jwt_secret'], algorithm='HS256')
        return accessToken
    except (book_models.User.DoesNotExist, Exception) as e:
        print("Refreshing Access Token: ", e)

    return ''
