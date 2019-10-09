import functools
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

from config import errors
from utils.common import StructuredResponse


def exception_handler_wrapper(function):
    """
    A decorator that wraps the passed in function and handle logs
    """

    @functools.wraps(function)
    def wrapper(*args, **kwargs):
        try:
            return function(*args, **kwargs)
        except ObjectDoesNotExist as e:
            return StructuredResponse(
                None, status.HTTP_404_NOT_FOUND, errors.NOT_FOUND_4040,
                {errors.NOT_FOUND_TITLE: str(e)}
            )
        except Exception as e:
            return StructuredResponse(
                None,
                status.HTTP_500_INTERNAL_SERVER_ERROR,
                errors.INTERNAL_SERVER_ERROR_5000,
                {errors.INTERNAL_SERVER_ERROR_TITLE: str(e)},
            )

    return wrapper
