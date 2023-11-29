from http import HTTPStatus

URL_PATH = "/generate-image"


def test_failed_by_invalid_method(test_client):
    response = test_client.get(URL_PATH)
    assert response.status_code == HTTPStatus.METHOD_NOT_ALLOWED


def test_failed_by_invalid_payload(test_client):
    response = test_client.post(URL_PATH)
    assert response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY


def test_failed_by_missing_prompt(test_client):
    response = test_client.post(URL_PATH, json={"prompt": ""})
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json() == {"detail": "Prompt is required"}


def test_success(test_client):
    response = test_client.post(URL_PATH, json={"prompt": "A lazy cat."})
    assert response.status_code == HTTPStatus.OK
    assert response.json().startswith(
        "https://oaidalleapiprodscus.blob.core.windows.net/private/"
    )
