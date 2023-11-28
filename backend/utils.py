def verify_user(username: str, password: str):
    # TODO: Letter we will query database
    if username == "admin" and password == "admin123":
        return True
    return False
