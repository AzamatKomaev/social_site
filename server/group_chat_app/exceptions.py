from rest_framework.exceptions import APIException
from rest_framework import status


class ChatRequestAlreadyExists(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = {'message': 'A chat request to this user already exists.'}
    default_code = 'not_authenticated'


class ChatRequestDoesNotExist(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = {'message': 'A chat request to this user does not exist.'}

