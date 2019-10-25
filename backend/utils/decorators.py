import functools
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status

from utils import errors
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
                status.HTTP_404_NOT_FOUND,
                error_code=errors.NOT_FOUND_4040,
                errors={errors.MSG: str(e)},
            )
        except Exception as e:
            return StructuredResponse(
                status.HTTP_500_INTERNAL_SERVER_ERROR,
                error_code=errors.INTERNAL_SERVER_ERROR_5000,
                errors={errors.MSG: str(e)},
            )

    return wrapper
