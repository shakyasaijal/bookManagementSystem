import jwt
import yaml


credentials = yaml.load(open("credentials.yaml"), Loader=yaml.FullLoader)


"""
# Get email from access token
"""
def get_email(request):
    accessToken = request.META['HTTP_AUTHORIZATION'].split('BearerToken ')[1]
    decode_token = jwt.decode(accessToken, credentials['jwt_secret'])

    return decode_token['email']
