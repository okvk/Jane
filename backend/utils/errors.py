# Only 4xx errors information will be returned currently
# https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors

MSG = "msg"

# 400x
BAD_REQUEST_4000 = 4000

INVALID_INPUT_4001 = 4001
INVALID_INPUT_4001_MSG = "Invalid inputs."
WRONG_CREDENTIALS_4002 = 4002
WRONG_CREDENTIALS_4002_MSG = "Incorrect username(email) or password or both."

# 404x
NOT_FOUND_4040 = 4040

USER_NOT_FOUND_4041 = 4041
USER_INACTIVE_4042 = 4042
USER_INACTIVE_4042_MSG = "The current account is inactive."

# 500x
INTERNAL_SERVER_ERROR_5000 = 5000
