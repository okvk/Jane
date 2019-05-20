import functools
from django.core.exceptions import PermissionDenied
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import status
from rest_framework.response import Response
from utils.common import ResponseObject


def exception_handler_wrapper(function):
    """
    A decorator that wraps the passed in function and handle logs 
    """

    @functools.wraps(function)
    def wrap(*args, **kwargs):
        try:
            return function(*args, **kwargs)
        except ObjectDoesNotExist as e:
            msg = "Exception404: {0} ".format(e)
            return ResponseObject(
                None, status.HTTP_400_BAD_REQUEST, {"non_field_errors": msg}
            )
        except Exception as e:
            msg = "Server Error: {0} ".format(e)
            return ResponseObject(
                None, status.HTTP_500_INTERNAL_SERVER_ERROR, {"non_field_errors": msg}
            )

    return wrap


# Common wrapper for http response data
def construct_response(function):
    @functools.wraps(function)
    def wrap(self, *args, **kwargs):
        obj = function(self, *args, **kwargs)
        return Response(obj.serialize(), status=obj.status)

    return wrap
